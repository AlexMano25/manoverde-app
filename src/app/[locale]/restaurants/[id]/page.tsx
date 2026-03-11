import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Star, Clock, MapPin, Phone, Plus, Minus } from 'lucide-react';

const DEMO_DISHES = [
  { id: '1', name: 'Ndolé Premium', description: 'Ndolé aux crevettes et boeuf, accompagné de plantains mûrs et miondo', price: 5500, prepTime: 25, category: 'Plats principaux', available: true },
  { id: '2', name: 'Poulet DG', description: 'Poulet directeur général aux légumes sautés et plantains frits', price: 6000, prepTime: 30, category: 'Plats principaux', available: true },
  { id: '3', name: 'Eru Royal', description: 'Eru traditionnel aux escargots et crevettes, servi avec water fufu', price: 4500, prepTime: 20, category: 'Plats principaux', available: true },
  { id: '4', name: 'Brochettes de Boeuf', description: 'Brochettes marinées aux épices africaines, servies avec sauce piquante', price: 3500, prepTime: 15, category: 'Entrées', available: true },
  { id: '5', name: 'Poisson Braisé', description: 'Bar entier braisé aux épices, avec plantains et condiments', price: 7500, prepTime: 35, category: 'Plats principaux', available: false },
  { id: '6', name: 'Jus de Gingembre', description: 'Jus frais de gingembre et citron, préparé artisanalement', price: 1000, prepTime: 5, category: 'Boissons', available: true },
];

export default async function RestaurantDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <RestaurantDetail locale={locale} />;
}

function RestaurantDetail({ locale }: { locale: string }) {
  const t = useTranslations();
  const categories = [...new Set(DEMO_DISHES.map(d => d.category))];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar locale={locale} />

      {/* Restaurant Header */}
      <div className="bg-gradient-to-br from-green-600 to-emerald-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-3xl backdrop-blur-sm shrink-0">
              🍽️
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 bg-yellow-500 text-white text-xs font-bold rounded-full">⭐ 5 {t('restaurants.fiveStars')}</span>
              </div>
              <h1 className="text-3xl font-bold">Le Jardin des Saveurs</h1>
              <p className="text-green-100 mt-2">Cuisine camerounaise gastronomique</p>
              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-green-100">
                <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> 4.8 (124 {t('restaurants.ratings')})</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 25-35 min</span>
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Yaoundé</span>
                <span className="flex items-center gap-1"><Phone className="w-4 h-4" /> +237 6XX XXX XXX</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-full whitespace-nowrap">
            {t('menu.alaCarteMenu')}
          </button>
          <button className="px-4 py-2 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 text-sm rounded-full whitespace-nowrap border border-gray-200 dark:border-gray-700 hover:border-green-400 transition-colors">
            {t('menu.dailyMenu')}
          </button>
          <button className="px-4 py-2 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 text-sm rounded-full whitespace-nowrap border border-gray-200 dark:border-gray-700 hover:border-green-400 transition-colors">
            {t('menu.weeklyMenu')}
          </button>
        </div>

        {/* Dishes by category */}
        {categories.map((cat) => (
          <div key={cat} className="mb-10">
            <h2 className="text-xl font-bold mb-4">{cat}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DEMO_DISHES.filter(d => d.category === cat).map((dish) => (
                <div key={dish.id} className={`bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 flex justify-between gap-4 ${!dish.available ? 'opacity-50' : 'hover:shadow-md'} transition-all`}>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{dish.name}</h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{dish.description}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <span className="font-bold text-green-600">{dish.price.toLocaleString()} XAF</span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {dish.prepTime} {t('menu.minutes')}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 rounded-xl flex items-center justify-center text-2xl">
                      🍲
                    </div>
                    {dish.available ? (
                      <button className="flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-lg transition-colors">
                        <Plus className="w-3 h-3" />
                        {t('menu.addToCart')}
                      </button>
                    ) : (
                      <span className="text-xs text-red-500 font-medium">{t('menu.outOfStock')}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
