import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from '@/i18n/routing';
import { ChevronLeft, Cookie } from 'lucide-react';

export default async function CookiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CookiesContent locale={locale} />;
}

function CookiesContent({ locale }: { locale: string }) {
  const t = useTranslations('legal');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar locale={locale} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium mb-8 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          {t('back')}
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-start gap-4 mb-6">
            <Cookie className="w-10 h-10 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {t('cookies.title')}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {t('cookies.subtitle')}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('cookies.lastUpdated')}
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 prose dark:prose-invert max-w-none">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('cookies.section1Title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('cookies.section1Content')}
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('cookies.section2Title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t('cookies.section2ContentIntro')}
            </p>

            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-4">
              {t('cookies.section2SubtitleEssential')}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('cookies.section2EssentialDesc')}
            </p>

            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-4">
              {t('cookies.section2SubtitlePerformance')}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('cookies.section2PerformanceDesc')}
            </p>

            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-4">
              {t('cookies.section2SubtitleFunctional')}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('cookies.section2FunctionalDesc')}
            </p>

            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-4">
              {t('cookies.section2SubtitleMarketing')}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('cookies.section2MarketingDesc')}
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('cookies.section3Title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('cookies.section3Content')}
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('cookies.section4Title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              {t('cookies.section4ContentIntro')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>{t('cookies.section4Item1')}</li>
              <li>{t('cookies.section4Item2')}</li>
              <li>{t('cookies.section4Item3')}</li>
              <li>{t('cookies.section4Item4')}</li>
              <li>{t('cookies.section4Item5')}</li>
              <li>{t('cookies.section4Item6')}</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('cookies.section5Title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t('cookies.section5ContentIntro')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>{t('cookies.section5Item1')}</li>
              <li>{t('cookies.section5Item2')}</li>
              <li>{t('cookies.section5Item3')}</li>
              <li>{t('cookies.section5Item4')}</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              {t('cookies.section5Note')}
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('cookies.section6Title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('cookies.section6Content')}
            </p>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t('cookies.ctaText')}
          </p>
          <Link
            href="/auth/register"
            className="inline-flex items-center justify-center px-8 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors"
          >
            {t('cookies.ctaButton')}
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
