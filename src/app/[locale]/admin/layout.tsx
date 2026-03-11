'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { LogOut, Menu, X } from 'lucide-react';
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
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigationItems = [
    {
      label: t('sidebar.dashboard'),
      href: '/admin',
      icon: LayoutDashboard,
    },
    {
      label: t('sidebar.users'),
      href: '/admin/users',
      icon: Users,
    },
    {
      label: t('sidebar.admins'),
      href: '/admin/admins',
      icon: Shield,
    },
    {
      label: t('sidebar.plans'),
      href: '/admin/plans',
      icon: CreditCard,
    },
    {
      label: t('sidebar.finance'),
      href: '/admin/finance',
      icon: DollarSign,
    },
    {
      label: t('sidebar.settings'),
      href: '/admin/settings',
      icon: Settings,
    },
    {
      label: t('sidebar.auditLog'),
      href: '/admin/audit',
      icon: FileText,
    },
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
          <Link
            href="/admin"
            className="flex items-center gap-2 font-bold text-xl"
          >
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
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-800 dark:hover:bg-green-900 transition-colors w-full text-left"
            title="Logout"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
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
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Admin User
            </span>
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center font-bold text-white">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
