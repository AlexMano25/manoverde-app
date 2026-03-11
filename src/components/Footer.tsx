'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="font-bold text-xl text-white">Déliko</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              {t('aboutDesc')}
            </p>
            {/* Social Media */}
            <div className="flex items-center gap-3">
              <a href="https://facebook.com/deliko" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://instagram.com/deliko" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://twitter.com/deliko" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://youtube.com/@deliko" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm hover:text-green-400 transition-colors">{t('about')}</Link></li>
              <li><Link href="/faq" className="text-sm hover:text-green-400 transition-colors">{t('faq')}</Link></li>
              <li><Link href="/auth/register" className="text-sm hover:text-green-400 transition-colors">{t('partnerWith')}</Link></li>
              <li><Link href="/restaurants" className="text-sm hover:text-green-400 transition-colors">{t('careers')}</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('legal')}</h3>
            <ul className="space-y-2">
              <li><Link href="/legal/terms" className="text-sm hover:text-green-400 transition-colors">{t('terms')}</Link></li>
              <li><Link href="/legal/privacy" className="text-sm hover:text-green-400 transition-colors">{t('privacy')}</Link></li>
              <li><Link href="/legal/cookies" className="text-sm hover:text-green-400 transition-colors">{t('cookies')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-green-400 shrink-0" />
                <span>Yaoundé, Cameroun</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-green-400 shrink-0" />
                <a href="tel:+237651982878" className="hover:text-green-400 transition-colors">+237 651 982 878</a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-green-400 shrink-0" />
                <a href="mailto:infos@manovende.com" className="hover:text-green-400 transition-colors">infos@manovende.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">{t('copyright')}</p>
          <p className="text-sm text-gray-500">{t('madeWith')} 🇨🇲</p>
        </div>
      </div>
    </footer>
  );
}
