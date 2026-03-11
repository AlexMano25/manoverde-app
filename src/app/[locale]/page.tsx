import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from '@/i18n/routing';
import { UtensilsCrossed, Truck, MapPin, Star, ChevronRight, Smartphone, Users, Clock } from 'lucide-react';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent locale={locale} />;
}

function HomeContent({ locale }: { locale: string }) {
  const t = useTranslations();

  return (
    <div className="min-h-screen">
      <Navbar locale={locale} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 rounded-full text-sm mb-6 backdrop-blur-sm">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span>{t('restaurants.threeStars')} & {t('restaurants.fiveStars')}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              {t('home.hero')}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-green-100 leading-relaxed">
              {t('home.heroSubtitle')}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/restaurants"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-green-700 font-semibold rounded-2xl hover:bg-green-50 transition-all shadow-lg shadow-green-900/30 text-lg"
              >
                <UtensilsCrossed className="w-5 h-5" />
                {t('nav.restaurants')}
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500/30 text-white font-semibold rounded-2xl hover:bg-green-500/40 transition-all backdrop-blur-sm border border-white/20 text-lg"
              >
                <Smartphone className="w-5 h-5" />
                {t('home.downloadApp')}
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -bottom-1 left-0 right-0 h-16 bg-white dark:bg-gray-950" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }} />
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-14">{t('home.howItWorks')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: UtensilsCrossed, title: t('home.step1Title'), desc: t('home.step1Desc'), color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' },
              { icon: Smartphone, title: t('home.step2Title'), desc: t('home.step2Desc'), color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
              { icon: MapPin, title: t('home.step3Title'), desc: t('home.step3Desc'), color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' },
              { icon: Star, title: t('home.step4Title'), desc: t('home.step4Desc'), color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' },
            ].map((step, i) => (
              <div key={i} className="text-center group">
                <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform`}>
                  <step.icon className="w-7 h-7" />
                </div>
                <div className="text-sm font-bold text-green-600 mb-2">0{i + 1}</div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-green-50 dark:bg-green-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '50+', label: t('nav.restaurants'), icon: UtensilsCrossed },
              { value: '8', label: t('home.selectCity').replace('...', ''), icon: MapPin },
              { value: '100+', label: t('courier.dashboard').split(' ')[0], icon: Truck },
              { value: '24/7', label: t('nav.help'), icon: Clock },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-extrabold text-green-600 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA: Become Partner */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-3xl p-8 sm:p-10 text-white">
              <Users className="w-10 h-10 mb-4 opacity-80" />
              <h3 className="text-2xl font-bold mb-3">{t('home.becomePartner')}</h3>
              <p className="text-green-100 mb-6 leading-relaxed">
                {t('footer.aboutDesc')}
              </p>
              <Link href="/auth/register" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-700 font-semibold rounded-xl hover:bg-green-50 transition-colors">
                {t('nav.register')}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-8 sm:p-10 text-white">
              <Truck className="w-10 h-10 mb-4 opacity-80" />
              <h3 className="text-2xl font-bold mb-3">{t('home.becomeCourier')}</h3>
              <p className="text-orange-100 mb-6 leading-relaxed">
                {t('courier.dashboard')}
              </p>
              <Link href="/auth/register" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-orange-700 font-semibold rounded-xl hover:bg-orange-50 transition-colors">
                {t('nav.register')}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
