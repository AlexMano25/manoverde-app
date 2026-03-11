'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { LogOut, Menu, X, Loader2, ShieldAlert } from 'lucide-react';
import {
  LayoutDashboard,
  Users,
  Shield,
  CreditCard,
  DollarSign,
  Settings,
  FileText,
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations('admin');
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [adminInfo, setAdminInfo] = useState<{ email: string; role: string; display_name: string } | null>(null);

  useEffect(() => {
    checkAdminAuth();
  }, []);

  const checkAdminAuth = async () => {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push('/auth/login');
        return;
      }

      // Check if user is admin
      const { data: admin } = await supabase
        .from('mv_admin_roles')
        .select('email, role, display_name')
        .eq('email', user.email)
        .eq('is_active', true)
        .maybeSingle();

      if (!admin) {
        // Not an admin → redirect to home
        router.push('/');
        return;
      }

      setAdminInfo(admin);
      setIsAuthenticated(true);
    } catch {
      router.push('/auth/login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-500">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('common.accessDenied')}</h2>
          <p className="text-gray-500 mb-4">{t('common.adminOnly')}</p>
          <Link href="/auth/login" className="text-green-600 hover:underline font-medium">
            {t('common.login')}
          </Link>
        </div>
      </div>
    );
  }

  const navigationItems = [
    { label: t('sidebar.dashboard'), href: '/admin', icon: LayoutDashboard },
    { label: t('sidebar.users'), href: '/admin/users', icon: Users },
    { label: t('sidebar.admins'), href: '/admin/admins', icon: Shield },
    { label: t('sidebar.plans'), href: '/admin/plans', icon: CreditCard },
    { label: t('sidebar.finance'), href: '/admin/finance', icon: DollarSign },
    { label: t('sidebar.settings'), href: '/admin/settings', icon: Settings },
    { label: t('sidebar.auditLog'), href: '/admin/audit', icon: FileText },
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-green-900 dark:bg-green-950 text-white transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-green-800">
          <Link href="/admin" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
              D
            </div>
            {sidebarOpen && <span>Déliko Admin</span>}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-800 dark:hover:bg-green-900 transition-colors"
                title={item.label}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-green-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-800 dark:hover:bg-green-900 transition-colors w-full text-left"
            title={t('common.logout')}
          >
            <LogOut size={20} />
            {sidebarOpen && <span>{t('common.logout')}</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex items-center gap-4">
            <div className="text-end">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {adminInfo?.display_name || adminInfo?.email}
              </p>
              <p className="text-xs text-gray-500">
                {adminInfo?.role === 'super_admin' ? '🔴 Super Admin' : '🔵 Admin'}
              </p>
            </div>
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center font-bold text-white">
              {(adminInfo?.display_name || adminInfo?.email || 'A').charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
