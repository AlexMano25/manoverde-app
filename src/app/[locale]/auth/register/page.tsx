import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import { Link } from '@/i18n/routing';
import { Mail, Lock, User, Phone, UtensilsCrossed, Truck, Users } from 'lucide-react';

export default async function RegisterPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <RegisterContent locale={locale} />;
}

function RegisterContent({ locale }: { locale: string }) {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar locale={locale} />
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">M</span>
            </div>
            <h1 className="text-2xl font-bold">{t('auth.registerTitle')}</h1>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
            {/* Role selection */}
            <p className="text-sm font-medium mb-3">{t('auth.selectRole')}</p>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { role: 'customer', icon: Users, label: t('auth.asCustomer'), color: 'green' },
                { role: 'restaurant', icon: UtensilsCrossed, label: t('auth.asRestaurant'), color: 'blue' },
                { role: 'courier', icon: Truck, label: t('auth.asCourier'), color: 'orange' },
              ].map(({ role, icon: Icon, label, color }) => (
                <button
                  key={role}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    role === 'customer'
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-600'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 text-gray-500'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs font-medium">{label}</span>
                </button>
              ))}
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">{t('auth.fullName')}</label>
                <div className="relative">
                  <User className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" className="w-full ps-10 pe-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t('auth.email')}</label>
                <div className="relative">
                  <Mail className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="email" className="w-full ps-10 pe-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t('auth.phone')}</label>
                <div className="relative">
                  <Phone className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="tel" className="w-full ps-10 pe-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="+237 6XX XXX XXX" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t('auth.password')}</label>
                <div className="relative">
                  <Lock className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="password" className="w-full ps-10 pe-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
              </div>

              <label className="flex items-start gap-2 text-sm">
                <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">{t('auth.termsAgree')}</span>
              </label>

              <button type="submit" className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors">
                {t('auth.registerButton')}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                {t('auth.hasAccount')}{' '}
                <Link href="/auth/login" className="text-green-600 font-medium hover:underline">
                  {t('auth.loginButton')}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
