'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Plus, Edit, Trash2, Check } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  type: 'restaurant' | 'courier' | 'customer';
  monthlyPrice: number;
  yearlyPrice: number;
  commissionRate: number;
  features: string[];
  maxOrders: number;
  active: boolean;
}

export default function PlansManagement() {
  const t = useTranslations('admin');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Demo data
  const plans: Plan[] = [
    {
      id: '1',
      name: 'Starter Restaurant',
      type: 'restaurant',
      monthlyPrice: 5000,
      yearlyPrice: 50000,
      commissionRate: 20,
      features: ['Dashboard access', '5 menu items', 'Basic analytics'],
      maxOrders: 50,
      active: true,
    },
    {
      id: '2',
      name: 'Professional Restaurant',
      type: 'restaurant',
      monthlyPrice: 15000,
      yearlyPrice: 150000,
      commissionRate: 15,
      features: [
        'Advanced dashboard',
        'Unlimited menu items',
        'Advanced analytics',
        'Marketing tools',
      ],
      maxOrders: 500,
      active: true,
    },
    {
      id: '3',
      name: 'Courier Basic',
      type: 'courier',
      monthlyPrice: 0,
      yearlyPrice: 0,
      commissionRate: 15,
      features: ['App access', 'Order notifications'],
      maxOrders: 0,
      active: true,
    },
  ];

  const getTypeBadgeColor = (type: string) => {
    const colors = {
      restaurant:
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      courier:
        'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      customer:
        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    };
    return colors[type as keyof typeof colors] || colors.restaurant;
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      restaurant: t('plans.restaurant'),
      courier: t('plans.courier'),
      customer: t('plans.customer'),
    };
    return labels[type as keyof typeof labels] || type;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('plans.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {t('plans.subtitle')}
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          {t('plans.createNew')}
        </button>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 relative"
          >
            {/* Active Badge */}
            {plan.active && (
              <div className="absolute top-4 right-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-3 py-1 rounded-full text-xs font-medium">
                {t('plans.active')}
              </div>
            )}

            {/* Plan Header */}
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {plan.name}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeBadgeColor(
                  plan.type
                )}`}
              >
                {getTypeLabel(plan.type)}
              </span>
            </div>

            {/* Pricing */}
            <div className="mb-6 space-y-2">
              {plan.monthlyPrice > 0 && (
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t('plans.monthly')}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {plan.monthlyPrice.toLocaleString()} XAF
                  </p>
                </div>
              )}
              {plan.yearlyPrice > 0 && (
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t('plans.yearly')}
                  </p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {plan.yearlyPrice.toLocaleString()} XAF
                  </p>
                </div>
              )}
              {plan.monthlyPrice === 0 && (
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  Free
                </p>
              )}
            </div>

            {/* Commission Rate */}
            <div className="mb-6 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('plans.commissionRate')}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {plan.commissionRate}%
              </p>
            </div>

            {/* Features */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                {t('plans.features')}
              </p>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    <Check size={16} className="text-green-600 dark:text-green-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                <Edit size={18} />
                {t('common.edit')}
              </button>
              <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                <Trash2 size={18} />
                {t('common.delete')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4 space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white sticky top-0">
              {t('plans.createNew')}
            </h2>

            <input
              type="text"
              placeholder={t('plans.name')}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="">Select Type</option>
              <option value="restaurant">{t('plans.restaurant')}</option>
              <option value="courier">{t('plans.courier')}</option>
              <option value="customer">{t('plans.customer')}</option>
            </select>

            <input
              type="number"
              placeholder={t('plans.monthly')}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="number"
              placeholder={t('plans.commissionRate')}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <div className="flex gap-4 pt-4 sticky bottom-0 bg-white dark:bg-gray-800">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
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
