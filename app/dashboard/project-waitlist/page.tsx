'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Save,
  Plus,
  Trash2,
  Upload,
  RefreshCw,
  Search,
  Users,
  CheckCircle2,
  Clock,
  Building2,
  Sparkles,
  TrendingUp,
  Calendar,
  MapPin,
  Award,
  ShieldCheck,
  Eye,
  FileText,
  Lock,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  getProjectWaitlistConfig,
  updateProjectWaitlistConfig,
  getWaitlistSubmissions,
  updateWaitlistSubmissionStatus,
  deleteWaitlistSubmission,
} from '@/actions/waitlist';
import { uploadFile } from '@/lib/helperFunctions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  IProjectWaitlistConfig,
  IWaitlistEntry,
  IProjectHighlight,
  DEFAULT_PROJECT_WAITLIST_CONFIG,
} from '@/interfaces/waitlist';

const AVAILABLE_ICONS = [
  'Award',
  'Building2',
  'ShieldCheck',
  'TrendingUp',
  'Sparkles',
  'MapPin',
  'Calendar',
  'Clock',
  'CheckCircle2',
  'Lock',
];

export default function DashboardProjectWaitlistPage() {
  const [activeTab, setActiveTab] = useState<'config' | 'submissions'>('config');

  // Config State
  const [config, setConfig] = useState<IProjectWaitlistConfig>(
    DEFAULT_PROJECT_WAITLIST_CONFIG
  );
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [savingConfig, setSavingConfig] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Submissions State
  const [submissions, setSubmissions] = useState<IWaitlistEntry[]>([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // New highlight form inputs
  const [newHighlight, setNewHighlight] = useState<IProjectHighlight>({
    id: '',
    icon: 'Award',
    title: '',
    description: '',
  });

  // New unit category input
  const [newUnitCategory, setNewUnitCategory] = useState('');

  // Fetch Config
  const loadConfigData = async () => {
    setLoadingConfig(true);
    try {
      const data = await getProjectWaitlistConfig();
      setConfig(data);
    } catch (err) {
      toast.error('Failed to load waitlist configuration.');
    } finally {
      setLoadingConfig(false);
    }
  };

  // Fetch Submissions
  const loadSubmissionsData = async () => {
    setLoadingSubmissions(true);
    try {
      const data = await getWaitlistSubmissions();
      setSubmissions(data);
    } catch (err) {
      toast.error('Failed to load waitlist entries.');
    } finally {
      setLoadingSubmissions(false);
    }
  };

  useEffect(() => {
    loadConfigData();
    loadSubmissionsData();
  }, []);

  // Handle Image Upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const url = await uploadFile(file, 'waitlist');
      setConfig((prev) => ({ ...prev, image: url }));
      toast.success('Showcase image uploaded successfully!');
    } catch (err: any) {
      toast.error(err?.message || 'Image upload failed.');
    } finally {
      setUploadingImage(false);
    }
  };

  // Save Config
  const handleSaveConfig = async () => {
    setSavingConfig(true);
    try {
      const result = await updateProjectWaitlistConfig(config);
      if (result.success) {
        toast.success('Project Waitlist configuration saved successfully!');
      } else {
        toast.error(result.error || 'Failed to save configuration.');
      }
    } catch (err) {
      toast.error('An error occurred while saving.');
    } finally {
      setSavingConfig(false);
    }
  };

  // Highlight management
  const addHighlight = () => {
    if (!newHighlight.title || !newHighlight.description) {
      toast.warning('Please enter both title and description for the highlight.');
      return;
    }
    const item: IProjectHighlight = {
      ...newHighlight,
      id: `h_${Date.now()}`,
    };
    setConfig((prev) => ({
      ...prev,
      highlights: [...(prev.highlights || []), item],
    }));
    setNewHighlight({ id: '', icon: 'Award', title: '', description: '' });
    toast.success('Highlight added');
  };

  const removeHighlight = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      highlights: (prev.highlights || []).filter((h) => h.id !== id),
    }));
  };

  // Unit Category management
  const addUnitCategory = () => {
    if (!newUnitCategory.trim()) return;
    if (config.unitCategories?.includes(newUnitCategory.trim())) {
      toast.warning('Unit category already exists.');
      return;
    }
    setConfig((prev) => ({
      ...prev,
      unitCategories: [...(prev.unitCategories || []), newUnitCategory.trim()],
    }));
    setNewUnitCategory('');
  };

  const removeUnitCategory = (categoryToRemove: string) => {
    setConfig((prev) => ({
      ...prev,
      unitCategories: (prev.unitCategories || []).filter(
        (c) => c !== categoryToRemove
      ),
    }));
  };

  // Status Change for Submission
  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await updateWaitlistSubmissionStatus(id, newStatus);
      if (res.success) {
        toast.success('Status updated');
        setSubmissions((prev) =>
          prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
        );
      } else {
        toast.error(res.error || 'Failed to update status');
      }
    } catch (err) {
      toast.error('Error updating status');
    } finally {
      setUpdatingId(null);
    }
  };

  // Delete Submission
  const handleDeleteSubmission = async (id: string) => {
    if (!confirm('Are you sure you want to delete this waitlist entry?')) return;
    setUpdatingId(id);
    try {
      const res = await deleteWaitlistSubmission(id);
      if (res.success) {
        toast.success('Submission deleted');
        setSubmissions((prev) => prev.filter((s) => s.id !== id));
      } else {
        toast.error(res.error || 'Failed to delete');
      }
    } catch (err) {
      toast.error('Error deleting submission');
    } finally {
      setUpdatingId(null);
    }
  };

  // Filter Submissions
  const filteredSubmissions = submissions.filter((item) => {
    const matchesSearch =
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phoneNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.unitType?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 p-4 md:p-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b pb-5">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Layers className="w-8 h-8 text-[#cfb53b]" />
            Project Waitlist Manager
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            View, customize, and manage the website VIP Project Waitlist showcase and user registrations.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border">
          <button
            onClick={() => setActiveTab('config')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'config'
                ? 'bg-white text-slate-900 shadow-xs border'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4 text-[#cfb53b]" />
            Showcase Content & Settings
          </button>
          <button
            onClick={() => setActiveTab('submissions')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'submissions'
                ? 'bg-white text-slate-900 shadow-xs border'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4 text-[#cfb53b]" />
            Waitlist Submissions ({submissions.length})
          </button>
        </div>
      </div>

      {/* TAB 1: SHOWCASE CONFIGURATION */}
      {activeTab === 'config' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Form Fields */}
          <div className="lg:col-span-8 space-y-6">
            {/* Header Titles & Descriptions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#cfb53b]" />
                  Main Section Headlines
                </CardTitle>
                <CardDescription>
                  Configure the primary title, highlighted phrase, and subtitle displayed at the top of the component.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-bold uppercase text-slate-600">
                      Title Prefix
                    </Label>
                    <Input
                      value={config.title}
                      onChange={(e) =>
                        setConfig({ ...config, title: e.target.value })
                      }
                      placeholder="e.g. The Canopies at"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-xs font-bold uppercase text-slate-600">
                      Title Highlight (Gold)
                    </Label>
                    <Input
                      value={config.titleHighlight}
                      onChange={(e) =>
                        setConfig({ ...config, titleHighlight: e.target.value })
                      }
                      placeholder="e.g. Yas Point"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-bold uppercase text-slate-600">
                    Subtitle / Description
                  </Label>
                  <Textarea
                    value={config.subtitle}
                    onChange={(e) =>
                      setConfig({ ...config, subtitle: e.target.value })
                    }
                    rows={3}
                    placeholder="Enter subtitle description..."
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-xs font-bold uppercase text-slate-600">
                    Internal Project Name (Used in email & submission records)
                  </Label>
                  <Input
                    value={config.projectName}
                    onChange={(e) =>
                      setConfig({ ...config, projectName: e.target.value })
                    }
                    placeholder="e.g. The Canopies at Yas Point"
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Showcase Image & Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Upload className="w-5 h-5 text-[#cfb53b]" />
                  Showcase Image & Badges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-xs font-bold uppercase text-slate-600">
                    Project Image URL or Upload
                  </Label>
                  <div className="flex items-center gap-3 mt-1">
                    <Input
                      value={config.image}
                      onChange={(e) =>
                        setConfig({ ...config, image: e.target.value })
                      }
                      placeholder="e.g. /images/pdf-about/project_canopies_yas_point.png or https://..."
                      className="flex-1"
                    />
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      disabled={uploadingImage}
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2"
                    >
                      {uploadingImage ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Upload className="w-4 h-4" />
                      )}
                      Upload Image
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-bold uppercase text-slate-600">
                      Phase Badge Text
                    </Label>
                    <Input
                      value={config.phaseBadge}
                      onChange={(e) =>
                        setConfig({ ...config, phaseBadge: e.target.value })
                      }
                      placeholder="e.g. Pre-Launch Phase 1"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-xs font-bold uppercase text-slate-600">
                      Location Badge Text
                    </Label>
                    <Input
                      value={config.locationBadge}
                      onChange={(e) =>
                        setConfig({ ...config, locationBadge: e.target.value })
                      }
                      placeholder="e.g. Yas Island, Abu Dhabi"
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Specs */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#cfb53b]" />
                  Performance Specs (Stats Bar)
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-xs font-bold uppercase text-slate-600">
                    Target Yield
                  </Label>
                  <Input
                    value={config.targetYield}
                    onChange={(e) =>
                      setConfig({ ...config, targetYield: e.target.value })
                    }
                    placeholder="e.g. 9.8% p.a."
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-xs font-bold uppercase text-slate-600">
                    Handover Date
                  </Label>
                  <Input
                    value={config.handover}
                    onChange={(e) =>
                      setConfig({ ...config, handover: e.target.value })
                    }
                    placeholder="e.g. Q4 2027"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-xs font-bold uppercase text-slate-600">
                    Allocation Percentage
                  </Label>
                  <Input
                    value={config.allocation}
                    onChange={(e) =>
                      setConfig({ ...config, allocation: e.target.value })
                    }
                    placeholder="e.g. 84% Reserved"
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Project Highlights Builder */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#cfb53b]" />
                  Key Project Highlights (3 Feature Cards)
                </CardTitle>
                <CardDescription>
                  Feature cards displayed directly under the main project image showcase.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {config.highlights?.map((h) => (
                    <div
                      key={h.id}
                      className="p-3 bg-slate-50 border rounded-xl flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-xs font-mono">
                          {h.icon}
                        </Badge>
                        <div>
                          <p className="text-xs font-bold text-slate-800">{h.title}</p>
                          <p className="text-[11px] text-slate-500">{h.description}</p>
                        </div>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeHighlight(h.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-3">
                  <p className="text-xs font-bold text-slate-700">Add New Highlight</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <Label className="text-[10px] font-bold uppercase text-slate-500">
                        Icon
                      </Label>
                      <select
                        value={newHighlight.icon}
                        onChange={(e) =>
                          setNewHighlight({ ...newHighlight, icon: e.target.value })
                        }
                        className="w-full mt-1 border rounded-lg p-2 text-xs bg-white"
                      >
                        {AVAILABLE_ICONS.map((icon) => (
                          <option key={icon} value={icon}>
                            {icon}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label className="text-[10px] font-bold uppercase text-slate-500">
                        Title
                      </Label>
                      <Input
                        value={newHighlight.title}
                        onChange={(e) =>
                          setNewHighlight({ ...newHighlight, title: e.target.value })
                        }
                        placeholder="e.g. VIP Floor Choice"
                        className="mt-1 text-xs"
                      />
                    </div>

                    <div>
                      <Label className="text-[10px] font-bold uppercase text-slate-500">
                        Description
                      </Label>
                      <Input
                        value={newHighlight.description}
                        onChange={(e) =>
                          setNewHighlight({ ...newHighlight, description: e.target.value })
                        }
                        placeholder="Short description..."
                        className="mt-1 text-xs"
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={addHighlight}
                    className="w-full text-xs font-bold flex items-center justify-center gap-1 mt-2"
                  >
                    <Plus className="w-4 h-4" /> Add Highlight
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Preferred Unit Options */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#cfb53b]" />
                  Preferred Unit Category Options
                </CardTitle>
                <CardDescription>
                  Options available in the signup form select dropdown.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {config.unitCategories?.map((cat) => (
                    <Badge
                      key={cat}
                      variant="secondary"
                      className="px-3 py-1.5 text-xs font-semibold flex items-center gap-2"
                    >
                      {cat}
                      <button
                        onClick={() => removeUnitCategory(cat)}
                        className="hover:text-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Input
                    value={newUnitCategory}
                    onChange={(e) => setNewUnitCategory(e.target.value)}
                    placeholder="e.g. 5 Bedroom Sky Mansion"
                    className="text-xs flex-1"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addUnitCategory();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addUnitCategory}
                    className="text-xs font-bold"
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add Category
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Action Bar */}
            <div className="sticky bottom-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl border shadow-xl flex items-center justify-between">
              <p className="text-xs text-slate-500">
                Click save to update the live ProjectWaitlist component on the home page.
              </p>
              <Button
                onClick={handleSaveConfig}
                disabled={savingConfig}
                className="bg-[#cfb53b] hover:bg-[#b89f30] text-slate-950 font-bold px-6 py-2.5 flex items-center gap-2"
              >
                {savingConfig ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save Changes
              </Button>
            </div>
          </div>

          {/* Right Column: Live Component Preview */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-6">
              <Card className="border-2 border-[#cfb53b]/30 shadow-xl overflow-hidden bg-slate-950 text-white">
                <CardHeader className="border-b border-slate-800 bg-slate-900/80 py-3 px-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#cfb53b] flex items-center gap-1.5 uppercase tracking-wider">
                      <Eye className="w-4 h-4" /> Live Preview
                    </span>
                    <Badge className="bg-[#cfb53b]/20 text-[#cfb53b] border-none text-[10px]">
                      Homepage Component
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-4 font-display text-xs">
                  {/* Headline Preview */}
                  <div className="text-center space-y-1">
                    <h3 className="text-lg font-light text-white">
                      {config.title || 'The Canopies at'}{' '}
                      <span className="font-black italic text-[#cfb53b]">
                        {config.titleHighlight || 'Yas Point'}
                      </span>
                    </h3>
                    <p className="text-[11px] text-slate-400 font-light line-clamp-2">
                      {config.subtitle}
                    </p>
                  </div>

                  {/* Image Card Preview */}
                  <div className="relative aspect-16/10 rounded-xl overflow-hidden border border-primary/30">
                    <Image
                      src={
                        config.image ||
                        '/images/pdf-about/project_canopies_yas_point.png'
                      }
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    <div className="absolute top-2 left-2 flex gap-1">
                      <span className="bg-[#cfb53b] text-slate-950 font-extrabold text-[9px] px-2 py-0.5 rounded">
                        {config.phaseBadge}
                      </span>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 bg-slate-900/90 border border-primary/30 p-2 rounded-lg grid grid-cols-3 gap-1 text-center text-[9px]">
                      <div>
                        <p className="text-slate-400 font-bold uppercase">Yield</p>
                        <p className="font-black text-[#cfb53b]">{config.targetYield}</p>
                      </div>
                      <div className="border-x border-primary/20">
                        <p className="text-slate-400 font-bold uppercase">Handover</p>
                        <p className="font-black text-white">{config.handover}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 font-bold uppercase">Reserved</p>
                        <p className="font-black text-emerald-400">{config.allocation}</p>
                      </div>
                    </div>
                  </div>

                  {/* Highlights Preview */}
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold uppercase text-slate-400">
                      Highlights ({config.highlights?.length || 0})
                    </p>
                    <div className="space-y-1">
                      {config.highlights?.map((h) => (
                        <div
                          key={h.id}
                          className="bg-slate-900/80 border border-white/10 p-2 rounded-lg flex items-center justify-between"
                        >
                          <span className="font-bold text-white text-[11px]">
                            {h.title}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {h.description}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Preferred Units Preview */}
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase text-slate-400">
                      Unit Categories ({config.unitCategories?.length || 0})
                    </p>
                    <div className="bg-slate-900 p-2 rounded-lg text-[11px] text-slate-300">
                      {config.unitCategories?.[0]} + {Math.max(0, (config.unitCategories?.length || 0) - 1)} more
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: WAITLIST SUBMISSIONS */}
      {activeTab === 'submissions' && (
        <div className="space-y-6">
          {/* Submissions Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase">
                    Total VIP Registrations
                  </p>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">
                    {submissions.length}
                  </h3>
                </div>
                <div className="p-3 rounded-xl bg-amber-50 text-[#cfb53b]">
                  <Users className="w-6 h-6" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase">
                    Pending Allocation Access
                  </p>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">
                    {
                      submissions.filter(
                        (s) => !s.status || s.status === 'pending_vip_access'
                      ).length
                    }
                  </h3>
                </div>
                <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                  <Clock className="w-6 h-6" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase">
                    Contacted / Converted
                  </p>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">
                    {
                      submissions.filter(
                        (s) => s.status === 'contacted' || s.status === 'converted'
                      ).length
                    }
                  </h3>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filter & Refresh Controls */}
          <Card>
            <CardHeader className="py-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 max-w-md">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <Input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search name, email, phone, or unit type..."
                      className="pl-9 text-xs"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border rounded-lg p-2 text-xs bg-white text-slate-700"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending_vip_access">Pending VIP Access</option>
                    <option value="contacted">Contacted</option>
                    <option value="converted">Converted</option>
                  </select>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={loadSubmissionsData}
                  disabled={loadingSubmissions}
                  className="flex items-center gap-1.5 text-xs"
                >
                  <RefreshCw
                    className={`w-3.5 h-3.5 ${
                      loadingSubmissions ? 'animate-spin' : ''
                    }`}
                  />
                  Refresh List
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 border-t">
              {loadingSubmissions ? (
                <div className="p-12 text-center text-slate-500 text-xs flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-[#cfb53b]" />
                  Loading waitlist entries...
                </div>
              ) : filteredSubmissions.length === 0 ? (
                <div className="p-12 text-center text-slate-500 text-xs space-y-2">
                  <FileText className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="font-semibold">No waitlist entries found.</p>
                  <p className="text-slate-400 text-[11px]">
                    User signups from the homepage waitlist form will appear here.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-600 font-bold border-b uppercase text-[10px] tracking-wider">
                        <th className="p-4">Customer</th>
                        <th className="p-4">Contact Info</th>
                        <th className="p-4">Preferred Unit</th>
                        <th className="p-4">Project</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Submitted Date</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {filteredSubmissions.map((entry) => (
                        <tr
                          key={entry.id}
                          className="hover:bg-slate-50/80 transition-colors"
                        >
                          <td className="p-4 font-bold text-slate-900">
                            {entry.name}
                          </td>
                          <td className="p-4 space-y-0.5">
                            <p className="text-slate-800 font-medium">{entry.email}</p>
                            <p className="text-[11px] text-slate-500 font-mono">
                              {entry.phoneNumber}
                            </p>
                          </td>
                          <td className="p-4">
                            <Badge
                              variant="outline"
                              className="text-[11px] bg-slate-50 font-normal"
                            >
                              {entry.unitType || 'Not specified'}
                            </Badge>
                          </td>
                          <td className="p-4 font-medium text-slate-800">
                            {entry.projectName || 'The Canopies at Yas Point'}
                          </td>
                          <td className="p-4">
                            <select
                              value={entry.status || 'pending_vip_access'}
                              disabled={updatingId === entry.id}
                              onChange={(e) =>
                                handleStatusChange(entry.id!, e.target.value)
                              }
                              className={`text-[11px] font-bold border rounded-lg p-1.5 cursor-pointer ${
                                entry.status === 'converted'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                  : entry.status === 'contacted'
                                  ? 'bg-blue-50 text-blue-700 border-blue-300'
                                  : 'bg-amber-50 text-amber-700 border-amber-300'
                              }`}
                            >
                              <option value="pending_vip_access">
                                Pending VIP Access
                              </option>
                              <option value="contacted">Contacted</option>
                              <option value="converted">Converted</option>
                            </select>
                          </td>
                          <td className="p-4 text-slate-500 text-[11px]">
                            {entry.createdAt
                              ? new Date(entry.createdAt).toLocaleDateString(
                                  'en-US',
                                  {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  }
                                )
                              : '—'}
                          </td>
                          <td className="p-4 text-right">
                            <Button
                              size="icon"
                              variant="ghost"
                              disabled={updatingId === entry.id}
                              onClick={() => handleDeleteSubmission(entry.id!)}
                              className="text-slate-400 hover:text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
