import { useEffect, useState } from 'react';

import Head from 'next/head';
import Link from 'next/link';

import { GithubIcon, TwitterIcon, TwitterXIcon } from './Icons';

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
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <header className="select-none flex gap-6 py-2 px-4">
                <Link className="flex-initial hidden sm:flex" href="/">
                    Gianluca Venturini
                </Link>
                <Link className="flex-initial sm:hidden" href="/">
                    Gianluca
                </Link>
                <Link className="flex-initial" href="/bookshelf">
                    Bookshelf
                </Link>
                <Link className="flex-initial" href="/posts">
                    Blog
                </Link>
                <Link
                    className="flex-initial flex items-center relative w-4 group"
                    href="https://twitter.com/gianlu_ventu"
                >
                    <div className="absolute inset-0 flex items-center justify-center group-hover:animate-flickering-off">
                        <TwitterXIcon />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:animate-flickering-on">
                        <TwitterIcon />
                    </div>
                </Link>
                <Link
                    className="flex-initial flex items-center"
                    href="https://github.com/gianluca-venturini"
                >
                    <GithubIcon />
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
