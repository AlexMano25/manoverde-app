'use client';

import { useTranslations } from 'next-intl';
import {
  Users,
  Store,
  Truck,
  TrendingUp,
  ShoppingCart,
  Package,
  ArrowRight,
} from 'lucide-react';

export default function AdminDashboard() {
  const t = useTranslations('admin');

  const stats = [
    {
      label: t('dashboard.totalUsers'),
      value: '2,847',
      icon: Users,
      color: 'bg-blue-100 dark:bg-blue-900',
      textColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      label: t('dashboard.activeRestaurants'),
      value: '234',
      icon: Store,
      color: 'bg-green-100 dark:bg-green-900',
      textColor: 'text-green-600 dark:text-green-400',
    },
    {
      label: t('dashboard.activeCouriers'),
      value: '156',
      icon: Truck,
      color: 'bg-orange-100 dark:bg-orange-900',
      textColor: 'text-orange-600 dark:text-orange-400',
    },
    {
      label: t('dashboard.revenueToday'),
      value: '1,234,567 XAF',
      icon: TrendingUp,
      color: 'bg-purple-100 dark:bg-purple-900',
      textColor: 'text-purple-600 dark:text-purple-400',
    },
    {
      label: t('dashboard.totalOrders'),
      value: '12,847',
      icon: ShoppingCart,
      color: 'bg-pink-100 dark:bg-pink-900',
      textColor: 'text-pink-600 dark:text-pink-400',
    },
    {
      label: t('dashboard.activePlans'),
      value: '8',
      icon: Package,
      color: 'bg-indigo-100 dark:bg-indigo-900',
      textColor: 'text-indigo-600 dark:text-indigo-400',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'New user registered',
      details: 'Ahmed Hassan from Yaoundé',
      time: '2 minutes ago',
      type: 'user',
    },
    {
      id: 2,
      action: 'Order completed',
      details: 'Order #12847 - XAF 45,000',
      time: '5 minutes ago',
      type: 'order',
    },
    {
      id: 3,
      action: 'Restaurant joined',
      details: 'Le Gourmet Restaurant - Douala',
      time: '15 minutes ago',
      type: 'restaurant',
    },
    {
      id: 4,
      action: 'Courier became active',
      details: 'Jean Claude - Yaoundé Zone 3',
      time: '22 minutes ago',
      type: 'courier',
    },
    {
      id: 5,
      action: 'Payment received',
      details: 'XAF 2,500,000 from wallet recharge',
      time: '1 hour ago',
      type: 'payment',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t('dashboard.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {t('dashboard.subtitle')}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className={`${stat.textColor}`} size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('dashboard.recentActivity')}
            </h2>
            <button className="text-green-600 dark:text-green-400 hover:text-green-700 text-sm font-medium flex items-center gap-2">
              View All
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {activity.details}
                  </p>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-500 whitespace-nowrap ml-4">
                  {activity.time}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {t('dashboard.quickActions')}
          </h2>

          <div className="space-y-3">
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Add New User
            </button>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Create Admin Account
            </button>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Add Pricing Plan
            </button>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              View Finance Report
            </button>
            <button className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Export Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
