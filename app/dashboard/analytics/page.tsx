import React from 'react';
import { getAnalyticsData } from '@/actions/analytics';
import { LeadsStatusChart } from './LeadsStatusChart';
import { TopAgentsChart } from './TopAgentsChart';
import { WithdrawalVolumeChart } from './WithdrawalVolumeChart';
import { Target, TrendingUp, DollarSign, BarChart3 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export const revalidate = 0;

export default async function AnalyticsPage() {
  const data = await getAnalyticsData();

  const summaryCards = [
    {
      title: 'Total Leads',
      value: data.summary.totalLeads.toLocaleString(),
      icon: Target,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      accent: 'border-l-blue-500',
    },
    {
      title: 'Conversion Rate',
      value: `${data.summary.conversionRate}%`,
      icon: TrendingUp,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      accent: 'border-l-green-500',
    },
    {
      title: 'Total Withdrawals',
      value: formatCurrency(data.summary.totalWithdrawals, 'NGN'),
      icon: DollarSign,
      bgColor: 'bg-[#cfb53b]/10',
      iconColor: 'text-[#cfb53b]',
      accent: 'border-l-[#cfb53b]',
    },
    {
      title: 'Avg. Deal Size',
      value: formatCurrency(data.summary.avgDealSize, 'NGN'),
      icon: BarChart3,
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      accent: 'border-l-purple-500',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h3 className="text-3xl font-bold text-slate-800">Analytics</h3>
        <p className="text-gray-500">
          Comprehensive insights into your leads pipeline, agent performance, and financial activity.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {summaryCards.map((card) => (
          <div
            key={card.title}
            className={`bg-white rounded-xl shadow-sm border border-gray-100 border-l-4 ${card.accent} p-5 flex items-center gap-4 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5`}
          >
            <div className={`${card.bgColor} p-3 rounded-lg ${card.iconColor}`}>
              <card.icon size={22} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{card.title}</p>
              <h4 className="text-xl font-bold text-slate-800 mt-0.5">{card.value}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 — Leads by Status (Full Width) */}
      <LeadsStatusChart data={data.leadsByStatus} />

      {/* Charts Row 2 — Top Agents & Withdrawal Volume */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopAgentsChart data={data.topAgents} />
        <WithdrawalVolumeChart data={data.withdrawalVolume} />
      </div>
    </div>
  );
}
