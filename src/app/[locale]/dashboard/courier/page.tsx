import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from '@/i18n/routing';
import { MapPin, DollarSign, Truck, Clock, Navigation, CheckCircle, ChevronRight, PowerOff, Activity } from 'lucide-react';

export default async function CourierDashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CourierDashboardContent locale={locale} />;
}

function CourierDashboardContent({ locale }: { locale: string }) {
  const t = useTranslations();

  // Demo data
  const availableDeliveries = [
    {
      id: 'DEL-001',
      restaurant: 'Le Jardin des Saveurs',
      customer: 'Ahmed K.',
      distance: '2.5 km',
      pay: '2,500 XAF',
      items: 3,
      time: '~12 min',
    },
    {
      id: 'DEL-002',
      restaurant: 'La Table Royale',
      customer: 'Marie T.',
      distance: '1.8 km',
      pay: '1,800 XAF',
      items: 2,
      time: '~8 min',
    },
    {
      id: 'DEL-003',
      restaurant: 'Sakura Fusion',
      customer: 'John D.',
      distance: '3.2 km',
      pay: '3,200 XAF',
      items: 4,
      time: '~15 min',
    },
  ];

  const deliveryHistory = [
    { id: 'DEL-2024-001', customer: 'Ahmed K.', status: 'Completed', distance: '2.5 km', earn: '2,500 XAF', time: '2:30 PM' },
    { id: 'DEL-2024-002', customer: 'Marie T.', status: 'Completed', distance: '1.8 km', earn: '1,800 XAF', time: '1:15 PM' },
    { id: 'DEL-2024-003', customer: 'Hassan A.', status: 'Completed', distance: '3.1 km', earn: '3,100 XAF', time: '12:00 PM' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar locale={locale} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header with Status Toggle */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {t('dashboard.courier.title')}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {t('dashboard.courier.subtitle')}
              </p>
            </div>

            {/* Status Toggle */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('dashboard.courier.yourStatus')}</p>
                <p className="text-lg font-bold text-green-600">{t('courier.available')}</p>
              </div>
              <button className="p-4 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors">
                <Activity className="w-6 h-6" />
              </button>
              <button className="p-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-xl transition-colors">
                <PowerOff className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('courier.todayEarnings')}</p>
                <p className="text-3xl font-bold text-green-600">24,500 XAF</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">{t('dashboard.courier.deliveriesCount')}</p>
              </div>
              <DollarSign className="w-12 h-12 text-green-100 dark:text-green-900/30 bg-green-50 dark:bg-green-900/10 rounded-xl p-3" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('dashboard.courier.distanceCovered')}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">15.8 km</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">{t('dashboard.courier.totalToday')}</p>
              </div>
              <MapPin className="w-12 h-12 text-blue-100 dark:text-blue-900/30 bg-blue-50 dark:bg-blue-900/10 rounded-xl p-3" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('courier.deliveriesCompleted')}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">156</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">{t('dashboard.courier.thisMonth')}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-purple-100 dark:text-purple-900/30 bg-purple-50 dark:bg-purple-900/10 rounded-xl p-3" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('courier.commission')}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">12%</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">{t('dashboard.courier.perDelivery')}</p>
              </div>
              <Truck className="w-12 h-12 text-orange-100 dark:text-orange-900/30 bg-orange-50 dark:bg-orange-900/10 rounded-xl p-3" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Available Deliveries */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {t('courier.availableOrders')}
            </h2>

            <div className="space-y-4">
              {availableDeliveries.map((delivery) => (
                <div
                  key={delivery.id}
                  className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-800 transition-colors overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {delivery.id} • {delivery.restaurant}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          Pickup for {delivery.customer} • {delivery.items} items
                        </p>

                        <div className="flex flex-wrap gap-3 text-sm">
                          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                            <MapPin className="w-4 h-4" />
                            {delivery.distance}
                          </div>
                          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                            <Clock className="w-4 h-4" />
                            {delivery.time}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600 mb-3">
                          {delivery.pay}
                        </div>
                        <button className="w-32 px-4 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                          <Navigation className="w-4 h-4" />
                          {t('courier.acceptDelivery')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <button className="w-full mt-6 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              {t('dashboard.courier.loadMore')}
            </button>
          </div>

          {/* Quick Actions & Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {t('dashboard.courier.quickInfo')}
            </h2>

            <div className="space-y-4 mb-6">
              <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl p-6 text-white">
                <h3 className="font-semibold mb-2">{t('dashboard.courier.monthlyEarnings')}</h3>
                <p className="text-3xl font-bold mb-1">385,000 XAF</p>
                <p className="text-green-100 text-sm">{t('dashboard.courier.includingCommission')}</p>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
                <h3 className="font-semibold mb-2">{t('dashboard.courier.yourRating')}</h3>
                <p className="text-3xl font-bold mb-1">4.9 / 5.0</p>
                <p className="text-blue-100 text-sm">{t('dashboard.courier.basedOnDeliveries')}</p>
              </div>
            </div>

            {/* Current Delivery (if any) */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                {t('dashboard.courier.currentDelivery')}
              </h3>
              <div className="text-center py-6">
                <Truck className="w-12 h-12 text-gray-400 mx-auto mb-3 opacity-50" />
                <p className="text-gray-600 dark:text-gray-400">
                  {t('dashboard.courier.noActiveDelivery')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery History */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('dashboard.courier.deliveryHistory')}
            </h2>
            <button className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-1">
              {t('common.seeAll')}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">{t('dashboard.courier.deliveryId')}</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">{t('dashboard.courier.customer')}</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">{t('restaurants.deliveryTime')}</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">{t('courier.earnings')}</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">{t('dashboard.courier.time')}</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">{t('orders.status')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {deliveryHistory.map((delivery) => (
                    <tr key={delivery.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                        {delivery.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {delivery.customer}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {delivery.distance}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-green-600">
                        +{delivery.earn}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {delivery.time}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-xs font-medium">
                          {delivery.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
