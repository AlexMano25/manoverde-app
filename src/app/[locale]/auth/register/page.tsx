'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useTranslations } from 'next-intl';
import Navbar from '@/components/Navbar';
import { Link } from '@/i18n/routing';
import { Mail, Lock, User, Phone, UtensilsCrossed, Truck, Users, Building2, MapPin, Loader2 } from 'lucide-react';

export default function RegisterPage({ params }: { params: Promise<{ locale: string }> }) {
  const [locale, setLocale] = useState('fr');

  // Resolve params
  params.then(p => setLocale(p.locale));

  return <RegisterContent locale={locale} />;
}

function RegisterContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const [selectedRole, setSelectedRole] = useState('customer');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    city: '',
    restaurantName: '',
    vehicleType: 'moto',
    termsAccepted: false,
  });

  const roles = [
    { role: 'customer', icon: Users, label: t('auth.asCustomer'), color: 'green', desc: t('auth.customerDesc') },
    { role: 'restaurant', icon: UtensilsCrossed, label: t('auth.asRestaurant'), color: 'blue', desc: t('auth.restaurantDesc') },
    { role: 'courier', icon: Truck, label: t('auth.asCourier'), color: 'orange', desc: t('auth.courierDesc') },
  ];

  const cities = [
    'Yaoundé', 'Douala', 'Bafoussam', 'Bamenda', 'Garoua', 'Maroua', 'Bertoua', 'Kribi'
  ];

  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);
    setError('');
    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (authError) {
        setError(authError.message);
        setGoogleLoading(false);
      }
    } catch {
      setError('Erreur de connexion Google. Veuillez réessayer.');
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const supabase = createClient();

      // Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            phone: formData.phone,
            role: selectedRole,
            city: formData.city,
            restaurant_name: formData.restaurantName || null,
            vehicle_type: selectedRole === 'courier' ? formData.vehicleType : null,
          },
        },
      });

      if (authError) {
        if (authError.message.includes('already registered')) {
          setError('Cet email est déjà utilisé. Connectez-vous ou utilisez un autre email.');
        } else {
          setError(authError.message);
        }
        setLoading(false);
        return;
      }

      if (authData.user) {
        // Create profile in mv_profiles
        const profileRole = selectedRole === 'restaurant' ? 'restaurant_owner' : selectedRole;
        await supabase
          .from('mv_profiles')
          .upsert({
            user_id: authData.user.id,
            full_name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            role: profileRole,
            city: formData.city,
          });

        // Redirect based on role
        if (selectedRole === 'restaurant') {
          window.location.href = `/${locale}/dashboard/restaurant`;
        } else if (selectedRole === 'courier') {
          window.location.href = `/${locale}/dashboard/courier`;
        } else {
          window.location.href = `/${locale}/dashboard/customer`;
        }
      }
    } catch {
      setError('Erreur lors de l\'inscription. Veuillez réessayer.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar locale={locale} />
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">D</span>
            </div>
            <h1 className="text-2xl font-bold">{t('auth.registerTitle')}</h1>
            <p className="text-sm text-gray-500 mt-1">{t('auth.registerSubtitle')}</p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
            {/* Google Sign-Up Button */}
            <button
              onClick={handleGoogleSignUp}
              disabled={googleLoading || loading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors disabled:opacity-50"
            >
              {googleLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              )}
              S&apos;inscrire avec Google
            </button>

            {/* Separator */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
              <span className="text-xs text-gray-400 uppercase">ou</span>
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            {/* Role selection */}
            <p className="text-sm font-medium mb-3">{t('auth.selectRole')}</p>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {roles.map(({ role, icon: Icon, label }) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    selectedRole === role
                      ? role === 'customer' ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-600'
                        : role === 'restaurant' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                        : 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-600'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 text-gray-500'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs font-medium">{label}</span>
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">{t('auth.fullName')}</label>
                <div className="relative">
                  <User className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full ps-10 pe-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t('auth.email')}</label>
                <div className="relative">
                  <Mail className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full ps-10 pe-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t('auth.phone')}</label>
                <div className="relative">
                  <Phone className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+237 6XX XXX XXX"
                    className="w-full ps-10 pe-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* City selector */}
              <div>
                <label className="block text-sm font-medium mb-2">{t('home.selectCity')}</label>
                <div className="relative">
                  <MapPin className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    required
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    className="w-full ps-10 pe-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
                  >
                    <option value="">--</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Restaurant-specific fields */}
              {selectedRole === 'restaurant' && (
                <div>
                  <label className="block text-sm font-medium mb-2">{t('auth.restaurantName')}</label>
                  <div className="relative">
                    <Building2 className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={formData.restaurantName}
                      onChange={e => setFormData({ ...formData, restaurantName: e.target.value })}
                      className="w-full ps-10 pe-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* Courier-specific fields */}
              {selectedRole === 'courier' && (
                <div>
                  <label className="block text-sm font-medium mb-2">{t('auth.vehicleType')}</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['moto', 'velo', 'voiture'].map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, vehicleType: type })}
                        className={`py-2 px-3 rounded-xl text-sm font-medium border-2 transition-all ${
                          formData.vehicleType === type
                            ? 'border-orange-500 bg-orange-50 text-orange-600'
                            : 'border-gray-200 text-gray-500 hover:border-gray-300'
                        }`}
                      >
                        {type === 'moto' ? '🏍️ ' + t('auth.vehicleMotorcycle') : type === 'velo' ? '🚲 ' + t('auth.vehicleBicycle') : '🚗 ' + t('auth.vehicleCar')}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">{t('auth.password')}</label>
                <div className="relative">
                  <Lock className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    className="w-full ps-10 pe-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <label className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  required
                  checked={formData.termsAccepted}
                  onChange={e => setFormData({ ...formData, termsAccepted: e.target.checked })}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500 mt-0.5"
                />
                <span className="text-gray-600 dark:text-gray-400">
                  {t('auth.termsAgree')}{' '}
                  <Link href="/legal/terms" className="text-green-600 hover:underline">CGU</Link>
                </span>
              </label>

              <button
                type="submit"
                disabled={loading || googleLoading}
                className={`w-full py-3 font-semibold rounded-xl transition-colors text-white disabled:opacity-50 flex items-center justify-center gap-2 ${
                  selectedRole === 'customer' ? 'bg-green-600 hover:bg-green-700'
                    : selectedRole === 'restaurant' ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-orange-600 hover:bg-orange-700'
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Inscription...
                  </>
                ) : (
                  t('auth.registerButton')
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                {t('auth.hasAccount')}{' '}
                <Link href="/auth/login" className="text-green-600 font-medium hover:underline">
                  {t('auth.loginButton')}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
