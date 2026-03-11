import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase-server';
import { getYNoteToken, initiatePayment, type YNoteCredentials } from '@/lib/ynote';

/**
 * POST /api/payment/mtn
 * Initiate an MTN MoMo payment via Y-Note
 *
 * Body: { wallet_id, amount, phone_number }
 */
export async function POST(request: NextRequest) {
  try {
    const { wallet_id, amount, phone_number } = await request.json();

    // Validate inputs
    if (!wallet_id || !amount || !phone_number) {
      return NextResponse.json(
        { error: 'wallet_id, amount, and phone_number are required' },
        { status: 400 }
      );
    }

    if (amount < 100) {
      return NextResponse.json(
        { error: 'Minimum recharge amount is 100 FCFA' },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    // Get Y-Note credentials from config
    const { data: config, error: configError } = await supabase
      .from('mv_payment_config')
      .select('credentials')
      .eq('provider', 'ynote_mtn')
      .eq('is_active', true)
      .single();

    if (configError || !config) {
      return NextResponse.json(
        { error: 'Payment provider not configured' },
        { status: 500 }
      );
    }

    const credentials: YNoteCredentials = config.credentials as YNoteCredentials;

    // Verify wallet exists
    const { data: wallet, error: walletError } = await supabase
      .from('mv_wallets')
      .select('id, profile_id')
      .eq('id', wallet_id)
      .single();

    if (walletError || !wallet) {
      return NextResponse.json(
        { error: 'Wallet not found' },
        { status: 404 }
      );
    }

    // Generate unique order ID
    const orderId = `DLK-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

    // Get OAuth2 token
    const accessToken = await getYNoteToken(credentials);

    // Build notification URL
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://manoverde-app.vercel.app';
    const notifyUrl = `${baseUrl}/api/payment/webhook`;

    // Initiate payment
    const paymentResponse = await initiatePayment(credentials, accessToken, {
      orderId,
      amount,
      phoneNumber: phone_number,
      notifyUrl,
    });

    // Save payment record
    const { data: payment, error: paymentError } = await supabase
      .from('mv_payments')
      .insert({
        wallet_id,
        message_id: paymentResponse.message_id || null,
        order_id: orderId,
        amount,
        phone_number,
        status: 'processing',
        provider_response: paymentResponse,
      })
      .select()
      .single();

    if (paymentError) {
      console.error('Payment save error:', paymentError);
      return NextResponse.json(
        { error: 'Failed to save payment record' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      payment_id: payment.id,
      message_id: paymentResponse.message_id,
      order_id: orderId,
      status: 'processing',
      message: 'Veuillez confirmer le paiement sur votre téléphone MTN MoMo',
    });
  } catch (error) {
    console.error('MTN payment error:', error);
    return NextResponse.json(
      { error: 'Payment initiation failed', details: (error as Error).message },
      { status: 500 }
    );
  }
}
