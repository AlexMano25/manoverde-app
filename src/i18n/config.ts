export const locales = ['fr', 'en', 'es', 'ar', 'zh', 'de', 'it', 'pt'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'fr';

export const localeNames: Record<Locale, string> = {
  fr: 'Français',
  en: 'English',
  es: 'Español',
  ar: 'العربية',
  zh: '中文',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'Português',
};

export const rtlLocales: Locale[] = ['ar'];

export function isRtl(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}
