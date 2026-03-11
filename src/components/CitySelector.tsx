'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MapPin, ChevronDown, Check } from 'lucide-react';

const CITIES = [
  'Yaoundé', 'Douala', 'Bafoussam', 'Bamenda',
  'Garoua', 'Maroua', 'Kribi', 'Limbé',
];

interface CitySelectorProps {
  selected?: string;
  onSelect: (city: string) => void;
}

export default function CitySelector({ selected, onSelect }: CitySelectorProps) {
  const t = useTranslations('home');
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:border-green-400 transition-colors"
      >
        <MapPin className="w-4 h-4 text-green-600" />
        <span className="text-sm font-medium">
          {selected || t('selectCity')}
        </span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>

      {open && (
        <div className="absolute start-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
          {CITIES.map((city) => (
            <button
              key={city}
              onClick={() => { onSelect(city); setOpen(false); }}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                selected === city ? 'text-green-600 font-medium' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <span>{city}</span>
              {selected === city && <Check className="w-4 h-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
