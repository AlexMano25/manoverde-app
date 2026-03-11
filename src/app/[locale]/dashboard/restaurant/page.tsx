import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from '@/i18n/routing';
import { TrendingUp, Clock, AlertCircle, Menu, BarChart3, CheckCircle, ChevronRight, Bell } from 'lucide-react';

export default async function RestaurantDashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <RestaurantDashboardContent locale={locale} />;
}

function RestaurantDashboardContent({ locale }: { locale: string }) {
  const t = useTranslations();

  // Demo data
  const todayOrders = [
    { id: 'ORD-2024-001', customer: 'Ahmed K.', items: 3, status: 'Preparing', amount: '15,500 XAF', time: '5 min ago' },
    { id: 'ORD-2024-002', customer: 'Marie T.', items: 2, status: 'Pending', amount: '22,000 XAF', time: '2 min ago' },
    { id: 'ORD-2024-003', customer: 'John D.', items: 4, status: 'Ready', amount: '31,500 XAF', time: '15 min ago' },
  ];

  const stats = [
    { label: 'Total Revenue', value: '425,000 XAF', change: '+12.5%', icon: TrendingUp, color: 'text-green-600 bg-green-50 dark:bg-green-900/20' },
    { label: 'Avg Prep Time', value: '18 min', change: '-2 min', icon: Clock, color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Orders Today', value: '24', change: '+8 from yesterday', icon: CheckCircle, color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar locale={locale} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header with Alert */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {t('dashboard.restaurant.title')}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {t('dashboard.restaurant.subtitle')}
              </p>
            </div>
            <button className="relative p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-800 transition-colors">
              <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            </button>
          </div>

          {/* Alert Banner */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-900 dark:text-yellow-200 mb-1">{t('restaurant.newOrder')}</h3>
              <p className="text-sm text-yellow-800 dark:text-yellow-300">
                {t('dashboard.restaurant.alertDesc')}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">{stat.change}</p>
              </div>
            );
          })}
        </div>

        {/* Today's Orders Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Orders List */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('restaurant.todayOrders')}
              </h2>
              <span className="px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium rounded-full">
                {todayOrders.length} orders
              </span>
            </div>

            <div className="space-y-4">
              {todayOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-800 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {order.id}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {order.customer} • {order.items} items
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Preparing' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' :
                      order.status === 'Ready' ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' :
                      'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400'
                    }`}>
                      {order.status}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{order.time}</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{order.amount}</p>
                    </div>
                    {order.status === 'Pending' && (
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors">
                          {t('restaurant.acceptOrder')}
                        </button>
                        <button className="px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                          {t('restaurant.rejectOrder')}
                        </button>
                      </div>
                    )}
                    {order.status === 'Ready' && (
                      <button className="px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm font-medium rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                        {t('dashboard.restaurant.pickupReady')}
                      </button>
                    )}
                    {order.status === 'Preparing' && (
                      <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors">
                        {t('restaurant.markReady')}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {t('dashboard.restaurant.quickActions')}
            </h2>

            <div className="space-y-4">
              <Link
                href="/dashboard/restaurant/menu"
                className="block bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl p-6 text-white hover:shadow-lg transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">{t('restaurant.menuManagement')}</h3>
                    <p className="text-xs text-green-100">{t('dashboard.restaurant.editDishes')}</p>
                  </div>
                  <Menu className="w-6 h-6 opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>

              <Link
                href="/dashboard/restaurant/analytics"
                className="block bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white hover:shadow-lg transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">{t('restaurant.analytics')}</h3>
                    <p className="text-xs text-blue-100">{t('dashboard.restaurant.viewSales')}</p>
                  </div>
                  <BarChart3 className="w-6 h-6 opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>

              <Link
                href="/dashboard/restaurant/settings"
                className="block bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white hover:shadow-lg transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">{t('nav.settings')}</h3>
                    <p className="text-xs text-purple-100">{t('dashboard.restaurant.restaurantInfo')}</p>
                  </div>
                  <CheckCircle className="w-6 h-6 opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            </div>

            {/* Today Summary */}
            <div className="mt-8 bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t('dashboard.restaurant.todaySummary')}</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">{t('dashboard.restaurant.ordersCompleted')}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">18</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">{t('dashboard.restaurant.avgRating')}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">4.8/5.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">{t('restaurant.revenue')}</span>
                  <span className="font-semibold text-green-600">425,000 XAF</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-gray-600 dark:text-gray-400">{t('dashboard.restaurant.commission')}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">21,250 XAF</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Chart Placeholder */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {t('dashboard.restaurant.weeklyPerformance')}
          </h2>
          <div className="h-64 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>{t('dashboard.restaurant.chartPlaceholder')}</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
