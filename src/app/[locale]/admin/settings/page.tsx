'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Save } from 'lucide-react';

export default function SettingsManagement() {
  const t = useTranslations('admin');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert('Settings saved successfully!');
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t('settings.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {t('settings.subtitle')}
        </p>
      </div>

      {/* Settings Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-8 space-y-8">
        {/* Commission Rate */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-900 dark:text-white">
            {t('settings.commissionRate')}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              defaultValue="15"
              step="0.1"
              min="0"
              max="100"
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <span className="text-gray-600 dark:text-gray-400 font-medium">
              %
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Default commission rate for restaurants
          </p>
        </div>

        {/* Welcome Bonus */}
        <div className="space-y-3 pt-6 border-t border-gray-200 dark:border-gray-700">
          <label className="block text-sm font-semibold text-gray-900 dark:text-white">
            {t('settings.welcomeBonus')}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              defaultValue="5000"
              min="0"
              step="100"
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <span className="text-gray-600 dark:text-gray-400 font-medium">
              XAF
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Welcome bonus given to new users
          </p>
        </div>

        {/* Minimum Recharge */}
        <div className="space-y-3 pt-6 border-t border-gray-200 dark:border-gray-700">
          <label className="block text-sm font-semibold text-gray-900 dark:text-white">
            {t('settings.minRecharge')}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              defaultValue="1000"
              min="0"
              step="100"
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <span className="text-gray-600 dark:text-gray-400 font-medium">
              XAF
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Minimum amount required for wallet recharge
          </p>
        </div>

        {/* Maximum Recharge */}
        <div className="space-y-3 pt-6 border-t border-gray-200 dark:border-gray-700">
          <label className="block text-sm font-semibold text-gray-900 dark:text-white">
            {t('settings.maxRecharge')}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              defaultValue="500000"
              min="0"
              step="10000"
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <span className="text-gray-600 dark:text-gray-400 font-medium">
              XAF
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Maximum amount allowed for wallet recharge
          </p>
        </div>

        {/* Support Email */}
        <div className="space-y-3 pt-6 border-t border-gray-200 dark:border-gray-700">
          <label className="block text-sm font-semibold text-gray-900 dark:text-white">
            {t('settings.supportEmail')}
          </label>
          <input
            type="email"
            defaultValue="support@deliko.com"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Customer support email address
          </p>
        </div>

        {/* Support Phone */}
        <div className="space-y-3 pt-6 border-t border-gray-200 dark:border-gray-700">
          <label className="block text-sm font-semibold text-gray-900 dark:text-white">
            {t('settings.supportPhone')}
          </label>
          <input
            type="tel"
            defaultValue="+237 651 982 878"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Customer support phone number
          </p>
        </div>

        {/* Maintenance Mode */}
        <div className="space-y-3 pt-6 border-t border-gray-200 dark:border-gray-700">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked={false}
              className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-2 focus:ring-green-500"
            />
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {t('settings.maintenanceMode')}
            </span>
          </label>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            When enabled, the platform will be inaccessible to users
          </p>
        </div>

        {/* Save Button */}
        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Save size={20} />
            {isSaving ? t('common.loading') : t('common.save')}
          </button>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-900 dark:text-blue-200">
          Changes to platform settings will be applied immediately. Users may
          need to refresh their app to see the changes.
        </p>
      </div>
    </div>
  );
}
