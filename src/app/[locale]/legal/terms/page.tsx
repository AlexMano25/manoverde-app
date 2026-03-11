import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from '@/i18n/routing';
import { ChevronLeft } from 'lucide-react';

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TermsContent locale={locale} />;
}

function TermsContent({ locale }: { locale: string }) {
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
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('terms.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('terms.lastUpdated')}
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 prose dark:prose-invert max-w-none">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('terms.section1Title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('terms.section1Content')}
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('terms.section2Title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              {t('terms.section2ContentIntro')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>{t('terms.section2Item1')}</li>
              <li>{t('terms.section2Item2')}</li>
              <li>{t('terms.section2Item3')}</li>
              <li>{t('terms.section2Item4')}</li>
              <li>{t('terms.section2Item5')}</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('terms.section3Title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('terms.section3Content')}
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('terms.section4Title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('terms.section4Content')}
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('terms.section5Title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('terms.section5Content')}
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('terms.section6Title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('terms.section6Content')}
            </p>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t('terms.ctaText')}
          </p>
          <Link
            href="/auth/register"
            className="inline-flex items-center justify-center px-8 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors"
          >
            {t('terms.ctaButton')}
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
