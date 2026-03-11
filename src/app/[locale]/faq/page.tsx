import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from '@/i18n/routing';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <FAQContent locale={locale} />;
}

function FAQContent({ locale }: { locale: string }) {
  const t = useTranslations('faq');

  const faqCategories = [
    {
      titleKey: 'customers.title',
      icon: '🛒',
      faqs: [
        {
          qKey: 'customers.q1',
          aKey: 'customers.a1'
        },
        {
          qKey: 'customers.q2',
          aKey: 'customers.a2'
        }
      ]
    },
    {
      titleKey: 'restaurants.title',
      icon: '🍽️',
      faqs: [
        {
          qKey: 'restaurants.q1',
          aKey: 'restaurants.a1'
        },
        {
          qKey: 'restaurants.q2',
          aKey: 'restaurants.a2'
        }
      ]
    },
    {
      titleKey: 'delivery.title',
      icon: '🚚',
      faqs: [
        {
          qKey: 'delivery.q1',
          aKey: 'delivery.a1'
        },
        {
          qKey: 'delivery.q2',
          aKey: 'delivery.a2'
        }
      ]
    },
    {
      titleKey: 'general.title',
      icon: '❓',
      faqs: [
        {
          qKey: 'general.q1',
          aKey: 'general.a1'
        },
        {
          qKey: 'general.q2',
          aKey: 'general.a2'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar locale={locale} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white overflow-hidden py-16">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-2xl mx-auto text-center">
            <HelpCircle className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-4">
              {t('title')}
            </h1>
            <p className="text-xl text-green-100">
              {t('subtitle')}
            </p>
          </div>
        </div>
        <div className="absolute -bottom-1 left-0 right-0 h-16 bg-gray-50 dark:bg-gray-950" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }} />
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* FAQ Categories */}
        {faqCategories.map((category, catIdx) => (
          <section key={catIdx} className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl">{category.icon}</span>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t(category.titleKey)}
              </h2>
            </div>

            <div className="space-y-4">
              {category.faqs.map((faq, faqIdx) => (
                <FAQAccordion key={faqIdx} question={t(faq.qKey)} answer={t(faq.aKey)} />
              ))}
            </div>
          </section>
        ))}

        {/* Contact Section */}
        <section className="mt-20 bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-12 text-white text-center">
          <MessageCircle className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl font-bold mb-4">
            {t('stillHaveQuestions')}
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            {t('supportDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:infos@manovende.com"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-700 font-semibold rounded-xl hover:bg-green-50 transition-colors"
            >
              {t('emailUs')}
            </a>
            <button className="inline-flex items-center justify-center px-8 py-4 bg-green-500/30 text-white font-semibold rounded-xl hover:bg-green-500/40 transition-colors border border-white/20">
              {t('chatWithUs')}
            </button>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

function FAQAccordion({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group">
      <summary className="flex cursor-pointer items-center justify-between rounded-xl bg-white dark:bg-gray-900 p-6 border border-gray-200 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-800 transition-colors">
        <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
          {question}
        </h3>
        <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-400 transition-transform group-open:rotate-180" />
      </summary>
      <div className="group-open:animate-in rounded-b-xl bg-gray-50 dark:bg-gray-800 px-6 py-4 border border-t-0 border-gray-200 dark:border-gray-700 border-gray-200 dark:border-gray-700">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {answer}
        </p>
      </div>
    </details>
  );
}
