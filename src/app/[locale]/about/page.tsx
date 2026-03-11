import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from '@/i18n/routing';
import { Users, Target, Zap, Heart, ChevronRight, MapPin, UtensilsCrossed, Truck, Award } from 'lucide-react';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutContent locale={locale} />;
}

function AboutContent({ locale }: { locale: string }) {
  const t = useTranslations('about');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar locale={locale} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white overflow-hidden py-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-2xl">
            <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight tracking-tight mb-6">
              {t('title')}
            </h1>
            <p className="text-xl text-green-100 leading-relaxed">
              {t('subtitle')}
            </p>
          </div>
        </div>
        <div className="absolute -bottom-1 left-0 right-0 h-16 bg-gray-50 dark:bg-gray-950" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }} />
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Our Story */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {t('story')}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-4">
                {t('storyParagraph1')}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-4">
                {t('storyParagraph2')}
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl h-96 flex items-center justify-center">
              <UtensilsCrossed className="w-32 h-32 text-green-600 opacity-20" />
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            {t('values')}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('missionTitle')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {t('missionDesc')}
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('visionTitle')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {t('visionDesc')}
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            {t('coreValues')}
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                key: 'excellence'
              },
              {
                icon: Truck,
                key: 'fastDelivery'
              },
              {
                icon: Users,
                key: 'localCommunity'
              },
              {
                icon: Zap,
                key: 'innovation'
              }
            ].map((value, idx) => {
              const Icon = value.icon;
              return (
                <div key={idx} className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {t(`value${idx === 0 ? 'Excellence' : idx === 1 ? 'FastDelivery' : idx === 2 ? 'LocalCommunity' : 'Innovation'}Title`)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t(`value${idx === 0 ? 'Excellence' : idx === 1 ? 'FastDelivery' : idx === 2 ? 'LocalCommunity' : 'Innovation'}Desc`)}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* By The Numbers */}
        <section className="mb-20 bg-green-50 dark:bg-green-900/10 rounded-3xl p-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            {t('byNumbers')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50+', label: t('restaurants') },
              { value: '8', label: t('cities') },
              { value: '100+', label: t('deliveryPartners') },
              { value: '10K+', label: t('happyCustomers') }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl font-extrabold text-green-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Our Team */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            {t('ourTeam')}
          </h2>
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-12 border border-gray-200 dark:border-gray-700 text-center">
            <Users className="w-16 h-16 text-green-600 mx-auto mb-6 opacity-50" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('teamSubtitle')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
              {t('teamDesc')}
            </p>
          </div>
        </section>

        {/* Cities & Expansion */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            {t('whereWeOperate')}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t('nowAvailable')}</h3>
              <ul className="space-y-2">
                {[
                  { name: 'Yaoundé', key: 'yaonde' },
                  { name: 'Douala', key: 'douala' },
                  { name: 'Bafoussam', key: 'bafoussam' },
                  { name: 'Bamenda', key: 'bamenda' },
                  { name: 'Buea', key: 'buea' },
                  { name: 'Kumba', key: 'kumba' }
                ].map((city) => (
                  <li key={city.key} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4 text-green-600" />
                    {city.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t('comingSoon')}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {t('expansionDesc')}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
              >
                {t('requestService')}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t('ctaTitle')}
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            {t('ctaDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-700 font-semibold rounded-xl hover:bg-green-50 transition-colors"
            >
              {t('getStarted')}
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-green-500/30 text-white font-semibold rounded-xl hover:bg-green-500/40 transition-colors border border-white/20"
            >
              {t('contactUs')}
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
