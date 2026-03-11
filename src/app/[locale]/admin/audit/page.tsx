'use client';

import { useTranslations } from 'next-intl';
import { Download, Filter } from 'lucide-react';

interface AuditLog {
  id: string;
  admin: string;
  action: string;
  resource: string;
  details: string;
  timestamp: string;
}

export default function AuditLog() {
  const t = useTranslations('admin');

  const auditLogs: AuditLog[] = [
    {
      id: '1',
      admin: 'Super Admin User',
      action: 'Created',
      resource: 'User',
      details: 'New user ahmed@example.com registered',
      timestamp: '2026-03-11 14:30:45',
    },
    {
      id: '2',
      admin: 'John Admin',
      action: 'Updated',
      resource: 'Plan',
      details: 'Updated Starter Restaurant plan commission rate',
      timestamp: '2026-03-11 13:15:22',
    },
    {
      id: '3',
      admin: 'Sarah Manager',
      action: 'Deleted',
      resource: 'Admin',
      details: 'Removed admin account test@deloiko.com',
      timestamp: '2026-03-11 11:45:10',
    },
    {
      id: '4',
      admin: 'Super Admin User',
      action: 'Updated',
      resource: 'Settings',
      details: 'Changed platform commission rate to 15%',
      timestamp: '2026-03-10 16:20:33',
    },
    {
      id: '5',
      admin: 'John Admin',
      action: 'Suspended',
      resource: 'User',
      details: 'Suspended user linda@example.com',
      timestamp: '2026-03-10 10:05:17',
    },
  ];

  const getActionColor = (action: string) => {
    const colors = {
      Created: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      Updated:
        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      Deleted: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      Suspended:
        'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    };
    return colors[action as keyof typeof colors] || colors.Updated;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('sidebar.auditLog')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track all administrative actions and changes
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
          <Download size={20} />
          Export
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search by admin name..."
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500">
            <option value="">Filter by action</option>
            <option value="Created">Created</option>
            <option value="Updated">Updated</option>
            <option value="Deleted">Deleted</option>
            <option value="Suspended">Suspended</option>
          </select>
          <input
            type="date"
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Admin
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Resource
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log) => (
                <tr
                  key={log.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">
                    {log.admin}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getActionColor(
                        log.action
                      )}`}
                    >
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {log.resource}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {log.details}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    {log.timestamp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
