'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
        );
    }

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="group relative p-2.5 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-400 shadow-sm hover:shadow-md transition-all duration-300"
            aria-label="Toggle theme"
        >
            <div className="relative w-5 h-5 overflow-hidden">
                <Sun className="w-5 h-5 text-amber-500 transition-all duration-500 absolute top-0 left-0 rotate-0 scale-100 dark:rotate-90 dark:scale-0" />
                <Moon className="w-5 h-5 text-blue-400 transition-all duration-500 absolute top-0 left-0 -rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
            </div>
            <span className="sr-only">Toggle theme</span>
        </button>
    );
}
