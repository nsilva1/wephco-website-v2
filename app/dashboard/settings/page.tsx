import React from 'react';
import { getGlobalSettings } from '@/actions/settings';
import { getGlobalCommissionRate } from '@/actions/commission';
import SettingsForm from './SettingsForm';
import { Settings } from 'lucide-react';

export const revalidate = 0;

export default async function SettingsPage() {
  const [globalSettings, globalCommission] = await Promise.all([
    getGlobalSettings(),
    getGlobalCommissionRate(),
  ]);

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#cfb53b]/10 rounded-lg">
            <Settings className="h-6 w-6 text-[#cfb53b]" />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-800">Account Settings</h2>
            <p className="text-muted-foreground mt-1">Manage your profile, payment methods, and account security.</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <SettingsForm 
          initialGlobalSettings={globalSettings} 
          globalCommission={globalCommission} 
        />
      </div>
    </div>
  );
}
