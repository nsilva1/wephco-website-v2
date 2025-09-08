import { useEffect, useState } from "react";

export function useBrowserTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    // set initial theme
    setTheme(media.matches ? 'dark' : 'light');

    // listener for changes
    const listener = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    // add listener
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, []);

  return theme;
}
