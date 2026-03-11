'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Wallet,
  ArrowUpCircle,
  ArrowDownCircle,
  Phone,
  CreditCard,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Loader2,
  ChevronLeft,
  Receipt,
} from 'lucide-react';

// Demo data - will be replaced with real Supabase data
const DEMO_WALLET = {
  balance: 15500,
  total_recharged: 45000,
  total_commission: 1350,
  total_orders: 45,
};

const DEMO_TRANSACTIONS = [
  { id: '1', type: 'recharge', amount: 5000, balance_after: 15500, description: 'Recharge MTN MoMo', created_at: '2026-03-11T10:30:00Z' },
  { id: '2', type: 'commission', amount: -450, balance_after: 10500, description: 'Commission 3% - Commande #DLK-2847', created_at: '2026-03-10T18:15:00Z' },
  { id: '3', type: 'recharge', amount: 10000, balance_after: 10950, description: 'Recharge MTN MoMo', created_at: '2026-03-09T09:00:00Z' },
  { id: '4', type: 'commission', amount: -300, balance_after: 950, description: 'Commission 3% - Commande #DLK-2801', created_at: '2026-03-08T14:20:00Z' },
  { id: '5', type: 'bonus', amount: 1000, balance_after: 1250, description: 'Bonus de bienvenue Déliko', created_at: '2026-03-07T08:00:00Z' },
  { id: '6', type: 'commission', amount: -250, balance_after: 250, description: 'Commission 3% - Commande #DLK-2790', created_at: '2026-03-07T12:45:00Z' },
];

export default function WalletPage() {
  const t = useTranslations('wallet');
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rechargeStatus, setRechargeStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showRecharge, setShowRecharge] = useState(false);

  const quickAmounts = [1000, 2000, 5000, 10000, 20000, 50000];

  const handleRecharge = async () => {
    const amount = parseInt(rechargeAmount);
    if (!amount || amount < 100 || !phoneNumber) return;

    setIsLoading(true);
    setRechargeStatus('idle');

    try {
      const response = await fetch('/api/payment/mtn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wallet_id: 'demo-wallet-id',
          amount,
          phone_number: phoneNumber.replace(/\s/g, ''),
        }),
      });

      if (response.ok) {
        setRechargeStatus('success');
        setRechargeAmount('');
      } else {
        setRechargeStatus('error');
      }
    } catch {
      setRechargeStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(Math.abs(amount));
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <Navbar locale="fr" />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <Link href="/dashboard/restaurant" className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('title')}</h1>
              <p className="text-sm text-gray-500">{t('subtitle')}</p>
            </div>
          </div>

          {/* Balance Card */}
          <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-2xl p-6 mb-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Wallet className="w-6 h-6" />
                <span className="text-green-100 font-medium">{t('currentBalance')}</span>
              </div>
              <span className="text-xs bg-white/20 px-3 py-1 rounded-full">MTN MoMo</span>
            </div>
            <p className="text-4xl font-bold mb-6">
              {formatAmount(DEMO_WALLET.balance)} <span className="text-lg font-normal text-green-200">FCFA</span>
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-green-200 text-xs">{t('totalRecharged')}</p>
                <p className="font-semibold">{formatAmount(DEMO_WALLET.total_recharged)} F</p>
              </div>
              <div>
                <p className="text-green-200 text-xs">{t('totalCommission')}</p>
                <p className="font-semibold">{formatAmount(DEMO_WALLET.total_commission)} F</p>
              </div>
              <div>
                <p className="text-green-200 text-xs">{t('totalOrders')}</p>
                <p className="font-semibold">{DEMO_WALLET.total_orders}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setShowRecharge(!showRecharge)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors"
            >
              <ArrowUpCircle className="w-5 h-5" />
              {t('recharge')}
            </button>
            <Link
              href="/orders"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Receipt className="w-5 h-5" />
              {t('viewOrders')}
            </Link>
          </div>

          {/* Recharge Form */}
          {showRecharge && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 mb-6 border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-green-600" />
                {t('rechargeTitle')}
              </h3>

              {/* Quick amounts */}
              <p className="text-sm text-gray-500 mb-2">{t('quickAmount')}</p>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {quickAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setRechargeAmount(amount.toString())}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors border ${
                      rechargeAmount === amount.toString()
                        ? 'bg-green-50 border-green-500 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'border-gray-200 dark:border-gray-700 hover:border-green-300 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {formatAmount(amount)} F
                  </button>
                ))}
              </div>

              {/* Custom amount */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('amount')} (FCFA)
                </label>
                <input
                  type="number"
                  value={rechargeAmount}
                  onChange={(e) => setRechargeAmount(e.target.value)}
                  placeholder="Ex: 5000"
                  min="100"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Phone number */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <Phone className="w-4 h-4 inline mr-1" />
                  {t('phoneNumber')} MTN
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+237 6XX XXX XXX"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Commission info */}
              <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg mb-4">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-700 dark:text-amber-400">
                  {t('commissionInfo')}
                </p>
              </div>

              {/* Status messages */}
              {rechargeStatus === 'success' && (
                <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg mb-4">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="text-sm text-green-700 dark:text-green-400">{t('rechargeSuccess')}</p>
                </div>
              )}
              {rechargeStatus === 'error' && (
                <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg mb-4">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-sm text-red-700 dark:text-red-400">{t('rechargeError')}</p>
                </div>
              )}

              {/* Submit button */}
              <button
                onClick={handleRecharge}
                disabled={isLoading || !rechargeAmount || parseInt(rechargeAmount) < 100 || !phoneNumber}
                className="w-full flex items-center justify-center gap-2 py-3 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t('processing')}
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    {t('payWithMTN')}
                  </>
                )}
              </button>
            </div>
          )}

          {/* Transaction History */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-400" />
                {t('transactionHistory')}
              </h3>
              <span className="text-sm text-gray-500">{t('commissionRate')}: 3%</span>
            </div>

            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {DEMO_TRANSACTIONS.map((tx) => (
                <div key={tx.id} className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.type === 'recharge'
                        ? 'bg-green-100 dark:bg-green-900/30'
                        : tx.type === 'bonus'
                        ? 'bg-purple-100 dark:bg-purple-900/30'
                        : 'bg-red-100 dark:bg-red-900/30'
                    }`}>
                      {tx.type === 'recharge' ? (
                        <ArrowUpCircle className="w-5 h-5 text-green-600" />
                      ) : tx.type === 'bonus' ? (
                        <TrendingUp className="w-5 h-5 text-purple-600" />
                      ) : (
                        <ArrowDownCircle className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {tx.description}
                      </p>
                      <p className="text-xs text-gray-500">{formatDate(tx.created_at)}</p>
                    </div>
                  </div>
                  <div className="text-end">
                    <p className={`font-semibold ${
                      tx.amount > 0 ? 'text-green-600' : 'text-red-500'
                    }`}>
                      {tx.amount > 0 ? '+' : ''}{formatAmount(tx.amount)} F
                    </p>
                    <p className="text-xs text-gray-400">{t('balance')}: {formatAmount(tx.balance_after)} F</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
