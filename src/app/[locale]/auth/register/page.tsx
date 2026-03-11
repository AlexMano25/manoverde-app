'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Navbar from '@/components/Navbar';
import { Link } from '@/i18n/routing';
import { Mail, Lock, User, Phone, UtensilsCrossed, Truck, Users, Building2, MapPin } from 'lucide-react';

export default function RegisterPage({ params }: { params: Promise<{ locale: string }> }) {
  const [locale, setLocale] = useState('fr');

  // Resolve params
  params.then(p => setLocale(p.locale));

  return <RegisterContent locale={locale} />;
}

function RegisterContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const [selectedRole, setSelectedRole] = useState('customer');
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
    { role: 'customer', icon: Users, label: t('auth.asCustomer'), color: 'green', desc: 'Commander des plats premium' },
    { role: 'restaurant', icon: UtensilsCrossed, label: t('auth.asRestaurant'), color: 'blue', desc: 'Vendre sur Déliko' },
    { role: 'courier', icon: Truck, label: t('auth.asCourier'), color: 'orange', desc: 'Livrer et gagner' },
  ];

  const cities = [
    'Yaoundé', 'Douala', 'Bafoussam', 'Bamenda', 'Garoua', 'Maroua', 'Bertoua', 'Kribi'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to Supabase auth + mv_register_user RPC
    console.log('Register:', { ...formData, role: selectedRole });
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
            <p className="text-sm text-gray-500 mt-1">Rejoignez Déliko aujourd&apos;hui</p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
            {/* Role selection */}
            <p className="text-sm font-medium mb-3">{t('auth.selectRole')}</p>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {roles.map(({ role, icon: Icon, label, color }) => (
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
                  <label className="block text-sm font-medium mb-2">Nom du restaurant</label>
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
                  <label className="block text-sm font-medium mb-2">Type de véhicule</label>
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
                        {type === 'moto' ? '🏍️ Moto' : type === 'velo' ? '🚲 Vélo' : '🚗 Voiture'}
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
                className={`w-full py-3 font-semibold rounded-xl transition-colors text-white ${
                  selectedRole === 'customer' ? 'bg-green-600 hover:bg-green-700'
                    : selectedRole === 'restaurant' ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-orange-600 hover:bg-orange-700'
                }`}
              >
                {t('auth.registerButton')}
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
