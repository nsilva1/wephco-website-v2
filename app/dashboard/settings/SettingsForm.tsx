'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'react-toastify';
import { updateProfile, updateBankInfo, updateGlobalSettings } from '@/actions/settings';
import { setGlobalCommissionRate } from '@/actions/commission';
import { 
  User, 
  Lock, 
  Bell, 
  ShieldCheck, 
  CreditCard, 
  Save, 
  Loader2,
  AlertTriangle,
  Mail
} from 'lucide-react';

const SettingsForm = ({ initialGlobalSettings, globalCommission }: { initialGlobalSettings: any, globalCommission: number }) => {
  const { userInfo, currentUser, resetPassword } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

  // Form States
  const [profileData, setProfileData] = useState({
    name: userInfo?.name || '',
    phone: (userInfo as any)?.phone || '',
  });

  const [bankData, setBankData] = useState({
    bankName: userInfo?.bankInfo?.bankName || '',
    bankAccountNumber: userInfo?.bankInfo?.bankAccountNumber || '',
    bankAccountName: userInfo?.bankInfo?.bankAccountName || '',
    nin: userInfo?.bankInfo?.nin || '',
    bvn: userInfo?.bankInfo?.bvn || '',
  });

  const [adminSettings, setAdminSettings] = useState({
    maintenanceMode: initialGlobalSettings?.maintenanceMode || false,
    allowRegistration: initialGlobalSettings?.allowRegistration || true,
    globalCommission: globalCommission || 5,
    contactEmail: initialGlobalSettings?.contactEmail || 'support@wephco.com',
  });

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    
    setIsSaving(true);
    const res = await updateProfile(currentUser.uid, { name: profileData.name });
    setIsSaving(false);
    
    if (res.success) {
      toast.success('Profile updated successfully');
    } else {
      toast.error(res.error || 'Failed to update profile');
    }
  };

  const handleBankUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    
    setIsSaving(true);
    const res = await updateBankInfo(currentUser.uid, bankData as any);
    setIsSaving(false);
    
    if (res.success) {
      toast.success('Bank information updated successfully');
    } else {
      toast.error(res.error || 'Failed to update bank info');
    }
  };

  const handleAdminUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const settingsRes = await updateGlobalSettings({
      maintenanceMode: adminSettings.maintenanceMode,
      allowRegistration: adminSettings.allowRegistration,
      contactEmail: adminSettings.contactEmail,
    });
    
    const commRes = await setGlobalCommissionRate(adminSettings.globalCommission);
    
    setIsSaving(false);
    
    if (settingsRes.success && commRes.success) {
      toast.success('Admin settings updated successfully');
    } else {
      toast.error('Failed to update some settings');
    }
  };

  const handlePasswordReset = async () => {
    if (!currentUser?.email) return;
    try {
      await resetPassword(currentUser.email);
      toast.info('Password reset email sent to ' + currentUser.email);
    } catch (error) {
      toast.error('Failed to send reset email');
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'bank', label: 'Bank Info', icon: CreditCard },
    { id: 'security', label: 'Security', icon: Lock },
    ...(userInfo?.role === 'ADMIN' || userInfo?.role === 'SUPERADMIN' ? [
      { id: 'admin', label: 'Admin Settings', icon: ShieldCheck }
    ] : []),
  ];

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar Tabs */}
      <div className="w-full md:w-64 space-y-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === tab.id 
                ? 'bg-[#fef9e8] text-[#cfb53b] shadow-sm border border-[#cfb53b]/20' 
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1">
        {activeTab === 'profile' && (
          <Card className="border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Personal Information</CardTitle>
              <CardDescription>Update your profile details and how others see you.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={profileData.name} 
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      placeholder="Enter your full name" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      value={currentUser?.email || ''} 
                      disabled 
                      className="bg-gray-50 cursor-not-allowed"
                    />
                    <p className="text-[10px] text-gray-400">Email cannot be changed manually for security reasons.</p>
                  </div>
                </div>
                <Button type="submit" disabled={isSaving} className="bg-[#cfb53b] hover:bg-[#b59d32] text-white">
                  {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {activeTab === 'bank' && (
          <Card className="border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Bank Account Information</CardTitle>
              <CardDescription>Enter your payment details for commission withdrawals.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBankUpdate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input 
                      id="bankName" 
                      value={bankData.bankName} 
                      onChange={(e) => setBankData({...bankData, bankName: e.target.value})}
                      placeholder="e.g. Zenith Bank" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accNumber">Account Number</Label>
                    <Input 
                      id="accNumber" 
                      value={bankData.bankAccountNumber} 
                      onChange={(e) => setBankData({...bankData, bankAccountNumber: e.target.value})}
                      placeholder="10-digit account number" 
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="accName">Account Name</Label>
                    <Input 
                      id="accName" 
                      value={bankData.bankAccountName} 
                      onChange={(e) => setBankData({...bankData, bankAccountName: e.target.value})}
                      placeholder="Full name as it appears on bank account" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bvn">BVN (Optional)</Label>
                    <Input 
                      id="bvn" 
                      value={bankData.bvn} 
                      onChange={(e) => setBankData({...bankData, bvn: e.target.value})}
                      placeholder="Bank Verification Number" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nin">NIN (Optional)</Label>
                    <Input 
                      id="nin" 
                      value={bankData.nin} 
                      onChange={(e) => setBankData({...bankData, nin: e.target.value})}
                      placeholder="National Identity Number" 
                    />
                  </div>
                </div>
                <Button type="submit" disabled={isSaving} className="bg-[#cfb53b] hover:bg-[#b59d32] text-white">
                  {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  Save Bank Details
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <Card className="border-gray-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Password & Security</CardTitle>
                <CardDescription>Manage your account security and password.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">Change Password</h4>
                    <p className="text-xs text-gray-500">Receive an email to reset your password securely.</p>
                  </div>
                  <Button variant="outline" onClick={handlePasswordReset}>
                    <Mail className="mr-2 h-4 w-4" />
                    Reset via Email
                  </Button>
                </div>

                <div className="p-4 border border-blue-100 rounded-xl bg-blue-50/30 flex gap-3">
                  <ShieldCheck className="text-blue-500 h-5 w-5 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-blue-900">Account Verified</h4>
                    <p className="text-xs text-blue-700">Your account is secured with Firebase authentication.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'admin' && (userInfo?.role === 'ADMIN' || userInfo?.role === 'SUPERADMIN') && (
          <Card className="border-red-100 shadow-sm">
            <CardHeader className="bg-red-50/30">
              <CardTitle className="text-xl flex items-center gap-2">
                <AlertTriangle className="text-red-500 h-5 w-5" />
                Administrative Controls
              </CardTitle>
              <CardDescription>Global system settings. Changes here affect all users.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleAdminUpdate} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-semibold">Maintenance Mode</Label>
                      <p className="text-xs text-gray-500">Put the site in maintenance mode. Only admins can access.</p>
                    </div>
                    <Switch 
                      checked={adminSettings.maintenanceMode} 
                      onCheckedChange={(val) => setAdminSettings({...adminSettings, maintenanceMode: val})} 
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-semibold">Allow New Registrations</Label>
                      <p className="text-xs text-gray-500">Enable or disable new user signups on the platform.</p>
                    </div>
                    <Switch 
                      checked={adminSettings.allowRegistration} 
                      onCheckedChange={(val) => setAdminSettings({...adminSettings, allowRegistration: val})} 
                    />
                  </div>

                  <div className="space-y-2 p-4 border border-gray-100 rounded-xl">
                    <Label className="text-sm font-semibold">Global Commission Rate (%)</Label>
                    <div className="flex gap-4">
                      <Input 
                        type="number" 
                        value={adminSettings.globalCommission} 
                        onChange={(e) => setAdminSettings({...adminSettings, globalCommission: parseFloat(e.target.value)})}
                        className="max-w-[200px]"
                      />
                      <p className="text-xs text-gray-500 flex items-center italic">Default rate for new agents.</p>
                    </div>
                  </div>

                  <div className="space-y-2 p-4 border border-gray-100 rounded-xl">
                    <Label className="text-sm font-semibold">Support Contact Email</Label>
                    <Input 
                      type="email" 
                      value={adminSettings.contactEmail} 
                      onChange={(e) => setAdminSettings({...adminSettings, contactEmail: e.target.value})}
                    />
                  </div>
                </div>
                <Button type="submit" disabled={isSaving} variant="destructive">
                  {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  Update Global Settings
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SettingsForm;
