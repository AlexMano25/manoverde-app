'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

interface AdminAccount {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin';
  status: 'active' | 'inactive';
  lastLogin: string;
  created: string;
}

export default function AdminsManagement() {
  const t = useTranslations('admin');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminAccount | null>(null);

  // Demo data
  const admins: AdminAccount[] = [
    {
      id: '1',
      name: 'Super Admin User',
      email: 'superadmin@deloiko.com',
      role: 'super_admin',
      status: 'active',
      lastLogin: '2026-03-11 14:30',
      created: '2025-01-01',
    },
    {
      id: '2',
      name: 'John Admin',
      email: 'john@deloiko.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2026-03-10 09:15',
      created: '2025-06-15',
    },
    {
      id: '3',
      name: 'Sarah Manager',
      email: 'sarah@deloiko.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2026-03-11 11:00',
      created: '2025-08-20',
    },
  ];

  const getRoleBadgeColor = (role: string) => {
    return role === 'super_admin'
      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
  };

  const canDelete = (admin: AdminAccount) => {
    return admin.role !== 'super_admin';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('admins.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {t('admins.subtitle')}
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          {t('admins.createAdmin')}
        </button>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  {t('admins.name')}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  {t('admins.email')}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  {t('admins.role')}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  {t('common.status')}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  {t('admins.lastLogin')}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  {t('admins.created')}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  {t('common.actions')}
                </th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr
                  key={admin.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">
                    {admin.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {admin.email}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(
                        admin.role
                      )}`}
                    >
                      {admin.role === 'super_admin'
                        ? t('admins.superAdmin')
                        : t('admins.admin')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {admin.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {admin.lastLogin}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {new Date(admin.created).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                        <Eye
                          size={18}
                          className="text-gray-600 dark:text-gray-400"
                        />
                      </button>
                      <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                        <Edit
                          size={18}
                          className="text-blue-600 dark:text-blue-400"
                        />
                      </button>
                      {canDelete(admin) ? (
                        <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                          <Trash2
                            size={18}
                            className="text-red-600 dark:text-red-400"
                          />
                        </button>
                      ) : (
                        <button
                          disabled
                          className="p-1 opacity-50 cursor-not-allowed"
                          title={t('admins.cannotDelete')}
                        >
                          <Trash2
                            size={18}
                            className="text-gray-400 dark:text-gray-600"
                          />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('admins.createAdmin')}
            </h2>

            <input
              type="text"
              placeholder={t('admins.name')}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="email"
              placeholder={t('admins.email')}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="">Select Role</option>
              <option value="admin">{t('admins.admin')}</option>
              <option value="super_admin">{t('admins.superAdmin')}</option>
            </select>

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                {t('common.save')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
