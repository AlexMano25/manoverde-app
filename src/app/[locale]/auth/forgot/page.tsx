'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Navbar from '@/components/Navbar';
import { createClient } from '@/lib/supabase/client';
import { Mail, ArrowLeft, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const t = useTranslations();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('idle');

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        setStatus('error');
      } else {
        setStatus('success');
      }
    } catch {
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar locale="fr" />
      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">D</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('auth.forgotPassword')}</h1>
            <p className="text-sm text-gray-500 mt-2">{t('auth.forgotDesc')}</p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
            {status === 'success' ? (
              <div className="text-center py-4">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t('auth.resetSent')}</h2>
                <p className="text-sm text-gray-500 mb-6">{t('auth.resetSentDesc')}</p>
                <Link
                  href="/auth/login"
                  className="inline-flex items-center gap-2 text-green-600 font-medium hover:underline"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t('auth.backToLogin')}
                </Link>
              </div>
            ) : (
              <>
                {status === 'error' && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg mb-5">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                    <p className="text-sm text-red-600 dark:text-red-400">{t('auth.resetError')}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      {t('auth.email')}
                    </label>
                    <div className="relative">
                      <Mail className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full ps-10 pe-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      t('auth.sendResetLink')
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link
                    href="/auth/login"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green-600"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    {t('auth.backToLogin')}
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
