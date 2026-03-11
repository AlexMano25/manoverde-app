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
  const t = useTranslations();

  const faqCategories = [
    {
      title: 'For Customers',
      icon: '🛒',
      faqs: [
        {
          q: 'How do I place an order?',
          a: 'Simply download the Mano Verde app or visit our website, browse restaurants, select your dishes, and proceed to checkout. You can pay via MTN Mobile Money, Orange Money, or credit card.'
        },
        {
          q: 'How long does delivery take?',
          a: 'Delivery time depends on the restaurant and distance. Typical delivery times range from 20-45 minutes. You can see the estimated delivery time before placing your order.'
        },
        {
          q: 'What are the delivery fees?',
          a: 'Delivery fees vary by location and distance, typically ranging from 500 to 2,000 XAF. The exact fee is shown at checkout before you confirm your order.'
        },
        {
          q: 'Can I track my order?',
          a: 'Yes! Once your order is accepted by the restaurant and picked up by our delivery partner, you can track it in real-time on the map within the app.'
        },
        {
          q: 'What payment methods do you accept?',
          a: 'We accept MTN Mobile Money, Orange Money, and credit/debit cards. All transactions are secure and encrypted.'
        },
        {
          q: 'Can I cancel my order?',
          a: 'You can cancel your order before the restaurant starts preparing it. If the restaurant has already started, you may not be able to cancel. Contact our support team for assistance.'
        },
        {
          q: 'What if my order is wrong or late?',
          a: 'Contact our customer support immediately. We work with restaurants to resolve any issues quickly. You may be eligible for a refund or credit depending on the situation.'
        },
        {
          q: 'Do you offer loyalty programs?',
          a: 'Yes! Our loyalty program rewards you with points on every order that can be redeemed for discounts. The more you order, the more benefits you get.'
        }
      ]
    },
    {
      title: 'For Restaurants',
      icon: '🍽️',
      faqs: [
        {
          q: 'How do I become a restaurant partner?',
          a: 'Contact our restaurant partnerships team via the website or app. We\'ll evaluate your restaurant and discuss commission rates, terms, and integration requirements.'
        },
        {
          q: 'What commission does Mano Verde take?',
          a: 'Commission rates vary based on the restaurant type and location, typically ranging from 15-25%. We discuss custom rates with high-volume restaurants.'
        },
        {
          q: 'How do I manage my menu?',
          a: 'You can manage your menu through the restaurant dashboard. Add, edit, or remove dishes, update prices, and adjust availability in real-time.'
        },
        {
          q: 'How do I receive orders?',
          a: 'Orders are sent to your restaurant dashboard and can be printed or viewed on a tablet/computer. Our system sends notifications for new orders.'
        },
        {
          q: 'What if I want to go offline?',
          a: 'You can pause orders through your dashboard at any time. Customers won\'t be able to place new orders, but active orders will still be fulfilled.'
        },
        {
          q: 'How do I get paid?',
          a: 'We process payouts weekly to your preferred bank account. Your earnings are calculated after deducting our commission and any refunds.'
        },
        {
          q: 'Can I see my sales analytics?',
          a: 'Yes! The restaurant dashboard provides detailed analytics including daily sales, order trends, top dishes, and customer ratings.'
        },
        {
          q: 'What support do you provide?',
          a: 'We provide 24/7 customer support, training, technical assistance, and marketing support to help your restaurant succeed on our platform.'
        }
      ]
    },
    {
      title: 'For Delivery Partners',
      icon: '🚚',
      faqs: [
        {
          q: 'How do I become a delivery partner?',
          a: 'Sign up through the app with a valid ID and proof of address. We verify your information and provide training. You\'ll need a reliable phone and vehicle (motorcycle, bicycle, or car).'
        },
        {
          q: 'How much can I earn?',
          a: 'Your earnings depend on the number and distance of deliveries. Most delivery partners earn 15,000-40,000 XAF daily. You keep 85% of the delivery fee, and Mano Verde takes 15% commission.'
        },
        {
          q: 'How often do I get paid?',
          a: 'We process payouts weekly. You can request a payout anytime through the app, and funds appear in your account within 24 hours.'
        },
        {
          q: 'Do I need insurance?',
          a: 'We provide basic coverage during deliveries. However, we recommend you maintain your own vehicle insurance as well.'
        },
        {
          q: 'How do I accept deliveries?',
          a: 'Open the app, and available deliveries appear in real-time. Tap to accept an order, navigate to the restaurant, pick up the food, and deliver to the customer.'
        },
        {
          q: 'What if a customer complains about my delivery?',
          a: 'We investigate all complaints. If the issue is resolved in your favor, no action is taken. Repeated issues may affect your rating and eligibility.'
        },
        {
          q: 'How is my rating calculated?',
          a: 'Your rating is based on customer reviews and on-time delivery records. Maintain high ratings to access priority deliveries with higher earnings.'
        },
        {
          q: 'Can I set my working hours?',
          a: 'Yes! You can go online/offline anytime. Set your availability and only accept deliveries when you\'re ready to work.'
        }
      ]
    },
    {
      title: 'General Questions',
      icon: '❓',
      faqs: [
        {
          q: 'What cities does Mano Verde operate in?',
          a: 'We currently operate in Yaoundé, Douala, Bafoussam, Bamenda, Buea, Kumba, Bertoua, and Garoua. We\'re expanding to more cities regularly.'
        },
        {
          q: 'Is Mano Verde available 24/7?',
          a: 'Restaurants set their own hours, so availability varies. Most of our partner restaurants are open during lunch and dinner hours. You can check restaurant hours in the app.'
        },
        {
          q: 'How do I contact customer support?',
          a: 'You can reach us via the app chat, email at support@manoverde.com, or phone. We respond within 2 hours during business hours.'
        },
        {
          q: 'What is your refund policy?',
          a: 'If your order doesn\'t arrive or is significantly different from what you ordered, we offer a full refund or redelivery. Contact us within 30 minutes of delivery.'
        },
        {
          q: 'Is my personal data safe?',
          a: 'Yes, we use industry-standard encryption and follow strict privacy policies. Your data is never shared with third parties without consent.'
        },
        {
          q: 'Are there discounts or promos?',
          a: 'We regularly offer discounts, promotional codes, and seasonal offers. Check the app for current deals and subscribe to our newsletter.'
        },
        {
          q: 'How do I provide feedback?',
          a: 'Use the feedback feature in the app or email us at feedback@manoverde.com. We value your suggestions and use them to improve our service.'
        },
        {
          q: 'What languages does the app support?',
          a: 'Mano Verde supports English, French, Spanish, Portuguese, German, Italian, Arabic, and Chinese. You can change the language in app settings.'
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
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-green-100">
              Find answers to common questions about Mano Verde
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
                {category.title}
              </h2>
            </div>

            <div className="space-y-4">
              {category.faqs.map((faq, faqIdx) => (
                <FAQAccordion key={faqIdx} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </section>
        ))}

        {/* Contact Section */}
        <section className="mt-20 bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-12 text-white text-center">
          <MessageCircle className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl font-bold mb-4">
            Still Have Questions?
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our customer support team is here to help 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@manoverde.com"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-700 font-semibold rounded-xl hover:bg-green-50 transition-colors"
            >
              Email Us
            </a>
            <button className="inline-flex items-center justify-center px-8 py-4 bg-green-500/30 text-white font-semibold rounded-xl hover:bg-green-500/40 transition-colors border border-white/20">
              Chat with Us
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
