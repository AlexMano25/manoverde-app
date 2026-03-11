import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase-server';

/**
 * POST /api/payment/webhook
 * Receives Y-Note/PayNote payment notifications
 *
 * Y-Note sends webhook when payment status changes
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Y-Note webhook received:', JSON.stringify(body));

    const supabase = createServiceClient();

    // Extract relevant fields from webhook
    const messageId = body.message_id || body.MessageId || body.messageId;
    const status = (body.status || body.Status || '').toLowerCase();
    const orderId = body.order_id || body.orderId;

    if (!messageId && !orderId) {
      console.warn('Webhook missing message_id and order_id');
      return NextResponse.json({ received: true });
    }

    // Find the payment record
    let query = supabase.from('mv_payments').select('*, mv_wallets(id, balance)');

    if (messageId) {
      query = query.eq('message_id', messageId);
    } else {
      query = query.eq('order_id', orderId);
    }

    const { data: payment, error } = await query.single();

    if (error || !payment) {
      console.warn('Payment not found for webhook:', { messageId, orderId });
      return NextResponse.json({ received: true });
    }

    // Skip if already finalized
    if (['success', 'failed', 'cancelled'].includes(payment.status)) {
      return NextResponse.json({ received: true, already_processed: true });
    }

    // Map status
    let newStatus = payment.status;
    if (status === 'successful' || status === 'success' || status === 'completed') {
      newStatus = 'success';
    } else if (status === 'failed' || status === 'error') {
      newStatus = 'failed';
    } else if (status === 'cancelled' || status === 'canceled') {
      newStatus = 'cancelled';
    }

    // Update payment
    await supabase
      .from('mv_payments')
      .update({
        status: newStatus,
        webhook_data: body,
        updated_at: new Date().toISOString(),
      })
      .eq('id', payment.id);

    // If successful, credit the wallet
    if (newStatus === 'success') {
      const wallet = payment.mv_wallets;
      const currentBalance = wallet.balance;
      const newBalance = currentBalance + payment.amount;

      await supabase
        .from('mv_wallets')
        .update({
          balance: newBalance,
          updated_at: new Date().toISOString(),
        })
        .eq('id', wallet.id);

      // Record transaction
      await supabase.from('mv_wallet_transactions').insert({
        wallet_id: wallet.id,
        type: 'recharge',
        amount: payment.amount,
        balance_before: currentBalance,
        balance_after: newBalance,
        description: `Recharge MTN MoMo - ${payment.phone_number}`,
        reference_id: payment.message_id,
      });
    }

    return NextResponse.json({ received: true, status: newStatus });
  } catch (error) {
    console.error('Webhook processing error:', error);
    // Always return 200 to prevent Y-Note from retrying
    return NextResponse.json({ received: true, error: 'Processing failed' });
  }
}
