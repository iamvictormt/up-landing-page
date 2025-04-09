'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = resolvedTheme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <Button
      variant="outline"
      onClick={toggleTheme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ textAlign: 'center' }}
      aria-label={isDark ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
    >
      {!isDark ? (
        <Sun
          className={cn(
            'transform text-yellow-500 transition-all duration-500',
            isDark ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
          )}
        />
      ) : (
        <Moon
          className={cn(
            'transform transition-all duration-500',
            isDark ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
          )}
        />
      )}
    </Button>
  );
}
