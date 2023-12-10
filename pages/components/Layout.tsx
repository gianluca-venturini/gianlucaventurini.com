import Link from 'next/link';
import Head from 'next/head';
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export const Layout = (props: React.PropsWithChildren) => {
    const [theme, setTheme] = useState<Theme>(getInitialTheme());
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        } else if (theme === 'light') {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        }
    }, [theme]);

    return (
        <div
            style={{
                margin: '3rem',
            }}
        >
            <Head>
                <title>Gianluca Venturini</title>
                <meta name="description" content="A TinaCMS Application" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="bg-light dark:bg-dark">Hello</div>
            <header>
                <Link href="/">Gianluca Venturini</Link>
                {' | '}
                <Link href="/bookshelf">Bookshelf</Link>
                {' | '}
                <Link href="/posts">Blog</Link>
                {' | '}
                <button
                    onClick={() => {
                        if (!theme) {
                            setTheme('dark');
                        } else if (theme === 'light') {
                            setTheme('dark');
                        } else if (theme === 'dark') {
                            setTheme('light');
                        }
                    }}
                    suppressHydrationWarning
                >
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>
            </header>
            <main>{props.children}</main>
        </div>
    );
};

function getInitialTheme(): Theme {
    if (typeof window === 'undefined' || !('localStorage' in window)) {
        return 'light';
    }
    return localStorage.theme ??
        window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
}
