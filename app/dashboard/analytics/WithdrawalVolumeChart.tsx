'use client';

import React from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { WithdrawalVolume } from '@/actions/analytics';

interface Props {
  data: WithdrawalVolume[];
}

function formatAmount(value: number): string {
  if (value >= 1_000_000) return `₦${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `₦${(value / 1_000).toFixed(0)}K`;
  return `₦${value}`;
}

export function WithdrawalVolumeChart({ data }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="mb-6">
        <h4 className="text-lg font-bold text-slate-800">Withdrawal Volume Over Time</h4>
        <p className="text-sm text-gray-500 mt-1">Monthly breakdown of withdrawal amounts by status</p>
      </div>

      {data.length === 0 ? (
        <div className="h-[350px] flex items-center justify-center text-gray-400">
          <p>No withdrawal data available yet</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gradient-completed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.4} />
              </linearGradient>
              <linearGradient id="gradient-pending" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.4} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: '#94a3b8' }}
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={formatAmount}
            />
            <Tooltip
              contentStyle={{
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                padding: '12px 16px',
              }}
              labelStyle={{ fontWeight: 700, color: '#1e293b', marginBottom: 8 }}
              formatter={(value: any, name: any) => {
                const label = name === 'completed' ? 'Completed' :
                  name === 'pending' ? 'Pending' : 'Failed';
                return [`₦${Number(value).toLocaleString()}`, label];
              }}
            />
            <Legend
              wrapperStyle={{ paddingTop: 20, fontSize: 13 }}
              formatter={(value: string) => {
                const labels: Record<string, string> = {
                  completed: 'Completed',
                  pending: 'Pending',
                  failed: 'Failed',
                };
                return <span className="capitalize text-slate-600">{labels[value] || value}</span>;
              }}
            />
            <Bar
              dataKey="completed"
              fill="url(#gradient-completed)"
              radius={[6, 6, 0, 0]}
              barSize={20}
              name="completed"
            />
            <Bar
              dataKey="pending"
              fill="url(#gradient-pending)"
              radius={[6, 6, 0, 0]}
              barSize={20}
              name="pending"
            />
            <Line
              type="monotone"
              dataKey="failed"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ fill: '#ef4444', r: 4, strokeWidth: 0 }}
              name="failed"
            />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
