import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from '@/i18n/routing';
import { Heart, MapPin, ShoppingBag, UtensilsCrossed, Clock, Star, ChevronRight, Plus } from 'lucide-react';

export default async function CustomerDashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CustomerDashboardContent locale={locale} />;
}

function CustomerDashboardContent({ locale }: { locale: string }) {
  const t = useTranslations();

  // Demo data
  const recentOrders = [
    { id: 1, restaurant: 'Le Jardin des Saveurs', status: 'Delivered', amount: '15,500 XAF', date: 'Today' },
    { id: 2, restaurant: 'La Table Royale', status: 'Delivered', amount: '22,000 XAF', date: 'Yesterday' },
    { id: 3, restaurant: 'Chez Mama Ngono', status: 'Delivered', amount: '12,300 XAF', date: '2 days ago' },
  ];

  const favorites = [
    { id: 1, name: 'Le Jardin des Saveurs', rating: 4.8, deliveryTime: '25-35 min', icon: '🍽️' },
    { id: 2, name: 'La Table Royale', rating: 4.6, deliveryTime: '30-40 min', icon: '👑' },
    { id: 3, name: 'Sakura Fusion', rating: 4.5, deliveryTime: '25-35 min', icon: '🥢' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar locale={locale} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome Back, Ahmed!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Ready to discover your next favorite meal?
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">24</p>
              </div>
              <ShoppingBag className="w-12 h-12 text-green-100 dark:text-green-900/30 bg-green-50 dark:bg-green-900/10 rounded-xl p-3" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Loyalty Points</p>
                <p className="text-3xl font-bold text-green-600">1,250</p>
              </div>
              <Star className="w-12 h-12 text-yellow-100 dark:text-yellow-900/30 bg-yellow-50 dark:bg-yellow-900/10 rounded-xl p-3 fill-yellow-400" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Favorite Restaurants</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">8</p>
              </div>
              <Heart className="w-12 h-12 text-red-100 dark:text-red-900/30 bg-red-50 dark:bg-red-900/10 rounded-xl p-3 fill-red-400" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/restaurants"
              className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-6 text-white hover:shadow-lg transition-all group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-1">Browse Restaurants</h3>
                  <p className="text-green-100 text-sm">Explore all available restaurants</p>
                </div>
                <UtensilsCrossed className="w-8 h-8 opacity-30 group-hover:opacity-50 transition-opacity" />
              </div>
            </Link>

            <Link
              href="/orders"
              className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white hover:shadow-lg transition-all group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-1">My Orders</h3>
                  <p className="text-blue-100 text-sm">View active and past orders</p>
                </div>
                <ShoppingBag className="w-8 h-8 opacity-30 group-hover:opacity-50 transition-opacity" />
              </div>
            </Link>

            <Link
              href="/profile"
              className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-6 text-white hover:shadow-lg transition-all group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-1">Manage Addresses</h3>
                  <p className="text-purple-100 text-sm">Update delivery locations</p>
                </div>
                <MapPin className="w-8 h-8 opacity-30 group-hover:opacity-50 transition-opacity" />
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Recent Orders
            </h2>
            <Link
              href="/orders"
              className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-1"
            >
              {t('common.seeAll')}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-800 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {order.restaurant}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {order.date}
                      </span>
                      <span className="px-2.5 py-0.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-xs font-medium">
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 dark:text-white">
                      {order.amount}
                    </p>
                    <button className="text-green-600 hover:text-green-700 text-sm font-medium mt-1">
                      Reorder
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Favorite Restaurants */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Your Favorite Restaurants
            </h2>
            <button className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-1">
              {t('common.seeAll')}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((restaurant) => (
              <div
                key={restaurant.id}
                className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-800 transition-all group cursor-pointer"
              >
                <div className="h-40 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform">
                  {restaurant.icon}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {restaurant.name}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      {restaurant.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {restaurant.deliveryTime}
                    </span>
                  </div>
                  <button className="w-full py-2.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 font-semibold rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                    Browse Menu
                  </button>
                </div>
              </div>
            ))}

            {/* Add More */}
            <button className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-800 transition-all group flex items-center justify-center h-80">
              <div className="text-center">
                <Plus className="w-12 h-12 text-gray-400 mx-auto mb-2 group-hover:text-green-600 transition-colors" />
                <p className="text-gray-600 dark:text-gray-400 font-medium">Add More Favorites</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
