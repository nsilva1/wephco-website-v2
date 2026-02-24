"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { BeforeInstallPromptEvent } from '../interfaces/appInterface';

interface PWAContextType {
  isInstallable: boolean;
  install: () => Promise<void>;
  isStandalone: boolean; 
}

const PWAContext = createContext<PWAContextType | null>(null);

export const PWAProvider = ({ children }: { children: React.ReactNode }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Safety check for server-side rendering
    if (typeof window === 'undefined') return;

    const checkStandalone = () => {
      return window.matchMedia('(display-mode: standalone)').matches || 
             (window.navigator as any).standalone === true;
    };

    setIsStandalone(checkStandalone());

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const install = async () => {
    // 1. Handle Chrome/Android/Edge (using the deferredPrompt)
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setIsStandalone(true);
      }
      return;
    }

    // 2. Handle Manual Installation (iOS & browsers without beforeinstallprompt)
    const ua = window.navigator.userAgent;
    const isIOS = /iPhone|iPad|iPod/.test(ua);
    const isAndroid = /Android/.test(ua);

    if (isIOS) {
      alert(
        "To install on iOS:\n\n" +
        "1. Tap the 'Share' icon (the square with an arrow) at the bottom.\n" +
        "2. Scroll down and tap 'Add to Home Screen'.\n" +
        "3. Tap 'Add' in the top right corner."
      );
    } else if (isAndroid) {
      alert(
        "To install on Android:\n\n" +
        "1. Tap the three dots (⋮) in the top right corner.\n" +
        "2. Select 'Install app' or 'Add to Home screen'."
      );
    } else {
      alert("To install this app, please use the 'Install' icon in your browser's address bar.");
    }
  };

  // Logic: It's installable if we have the prompt AND we aren't already standalone
  const isInstallable = !!deferredPrompt && !isStandalone;

  return (
    <PWAContext.Provider value={{ isInstallable, install, isStandalone }}>
      {children}
    </PWAContext.Provider>
  );
};

export const usePWAInstall = () => {
  const context = useContext(PWAContext);
  if (!context) throw new Error('usePWAInstall must be used within a PWAProvider');
  return context;
};