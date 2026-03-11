'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  DollarSign,
  ArrowUpRight,
  ArrowDownLeft,
  Download,
  Plus,
} from 'lucide-react';

interface Wallet {
  id: string;
  profileName: string;
  balance: number;
  totalRecharged: number;
  totalCommission: number;
}

interface Transaction {
  id: string;
  profileName: string;
  type: 'recharge' | 'commission' | 'bonus' | 'refund';
  amount: number;
  date: string;
}

export default function FinanceManagement() {
  const t = useTranslations('admin');
  const [showManualTransactionModal, setShowManualTransactionModal] =
    useState(false);
  const [selectedTransactionType, setSelectedTransactionType] = useState<
    'credit' | 'debit'
  >('credit');

  // Demo data
  const overviewStats = {
    totalBalance: 15234567,
    totalRecharged: 45234000,
    totalCommissions: 8234500,
    todayRevenue: 1234567,
  };

  const wallets: Wallet[] = [
    {
      id: '1',
      profileName: 'Ahmed Hassan (Customer)',
      balance: 125000,
      totalRecharged: 500000,
      totalCommission: 0,
    },
    {
      id: '2',
      profileName: 'Le Gourmet (Restaurant)',
      balance: 245600,
      totalRecharged: 1200000,
      totalCommission: -180000,
    },
    {
      id: '3',
      profileName: 'Jean Claude (Courier)',
      balance: 89500,
      totalRecharged: 350000,
      totalCommission: 125000,
    },
    {
      id: '4',
      profileName: 'Mariam Restaurant',
      balance: 567800,
      totalRecharged: 2500000,
      totalCommission: -375000,
    },
  ];

  const transactions: Transaction[] = [
    {
      id: '1',
      profileName: 'Ahmed Hassan',
      type: 'recharge',
      amount: 50000,
      date: '2026-03-11',
    },
    {
      id: '2',
      profileName: 'Le Gourmet',
      type: 'commission',
      amount: -15000,
      date: '2026-03-11',
    },
    {
      id: '3',
      profileName: 'Jean Claude',
      type: 'bonus',
      amount: 5000,
      date: '2026-03-10',
    },
    {
      id: '4',
      profileName: 'Customer User',
      type: 'refund',
      amount: 25000,
      date: '2026-03-10',
    },
  ];

  const getTransactionTypeColor = (type: string) => {
    const colors = {
      recharge: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      commission:
        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      bonus: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      refund:
        'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    };
    return colors[type as keyof typeof colors] || colors.recharge;
  };

  const getTransactionTypeLabel = (type: string) => {
    const labels = {
      recharge: t('finance.recharge'),
      commission: t('finance.commission'),
      bonus: t('finance.bonus'),
      refund: t('finance.refund'),
    };
    return labels[type as keyof typeof labels] || type;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t('finance.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {t('finance.subtitle')}
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                {t('finance.totalBalance')}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {overviewStats.totalBalance.toLocaleString()} XAF
              </p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
              <DollarSign
                className="text-blue-600 dark:text-blue-400"
                size={24}
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                {t('finance.totalRecharged')}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {overviewStats.totalRecharged.toLocaleString()} XAF
              </p>
            </div>
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
              <ArrowUpRight
                className="text-green-600 dark:text-green-400"
                size={24}
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                {t('finance.totalCommissions')}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {overviewStats.totalCommissions.toLocaleString()} XAF
              </p>
            </div>
            <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-lg">
              <ArrowDownLeft
                className="text-orange-600 dark:text-orange-400"
                size={24}
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                {t('finance.todayRevenue')}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {overviewStats.todayRevenue.toLocaleString()} XAF
              </p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
              <DollarSign
                className="text-purple-600 dark:text-purple-400"
                size={24}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Wallets */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('finance.wallets')}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    {t('finance.profileName')}
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    {t('finance.balance')}
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    {t('finance.totalRecharged')}
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    {t('finance.totalCommission')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {wallets.map((wallet) => (
                  <tr
                    key={wallet.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">
                      {wallet.profileName}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white">
                      {wallet.balance.toLocaleString()} XAF
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {wallet.totalRecharged.toLocaleString()} XAF
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <span
                        className={
                          wallet.totalCommission < 0
                            ? 'text-red-600 dark:text-red-400'
                            : 'text-green-600 dark:text-green-400'
                        }
                      >
                        {wallet.totalCommission.toLocaleString()} XAF
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Manual Transactions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Quick Actions
          </h2>

          <button
            onClick={() => setShowManualTransactionModal(true)}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Plus size={20} />
            {t('finance.manualCredit')}
          </button>

          <button
            onClick={() => {
              setSelectedTransactionType('debit');
              setShowManualTransactionModal(true);
            }}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Plus size={20} />
            {t('finance.manualDebit')}
          </button>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
            <Download size={20} />
            {t('finance.export')}
          </button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {t('finance.transactions')}
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  {t('finance.profileName')}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  {t('finance.type')}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  {t('finance.amount')}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  {t('common.createdAt')}
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">
                    {tx.profileName}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getTransactionTypeColor(
                        tx.type
                      )}`}
                    >
                      {getTransactionTypeLabel(tx.type)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold">
                    <span
                      className={
                        tx.amount < 0
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-green-600 dark:text-green-400'
                      }
                    >
                      {tx.amount.toLocaleString()} XAF
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {new Date(tx.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Transaction Modal */}
      {showManualTransactionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {selectedTransactionType === 'credit'
                ? t('finance.manualCredit')
                : t('finance.manualDebit')}
            </h2>

            <input
              type="text"
              placeholder={t('finance.profileName')}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="number"
              placeholder={t('finance.amount')}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <textarea
              placeholder={t('finance.reason')}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => setShowManualTransactionModal(false)}
                className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={() => setShowManualTransactionModal(false)}
                className="flex-1 py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                {t('common.save')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
