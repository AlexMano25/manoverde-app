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
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar locale={locale} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white overflow-hidden py-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-2xl">
            <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight tracking-tight mb-6">
              About Mano Verde
            </h1>
            <p className="text-xl text-green-100 leading-relaxed">
              Connecting food lovers with the best restaurants in their cities, delivering exceptional culinary experiences to your doorstep.
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
                Our Story
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-4">
                Mano Verde started with a simple vision: to make premium gastronomy accessible to everyone. Founded in Yaoundé, Cameroon, we recognized a gap in the food delivery market - customers wanted quality, restaurants wanted growth, and delivery partners wanted opportunity.
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-4">
                Today, we're proud to connect food enthusiasts with the finest 3 and 5-star restaurants across 8 cities in Cameroon. We've facilitated thousands of orders, partnered with hundreds of restaurants, and empowered hundreds of delivery drivers to earn a sustainable income.
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                But we're just getting started. Our mission continues to evolve as we expand to new cities and improve our platform to serve all our stakeholders better.
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
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                To deliver excellence in food and service by connecting customers with premium restaurants, supporting entrepreneurs, and creating economic opportunities for our delivery partners.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We believe that everyone deserves access to quality food, prepared with passion and delivered with care.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                To become the most trusted and efficient food delivery platform across Africa, known for supporting small businesses and building sustainable livelihoods.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We envision a future where technology brings communities closer through great food.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: 'Customer First',
                description: 'Every decision we make prioritizes the satisfaction and experience of our customers.'
              },
              {
                icon: Users,
                title: 'Community',
                description: 'We support local restaurants and empower delivery partners to build their own businesses.'
              },
              {
                icon: Award,
                title: 'Excellence',
                description: 'We maintain the highest standards of quality, service, and reliability.'
              }
            ].map((value, idx) => {
              const Icon = value.icon;
              return (
                <div key={idx} className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* By The Numbers */}
        <section className="mb-20 bg-green-50 dark:bg-green-900/10 rounded-3xl p-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            By The Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50+', label: 'Restaurants' },
              { value: '8', label: 'Cities' },
              { value: '100+', label: 'Delivery Partners' },
              { value: '10K+', label: 'Happy Customers' }
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
            Our Team
          </h2>
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-12 border border-gray-200 dark:border-gray-700 text-center">
            <Users className="w-16 h-16 text-green-600 mx-auto mb-6 opacity-50" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Passionate About Food & Service
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
              Our diverse team brings together technology experts, food enthusiasts, logistics professionals, and customer service specialists. We're united by a passion for excellence and a commitment to building something meaningful.
            </p>
          </div>
        </section>

        {/* Cities & Expansion */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Where We Operate
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Now Available</h3>
              <ul className="space-y-2">
                {['Yaoundé', 'Douala', 'Bafoussam', 'Bamenda', 'Buea', 'Kumba', 'Bertoua', 'Garoua'].map((city) => (
                  <li key={city} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4 text-green-600" />
                    {city}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Coming Soon</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We're rapidly expanding across Cameroon and planning to reach other African cities in 2026.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
              >
                Request Service in Your City
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Join the Mano Verde Community
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            Whether you're a customer hungry for great food, a restaurant ready to grow, or a delivery partner looking for opportunity - there's a place for you at Mano Verde.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-700 font-semibold rounded-xl hover:bg-green-50 transition-colors"
            >
              Get Started Today
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-green-500/30 text-white font-semibold rounded-xl hover:bg-green-500/40 transition-colors border border-white/20"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
