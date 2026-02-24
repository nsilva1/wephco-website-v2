"use client";

import { useEffect, useState } from 'react';
import { X, Download, RefreshCw, CheckCircle2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { usePWAInstall } from '@/context/PwaContext';

const ReloadPrompt = () => {
  const [offlineReady, setOfflineReady] = useState(false);
  const [needRefresh, setNeedRefresh] = useState(false);
  const [dismissedInstall, setDismissedInstall] = useState(false);

  const { install, isInstallable } = usePWAInstall();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Service Worker Update Logic (next-pwa/workbox)
    const wb = (window as any).workbox;
    if (wb) {
      wb.addEventListener('activated', (event: any) => {
        if (!event.isUpdate) setOfflineReady(true);
      });

      wb.addEventListener('waiting', () => {
        setNeedRefresh(true);
      });

      wb.register();
    }

    // Check if the user already dismissed it in this session
    const isDismissed = localStorage.getItem('pwa_install_dismissed') === 'true';
    if (isDismissed) setDismissedInstall(true);
  }, []);

  // Auto-hide offline ready toast
  useEffect(() => {
    if (offlineReady) {
      const timer = setTimeout(() => setOfflineReady(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [offlineReady]);

  const handleRefresh = () => {
    const wb = (window as any).workbox;
    if (wb) {
      wb.addEventListener('controlling', () => window.location.reload());
      wb.messageSkipWaiting();
    } else {
      window.location.reload();
    }
  };

  const handleDismissInstall = () => {
    setDismissedInstall(true);
    localStorage.setItem('pwa_install_dismissed', 'true');
  };

  // Visibility Logic
  const showInstallPrompt = isInstallable && !dismissedInstall && !needRefresh;
  const isAuthPage = ['/login', '/register'].includes(pathname);

  if (isAuthPage) return null;
  if (!offlineReady && !needRefresh && !showInstallPrompt) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-sm w-[calc(100vw-3rem)] pointer-events-none">
      
      {/* 1. Offline Ready Toast */}
      {offlineReady && (
        <div className="bg-white border-l-4 border-green-500 p-4 rounded-lg shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-right-10 pointer-events-auto">
          <CheckCircle2 className="text-green-500 flex-shrink-0" size={20} />
          <p className="text-sm font-medium text-gray-700">App ready for offline use!</p>
        </div>
      )}

      {/* 2. Service Worker Update Prompt */}
      {needRefresh && (
        <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-2xl flex flex-col gap-4 animate-in slide-in-from-bottom-10 pointer-events-auto border border-slate-700">
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <div className="bg-blue-500/20 p-2 rounded-lg">
                <RefreshCw size={20} className="text-blue-400 animate-spin" />
              </div>
              <div>
                <h4 className="text-sm font-bold">Update Available</h4>
                <p className="text-xs text-slate-400 leading-relaxed">A newer version of Wephco is ready with the latest updates.</p>
              </div>
            </div>
            <button onClick={() => setNeedRefresh(false)} className="text-slate-500 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>
          <button
            onClick={handleRefresh}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg active:scale-[0.98]"
          >
            Update & Restart
          </button>
        </div>
      )}

      {/* 3. PWA Install Prompt (Using Context) */}
      {showInstallPrompt && (
        <div className="bg-[#235f23] text-white p-5 rounded-2xl shadow-2xl flex flex-col gap-4 animate-in slide-in-from-bottom-10 pointer-events-auto border border-white/10">
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <div className="p-2 rounded-lg text-white">
                <Download size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold">Wephco Brokerage App</h4>
                <p className="text-xs text-white/70 leading-relaxed">Add to home screen for an app-like experience and quick access.</p>
              </div>
            </div>
            <button onClick={handleDismissInstall} className="text-white/40 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>
          <button
            onClick={install}
            className="w-full bg-white text-[#235f23] py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg hover:bg-gray-100 active:scale-[0.98]"
          >
            Install App
          </button>
        </div>
      )}
    </div>
  );
};

export { ReloadPrompt };