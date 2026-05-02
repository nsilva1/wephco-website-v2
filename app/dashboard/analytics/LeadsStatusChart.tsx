'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { LeadsByStatusOverTime } from '@/actions/analytics';

const STATUS_COLORS: Record<string, string> = {
  new: '#3b82f6',
  contacted: '#f59e0b',
  qualified: '#8b5cf6',
  negotiation: '#f97316',
  won: '#22c55e',
  lost: '#64748b',
};

interface Props {
  data: LeadsByStatusOverTime[];
}

export function LeadsStatusChart({ data }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="mb-6">
        <h4 className="text-lg font-bold text-slate-800">Leads by Status Over Time</h4>
        <p className="text-sm text-gray-500 mt-1">Monthly breakdown of lead pipeline progression</p>
      </div>

      {data.length === 0 ? (
        <div className="h-[350px] flex items-center justify-center text-gray-400">
          <p>No lead data available yet</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              {Object.entries(STATUS_COLORS).map(([status, color]) => (
                <linearGradient key={status} id={`gradient-${status}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color} stopOpacity={0.02} />
                </linearGradient>
              ))}
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
              allowDecimals={false}
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
              itemStyle={{ fontSize: 13, padding: '2px 0' }}
            />
            <Legend
              wrapperStyle={{ paddingTop: 20, fontSize: 13 }}
              formatter={(value: string) => (
                <span className="capitalize text-slate-600">{value}</span>
              )}
            />
            {Object.entries(STATUS_COLORS).map(([status, color]) => (
              <Area
                key={status}
                type="monotone"
                dataKey={status}
                stroke={color}
                strokeWidth={2}
                fill={`url(#gradient-${status})`}
                name={status}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
