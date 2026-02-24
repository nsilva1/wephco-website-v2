"use client";
import { usePWAInstall } from '@/context/PwaContext';

export const InstallPWAButton = () => {
  const { isInstallable, install } = usePWAInstall();

  if (!isInstallable) return null; // Hide button if already installed

  return (
    <button 
      onClick={install}
      className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors font-semibold w-full cursor-pointer"
    >
      Install Brokerage App
    </button>
  );
}