import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RestaurantCard from '@/components/RestaurantCard';
import { Search, SlidersHorizontal } from 'lucide-react';

// Demo data for MVP
const DEMO_RESTAURANTS = [
  { id: '1', name: 'Le Jardin des Saveurs', cuisineType: 'camerounaise', ratingAvg: 4.8, ratingCount: 124, deliveryTime: '25-35 min', cityName: 'Yaoundé', is5Star: true },
  { id: '2', name: 'La Table Royale', cuisineType: 'francaise', ratingAvg: 4.6, ratingCount: 89, deliveryTime: '30-40 min', cityName: 'Douala', is5Star: true },
  { id: '3', name: 'Chez Mama Ngono', cuisineType: 'africaine', ratingAvg: 4.9, ratingCount: 256, deliveryTime: '20-30 min', cityName: 'Yaoundé', is3Star: true },
  { id: '4', name: 'Sakura Fusion', cuisineType: 'asiatique', ratingAvg: 4.5, ratingCount: 67, deliveryTime: '25-35 min', cityName: 'Douala', is3Star: true },
  { id: '5', name: 'Il Giardino', cuisineType: 'italienne', ratingAvg: 4.7, ratingCount: 143, deliveryTime: '30-45 min', cityName: 'Yaoundé', is5Star: true },
  { id: '6', name: 'Le Beirut', cuisineType: 'libanaise', ratingAvg: 4.4, ratingCount: 78, deliveryTime: '20-30 min', cityName: 'Douala', is3Star: true },
  { id: '7', name: 'Ndolé Palace', cuisineType: 'camerounaise', ratingAvg: 4.8, ratingCount: 312, deliveryTime: '25-40 min', cityName: 'Bafoussam', is5Star: true },
  { id: '8', name: 'Golden Grill', cuisineType: 'grillades', ratingAvg: 4.3, ratingCount: 45, deliveryTime: '20-25 min', cityName: 'Bamenda', is3Star: true },
];

export default async function RestaurantsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <RestaurantsContent locale={locale} />;
}

function RestaurantsContent({ locale }: { locale: string }) {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar locale={locale} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold">{t('restaurants.title')}</h1>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex-1 sm:flex-initial relative">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={t('common.search')}
                className="w-full sm:w-64 ps-10 pe-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm hover:border-green-400 transition-colors">
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">{t('restaurants.filterByCuisine')}</span>
            </button>
          </div>
        </div>

        {/* Filters pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['camerounaise', 'francaise', 'italienne', 'asiatique', 'libanaise', 'grillades', 'africaine'].map((cuisine) => (
            <button
              key={cuisine}
              className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full text-sm capitalize hover:border-green-500 hover:text-green-600 transition-colors"
            >
              {cuisine}
            </button>
          ))}
        </div>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {DEMO_RESTAURANTS.map((r) => (
            <RestaurantCard key={r.id} {...r} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
