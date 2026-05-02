'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { TopAgent } from '@/actions/analytics';

const GOLD_PALETTE = [
  '#cfb53b',
  '#d4bd4f',
  '#d9c563',
  '#dece77',
  '#e3d68b',
  '#e8de9f',
  '#ede6b3',
  '#f0ecc0',
  '#f3f0cc',
  '#f6f4d8',
];

interface Props {
  data: TopAgent[];
}

export function TopAgentsChart({ data }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="mb-6">
        <h4 className="text-lg font-bold text-slate-800">Top Performing Agents</h4>
        <p className="text-sm text-gray-500 mt-1">Ranked by total deals closed</p>
      </div>

      {data.length === 0 ? (
        <div className="h-[350px] flex items-center justify-center text-gray-400">
          <p>No agent data available yet</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
            <XAxis
              type="number"
              tick={{ fontSize: 12, fill: '#94a3b8' }}
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={false}
              allowDecimals={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 12, fill: '#475569' }}
              axisLine={false}
              tickLine={false}
              width={120}
            />
            <Tooltip
              contentStyle={{
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                padding: '12px 16px',
              }}
              labelStyle={{ fontWeight: 700, color: '#1e293b', marginBottom: 4 }}
              formatter={(value: any, name: any) => {
                const label = name === 'dealsClosed' ? 'Deals Closed' : 'Active Leads';
                return [value, label];
              }}
            />
            <Bar
              dataKey="dealsClosed"
              radius={[0, 8, 8, 0]}
              barSize={24}
              name="dealsClosed"
            >
              {data.map((_, index) => (
                <Cell key={index} fill={GOLD_PALETTE[index % GOLD_PALETTE.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}

      {/* Agent ranking table below chart */}
      {data.length > 0 && (
        <div className="mt-6 border-t border-gray-100 pt-4">
          <div className="grid grid-cols-3 text-xs font-semibold text-gray-400 uppercase tracking-wider pb-2 px-2">
            <span>Agent</span>
            <span className="text-center">Deals Closed</span>
            <span className="text-center">Active Leads</span>
          </div>
          {data.slice(0, 5).map((agent, idx) => (
            <div
              key={idx}
              className="grid grid-cols-3 text-sm py-2.5 px-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className={`flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold ${
                  idx === 0 ? 'bg-[#cfb53b]/20 text-[#cfb53b]' :
                  idx === 1 ? 'bg-slate-200 text-slate-600' :
                  idx === 2 ? 'bg-orange-100 text-orange-600' :
                  'bg-gray-100 text-gray-500'
                }`}>
                  {idx + 1}
                </span>
                <span className="font-medium text-slate-700 truncate">{agent.name}</span>
              </div>
              <span className="text-center font-bold text-slate-800">{agent.dealsClosed}</span>
              <span className="text-center text-gray-500">{agent.activeLeads}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
