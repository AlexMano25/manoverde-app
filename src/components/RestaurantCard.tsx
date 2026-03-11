'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Star, Clock, MapPin } from 'lucide-react';

interface RestaurantCardProps {
  id: string;
  name: string;
  imageUrl?: string;
  cuisineType: string;
  ratingAvg: number;
  ratingCount: number;
  deliveryTime: string;
  cityName: string;
  is3Star?: boolean;
  is5Star?: boolean;
}

export default function RestaurantCard({
  id, name, imageUrl, cuisineType, ratingAvg, ratingCount,
  deliveryTime, cityName, is3Star, is5Star,
}: RestaurantCardProps) {
  const t = useTranslations('restaurants');

  return (
    <Link href={`/restaurants/${id}`} className="group block">
      <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800">
        {/* Image */}
        <div className="relative h-48 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 overflow-hidden">
          {imageUrl ? (
            <img src={imageUrl} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-5xl">🍽️</span>
            </div>
          )}
          {/* Badges */}
          <div className="absolute top-3 start-3 flex gap-2">
            {is5Star && (
              <span className="px-2.5 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full shadow">
                ⭐ 5 {t('fiveStars')}
              </span>
            )}
            {is3Star && !is5Star && (
              <span className="px-2.5 py-1 bg-orange-500 text-white text-xs font-bold rounded-full shadow">
                ⭐ 3 {t('threeStars')}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-green-600 transition-colors">
            {name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 capitalize">{cuisineType}</p>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-1 text-sm">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-medium">{ratingAvg.toFixed(1)}</span>
              <span className="text-gray-400">({ratingCount})</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{deliveryTime}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <MapPin className="w-4 h-4" />
              <span>{cityName}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
