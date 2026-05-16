'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import { useSessionUser } from '@/hooks/useSessionUser';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'react-toastify';
import { updateBankInfo, updateGlobalSettings } from '@/actions/settings';
import { setGlobalCommissionRate } from '@/actions/commission';
import { updateUserProfile } from '@/actions/profile';
import { 
  User, 
  Lock, 
  Camera,  
  ShieldCheck, 
  Save, 
  Loader2,
  AlertTriangle,
  Mail
} from 'lucide-react';

const SettingsForm = ({ initialGlobalSettings, globalCommission }: { initialGlobalSettings: any, globalCommission: number }) => {
  const { userInfo, resetPassword } = useAuth();
  const { user: currentUser } = useSessionUser();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

  // Form States
  const [name, setName] = useState(`${currentUser?.firstName ?? ''} ${currentUser?.lastName ?? ''}`);
  const [email, setEmail] = useState(currentUser?.email || '');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(currentUser?.photoURL || null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (currentUser) {
      setName(`${currentUser.firstName} ${currentUser.lastName}`);
      setEmail(currentUser.email || '');
      setAvatarPreview(currentUser.photoURL || null);
    }
  }, [currentUser]);

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

  const handleProfileUpdate = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!currentUser?.id) return;
    
    setIsSaving(true);
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }
    formData.append('existingPhotoURL', currentUser.photoURL || '');

    const res = await updateUserProfile(currentUser.id, formData);
    setIsSaving(false);
    
    if (res.success) {
      toast.success('Profile updated successfully');
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      toast.error(res.message || 'Failed to update profile');
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBankUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    
    setIsSaving(true);
    const res = await updateBankInfo(currentUser.id!, bankData as any);
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
                {/* Avatar Section */}
                <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-100">
                  <div className="relative group">
                    <div className="h-24 w-24 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border-2 border-white shadow-md">
                      {avatarPreview ? (
                        <Image src={avatarPreview} alt="Avatar Preview" width={96} height={96} className="object-cover h-full w-full" />
                      ) : (
                        <User className="h-10 w-10 text-slate-400" />
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-0 right-0 p-1.5 bg-[#cfb53b] text-white rounded-full hover:bg-[#b59d32] transition-colors shadow-sm"
                      title="Change picture"
                    >
                      <Camera className="h-4 w-4" />
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleAvatarChange} 
                      accept="image/*" 
                      className="hidden" 
                    />
                  </div>
                  <div className="text-center sm:text-left space-y-1">
                    <h3 className="font-medium text-slate-800">Profile Picture</h3>
                    <p className="text-sm text-slate-500">JPG, GIF or PNG. Max size of 5MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                    />
                    <p className="text-[10px] text-gray-400">Updating your email might require re-verification.</p>
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
