import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from '@/i18n/routing';
import { Package, Clock, CheckCircle, Truck, ChevronRight } from 'lucide-react';

export default async function OrdersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <OrdersContent locale={locale} />;
}

function OrdersContent({ locale }: { locale: string }) {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar locale={locale} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">{t('orders.title')}</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-gray-800">
          <button className="pb-3 px-1 text-sm font-medium text-green-600 border-b-2 border-green-600">
            {t('orders.active')}
          </button>
          <button className="pb-3 px-1 text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors">
            {t('orders.history')}
          </button>
        </div>

        {/* Demo order */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden mb-4">
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-sm text-gray-400">{t('orders.orderNumber')}</span>
                <span className="font-mono font-bold ms-1">MV-20260311-04521</span>
              </div>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full">
                {t('orders.preparing')}
              </span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-xl flex items-center justify-center text-xl">🍽️</div>
              <div>
                <p className="font-medium">Le Jardin des Saveurs</p>
                <p className="text-sm text-gray-400">Ndolé Premium x1, Poulet DG x1</p>
              </div>
              <span className="ms-auto font-bold text-green-600">11,500 XAF</span>
            </div>

            {/* Progress steps */}
            <div className="flex items-center gap-1 mt-4">
              {[
                { done: true, icon: CheckCircle, label: t('orders.accepted') },
                { done: true, icon: Clock, label: t('orders.preparing') },
                { done: false, icon: Package, label: t('orders.ready') },
                { done: false, icon: Truck, label: t('orders.delivering') },
              ].map((step, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step.done ? 'bg-green-100 text-green-600 dark:bg-green-900/30' : 'bg-gray-100 text-gray-400 dark:bg-gray-800'}`}>
                    <step.icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] mt-1 ${step.done ? 'text-green-600 font-medium' : 'text-gray-400'}`}>{step.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="px-5 py-3 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between">
            <span className="text-sm text-gray-500">{t('orders.estimatedArrival')}: 14:35</span>
            <Link href="/orders/1" className="text-sm font-medium text-green-600 flex items-center gap-1 hover:underline">
              {t('orders.trackOrder')}
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
