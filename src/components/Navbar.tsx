'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { useRouter } from '@/i18n/routing';
import { localeNames, type Locale } from '@/i18n/config';
import { Menu, X, ShoppingBag, User, Globe, ChevronDown } from 'lucide-react';

export default function Navbar({ locale }: { locale: string }) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as Locale });
    setLangOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="font-bold text-xl text-green-700 dark:text-green-400 hidden sm:block">
              Mano Verde
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className={`text-sm font-medium transition-colors hover:text-green-600 ${pathname === '/' ? 'text-green-600' : 'text-gray-600 dark:text-gray-300'}`}>
              {t('home')}
            </Link>
            <Link href="/restaurants" className={`text-sm font-medium transition-colors hover:text-green-600 ${pathname.startsWith('/restaurants') ? 'text-green-600' : 'text-gray-600 dark:text-gray-300'}`}>
              {t('restaurants')}
            </Link>
            <Link href="/orders" className={`text-sm font-medium transition-colors hover:text-green-600 ${pathname.startsWith('/orders') ? 'text-green-600' : 'text-gray-600 dark:text-gray-300'}`}>
              {t('orders')}
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-green-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">{localeNames[locale as Locale]}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {langOpen && (
                <div className="absolute end-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                  {Object.entries(localeNames).map(([code, name]) => (
                    <button
                      key={code}
                      onClick={() => handleLocaleChange(code)}
                      className={`w-full text-start px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                        locale === code ? 'text-green-600 font-semibold bg-green-50 dark:bg-green-900/20' : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Cart */}
            <Link href="/cart" className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-green-600 transition-colors">
              <ShoppingBag className="w-5 h-5" />
            </Link>

            {/* Profile */}
            <Link href="/auth/login" className="hidden md:flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-xl transition-colors">
              <User className="w-4 h-4" />
              {t('login')}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-gray-600 dark:text-gray-300"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col gap-2">
              <Link href="/" onClick={() => setMobileOpen(false)} className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                {t('home')}
              </Link>
              <Link href="/restaurants" onClick={() => setMobileOpen(false)} className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                {t('restaurants')}
              </Link>
              <Link href="/orders" onClick={() => setMobileOpen(false)} className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                {t('orders')}
              </Link>
              <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="px-3 py-2 text-sm font-medium text-green-600 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20">
                {t('login')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
