import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase-server';
import { getYNoteToken, checkPaymentStatus, type YNoteCredentials } from '@/lib/ynote';

/**
 * POST /api/payment/mtn/status
 * Check the status of an MTN MoMo payment
 *
 * Body: { payment_id }
 */
export async function POST(request: NextRequest) {
  try {
    const { payment_id } = await request.json();

    if (!payment_id) {
      return NextResponse.json(
        { error: 'payment_id is required' },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    // Get payment record
    const { data: payment, error: paymentError } = await supabase
      .from('mv_payments')
      .select('*, mv_wallets(id, balance, profile_id)')
      .eq('id', payment_id)
      .single();

    if (paymentError || !payment) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      );
    }

    // If already finalized, return cached status
    if (['success', 'failed', 'cancelled'].includes(payment.status)) {
      return NextResponse.json({
        payment_id: payment.id,
        status: payment.status,
        amount: payment.amount,
      });
    }

    // Need message_id to check status
    if (!payment.message_id) {
      return NextResponse.json({
        payment_id: payment.id,
        status: 'pending',
        message: 'Payment not yet initiated with provider',
      });
    }

    // Get Y-Note credentials
    const { data: config } = await supabase
      .from('mv_payment_config')
      .select('credentials')
      .eq('provider', 'ynote_mtn')
      .eq('is_active', true)
      .single();

    if (!config) {
      return NextResponse.json(
        { error: 'Payment provider not configured' },
        { status: 500 }
      );
    }

    const credentials: YNoteCredentials = config.credentials as YNoteCredentials;

    // Get fresh OAuth2 token
    const accessToken = await getYNoteToken(credentials);

    // Check status with Y-Note (CRITICAL: uses snake_case message_id)
    const statusResponse = await checkPaymentStatus(
      credentials,
      accessToken,
      payment.message_id
    );

    // Map Y-Note status to our status
    let newStatus = payment.status;
    const ynoteStatus = (statusResponse.status || '').toLowerCase();

    if (ynoteStatus === 'successful' || ynoteStatus === 'success') {
      newStatus = 'success';
    } else if (ynoteStatus === 'failed' || ynoteStatus === 'error') {
      newStatus = 'failed';
    } else if (ynoteStatus === 'cancelled') {
      newStatus = 'cancelled';
    }

    // Update payment status
    await supabase
      .from('mv_payments')
      .update({
        status: newStatus,
        provider_response: statusResponse,
        updated_at: new Date().toISOString(),
      })
      .eq('id', payment_id);

    // If successful, credit the wallet
    if (newStatus === 'success' && payment.status !== 'success') {
      const wallet = payment.mv_wallets;
      const currentBalance = wallet.balance;
      const newBalance = currentBalance + payment.amount;

      // Update wallet balance and total_recharged
      await supabase
        .from('mv_wallets')
        .update({
          balance: newBalance,
          updated_at: new Date().toISOString(),
        })
        .eq('id', payment.wallet_id);

      // Note: total_recharged is tracked via wallet_transactions aggregation

      // Record transaction
      await supabase.from('mv_wallet_transactions').insert({
        wallet_id: payment.wallet_id,
        type: 'recharge',
        amount: payment.amount,
        balance_before: currentBalance,
        balance_after: newBalance,
        description: `Recharge MTN MoMo - ${payment.phone_number}`,
        reference_id: payment.message_id,
      });
    }

    return NextResponse.json({
      payment_id: payment.id,
      status: newStatus,
      amount: payment.amount,
      provider_status: statusResponse,
    });
  } catch (error) {
    console.error('Payment status check error:', error);
    return NextResponse.json(
      { error: 'Status check failed', details: (error as Error).message },
      { status: 500 }
    );
  }
}
