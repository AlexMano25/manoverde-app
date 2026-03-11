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
  const t = useTranslations();

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
          {t('common.back')}
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-start gap-4 mb-6">
            <Cookie className="w-10 h-10 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Cookie Policy
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Learn how we use cookies to enhance your experience
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Last updated: March 2026
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 prose dark:prose-invert max-w-none">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              1. What Are Cookies?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. They help websites remember information about your visit, such as your preferred language and other settings. Cookies can be used to track your online activity. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              2. Types of Cookies We Use
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              We use the following types of cookies on our website:
            </p>

            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-4">
              Essential Cookies
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              These cookies are necessary for the basic functions of the website and cannot be disabled. They help ensure site security and enable core functionality like login and payment processing.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-4">
              Performance Cookies
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              These cookies collect information about how visitors use our website, such as which pages are visited most often. The information is used to improve the website and optimize user experience.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-4">
              Functional Cookies
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              These cookies remember user preferences and choices, such as language preference, location, and login status, to provide a customized browsing experience.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-4">
              Marketing Cookies
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              These cookies are used to track visitors across websites to display relevant advertisements. You can opt out of marketing cookies at any time.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              3. Third-Party Cookies
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We work with third-party partners such as Google Analytics, payment processors, and advertising networks. These partners may also place cookies on your device. We do not control the cookies placed by third parties, and we encourage you to check their privacy policies to understand how they use your information.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              4. How We Use Cookies
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              We use cookies for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>To authenticate your identity and maintain your session</li>
              <li>To remember your preferences and settings</li>
              <li>To understand how you interact with our website</li>
              <li>To improve our services and user experience</li>
              <li>To process payments securely</li>
              <li>To provide personalized content and recommendations</li>
              <li>To measure the effectiveness of marketing campaigns</li>
              <li>To prevent fraud and ensure security</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              5. Your Cookie Choices
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Most web browsers allow you to control cookies through browser settings. You can:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>View what cookies are set and delete them</li>
              <li>Block all cookies or specific types of cookies</li>
              <li>Accept cookies from some sites and block them from others</li>
              <li>Clear all cookies when you close your browser</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              Please note that blocking certain cookies may affect your ability to use some features of our website.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              6. Local Storage and Similar Technologies
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              In addition to cookies, we may use other similar technologies such as local storage, session storage, and pixel tags to store information on your device and track your online activities. These work similarly to cookies and you can control them through your browser settings.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              7. Do Not Track Signals
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Some browsers include a "Do Not Track" feature. Our website currently does not respond to Do Not Track signals because there is no industry-wide standard for recognizing such signals. However, you can use other tools to control the collection and use of cookies as described in this policy.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              8. Updates to This Policy
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may update this Cookie Policy from time to time to reflect changes in our cookie practices or for other operational, legal, or regulatory reasons. We will notify you of any significant changes by updating the "Last updated" date of this policy. Your continued use of our website following the posting of revised changes means that you accept and agree to the changes.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              9. Contact Us
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              If you have any questions about our use of cookies or this Cookie Policy, please contact us:
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-gray-700 dark:text-gray-300">
              <p className="font-medium mb-2">By email: privacy@manoverde.com</p>
              <p className="font-medium">By mail: Mano Verde Inc SA, Yaoundé, Cameroon</p>
            </div>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              10. Additional Resources
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              For more information about cookies and online privacy, visit:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>
                <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700">
                  All About Cookies
                </a>
              </li>
              <li>
                <a href="https://www.youronlinechoices.com" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700">
                  Your Online Choices
                </a>
              </li>
            </ul>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We respect your privacy. Browse our site with confidence.
          </p>
          <Link
            href="/auth/register"
            className="inline-flex items-center justify-center px-8 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
