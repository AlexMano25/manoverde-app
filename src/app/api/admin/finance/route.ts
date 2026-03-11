import { createServiceClient } from '@/lib/supabase-server';

interface ManualTransactionBody {
  profile_id: string;
  amount: number;
  transaction_type: 'credit' | 'debit';
  reason: string;
}

export async function GET(request: Request) {
  try {
    const supabase = createServiceClient();

    // Get all wallets with their stats
    const { data: wallets, error: walletsError } = await supabase
      .from('mv_wallets')
      .select(
        `
        id,
        profile_id,
        balance,
        mv_profiles(full_name),
        (SELECT COALESCE(SUM(amount), 0) FROM mv_transactions
         WHERE wallet_id = mv_wallets.id AND type = 'recharge')::numeric as total_recharged,
        (SELECT COALESCE(SUM(ABS(amount)), 0) FROM mv_transactions
         WHERE wallet_id = mv_wallets.id AND type = 'commission')::numeric as total_commission
      `
      );

    if (walletsError) {
      throw walletsError;
    }

    // Calculate totals
    let totalBalance = 0;
    let totalRecharged = 0;
    let totalCommissions = 0;

    wallets?.forEach((wallet: any) => {
      totalBalance += wallet.balance || 0;
      totalRecharged += wallet.total_recharged || 0;
      totalCommissions += wallet.total_commission || 0;
    });

    // Get today's revenue
    const today = new Date().toISOString().split('T')[0];
    const { data: todayTransactions } = await supabase
      .from('mv_transactions')
      .select('amount')
      .eq('type', 'commission')
      .gte('created_at', `${today}T00:00:00`);

    let todayRevenue = 0;
    todayTransactions?.forEach((tx: any) => {
      todayRevenue += Math.abs(tx.amount || 0);
    });

    return Response.json({
      success: true,
      overview: {
        totalBalance,
        totalRecharged,
        totalCommissions,
        todayRevenue,
      },
      wallets: wallets || [],
    });
  } catch (error) {
    console.error('Finance fetch error:', error);
    return Response.json(
      { error: 'Failed to fetch finance data' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createServiceClient();
    const body: ManualTransactionBody = await request.json();

    const { profile_id, amount, transaction_type, reason } = body;

    if (!profile_id || !amount || !transaction_type || !reason) {
      return Response.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (amount <= 0) {
      return Response.json(
        { error: 'Amount must be greater than 0' },
        { status: 400 }
      );
    }

    // Get wallet for this profile
    const { data: wallet, error: walletError } = await supabase
      .from('mv_wallets')
      .select('id, balance')
      .eq('profile_id', profile_id)
      .single();

    if (walletError || !wallet) {
      return Response.json(
        { error: 'Wallet not found for this profile' },
        { status: 404 }
      );
    }

    // Calculate new balance
    const transactionAmount =
      transaction_type === 'credit' ? amount : -amount;
    const newBalance = wallet.balance + transactionAmount;

    // Create transaction record
    const { data: transaction, error: transactionError } = await supabase
      .from('mv_transactions')
      .insert([
        {
          wallet_id: wallet.id,
          amount: transactionAmount,
          type: transaction_type === 'credit' ? 'manual_credit' : 'manual_debit',
          description: reason,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (transactionError) {
      throw transactionError;
    }

    // Update wallet balance
    const { error: updateError } = await supabase
      .from('mv_wallets')
      .update({ balance: newBalance })
      .eq('id', wallet.id);

    if (updateError) {
      throw updateError;
    }

    return Response.json(
      {
        success: true,
        transaction,
        newBalance,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Manual transaction error:', error);
    return Response.json(
      { error: 'Failed to create manual transaction' },
      { status: 500 }
    );
  }
}
