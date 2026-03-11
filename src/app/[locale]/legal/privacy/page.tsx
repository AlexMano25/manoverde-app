import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from '@/i18n/routing';
import { ChevronLeft, Shield } from 'lucide-react';

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PrivacyContent locale={locale} />;
}

function PrivacyContent({ locale }: { locale: string }) {
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
            <Shield className="w-10 h-10 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {t('privacy.title')}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {t('privacy.subtitle')}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('privacy.lastUpdated')}
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 prose dark:prose-invert max-w-none">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('privacy.section1Title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('privacy.section1Content')}
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('privacy.section2Title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t('privacy.section2ContentIntro')}
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
              {t('privacy.section2SubtitleTypes')}
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>{t('privacy.section2Item1')}</li>
              <li>{t('privacy.section2Item2')}</li>
              <li>{t('privacy.section2Item3')}</li>
              <li>{t('privacy.section2Item4')}</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('privacy.section3Title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              {t('privacy.section3ContentIntro')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>{t('privacy.section3Item1')}</li>
              <li>{t('privacy.section3Item2')}</li>
              <li>{t('privacy.section3Item3')}</li>
              <li>{t('privacy.section3Item4')}</li>
              <li>{t('privacy.section3Item5')}</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('privacy.section4Title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('privacy.section4Content')}
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('privacy.section5Title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('privacy.section5Content')}
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('privacy.section6Title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              {t('privacy.section6ContentIntro')}
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-gray-700 dark:text-gray-300">
              <p className="font-medium mb-2">{t('privacy.section6Email')}</p>
              <p className="font-medium">{t('privacy.section6Mail')}</p>
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t('privacy.ctaText')}
          </p>
          <Link
            href="/auth/register"
            className="inline-flex items-center justify-center px-8 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors"
          >
            {t('privacy.ctaButton')}
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
