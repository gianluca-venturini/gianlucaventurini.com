import { useEffect, useState } from 'react';

import Head from 'next/head';
import Link from 'next/link';

type Theme = 'light' | 'dark';

export const Layout = (props: React.PropsWithChildren) => {
    const [theme, setTheme] = useState<Theme>(getInitialTheme());

    function setAndStoreTheme(theme: Theme) {
        setTheme(theme);
        localStorage.theme = theme;
    }

    function flipTheme() {
        setAndStoreTheme(theme === 'dark' ? 'light' : 'dark');
    }

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else if (theme === 'light') {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    return (
        <>
            <Head>
                <title>Gianluca Venturini</title>
                <meta name="description" content="A TinaCMS Application" />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <header className="select-none flex gap-6 py-2 px-4">
                <Link className="flex-initial" href="/">
                    Gianluca Venturini
                </Link>
                <Link className="flex-initial" href="/bookshelf">
                    Bookshelf
                </Link>
                <Link className="flex-initial" href="/posts">
                    Blog
                </Link>
                <button
                    className="flex-initial"
                    onClick={flipTheme}
                    suppressHydrationWarning
                >
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>
            </header>
            <main
                className="max-w-[48rem] flex-col py-8 px-4 mx-auto"
                style={{ maxWidth: 600 }}
            >
                {props.children}
            </main>
        </>
    );
};

function getInitialTheme(): Theme {
    if (typeof window === 'undefined' || !('localStorage' in window)) {
        return 'light';
    }
    if (localStorage.theme) {
        return localStorage.theme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
}
