import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { type LinkPreviewData, parseLinkPreview } from './LinkPreviewMeta';

const OPEN_DELAY_MS = 300;
const CLOSE_DELAY_MS = 150;
const CARD_WIDTH = 320;
const GAP = 8;
const MARGIN = 16;

const cache = new Map<string, Promise<LinkPreviewData | null>>();

async function loadPreview(url: string) {
    let preview = cache.get(url);
    if (!preview) {
        preview = fetchPreview(url).catch(() => null);
        cache.set(url, preview);
    }
    return await preview;
}

async function fetchPreview(url: string): Promise<LinkPreviewData | null> {
    // Pages of this site are read directly, other sites through the API
    if (url.startsWith('/') && !url.startsWith('//')) {
        const response = await fetch(url);
        if (!response.headers.get('content-type')?.includes('text/html')) {
            return null;
        }
        const absolute = new URL(url, window.location.origin).toString();
        return parseLinkPreview(await response.text(), absolute);
    }
    const response = await fetch(
        `/api/link-preview?url=${encodeURIComponent(url)}`
    );
    return response.ok ? await response.json() : null;
}

function hasPreview(url: string) {
    return (
        (url.startsWith('/') && !url.startsWith('//')) ||
        /^https?:\/\//.test(url)
    );
}

export const PreviewLink = (
    props: React.PropsWithChildren<{ url: string }>
) => {
    const { url } = props;
    const [anchor, setAnchor] = useState<DOMRect | null>(null);
    const [preview, setPreview] = useState<LinkPreviewData | null>(null);
    const timer = useRef<ReturnType<typeof setTimeout>>();
    const hovering = useRef(false);

    useEffect(
        () => () => {
            clearTimeout(timer.current);
        },
        []
    );

    useEffect(() => {
        if (!anchor) return;
        const close = () => {
            setAnchor(null);
        };
        window.addEventListener('scroll', close, { passive: true });
        return () => {
            window.removeEventListener('scroll', close);
        };
    }, [anchor]);

    function open(event: React.PointerEvent<HTMLAnchorElement>) {
        if (event.pointerType !== 'mouse' || !hasPreview(url)) return;
        // A link can wrap on many lines: anchor the card to the hovered line
        const rects = Array.from(event.currentTarget.getClientRects());
        const rect =
            rects.find(
                (r) => event.clientY >= r.top && event.clientY <= r.bottom
            ) ?? event.currentTarget.getBoundingClientRect();
        hovering.current = true;
        clearTimeout(timer.current);
        const opened = Date.now();
        void loadPreview(url).then((data) => {
            if (!data?.title || !hovering.current) return;
            setPreview(data);
            const wait = Math.max(0, OPEN_DELAY_MS - (Date.now() - opened));
            timer.current = setTimeout(() => {
                setAnchor(rect);
            }, wait);
        });
    }

    function keepOpen() {
        hovering.current = true;
        clearTimeout(timer.current);
    }

    function close() {
        hovering.current = false;
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            setAnchor(null);
        }, CLOSE_DELAY_MS);
    }

    return (
        <>
            <a href={url} onPointerEnter={open} onPointerLeave={close}>
                {props.children}
            </a>
            {anchor &&
                preview &&
                createPortal(
                    <PreviewCard
                        anchor={anchor}
                        preview={preview}
                        onPointerEnter={keepOpen}
                        onPointerLeave={close}
                    />,
                    document.body
                )}
        </>
    );
};

const PreviewCard = (props: {
    anchor: DOMRect;
    preview: LinkPreviewData;
    onPointerEnter: () => void;
    onPointerLeave: () => void;
}) => {
    const { anchor, preview } = props;
    const ref = useRef<HTMLAnchorElement>(null);
    const [position, setPosition] = useState<{ top: number; left: number }>();
    const host = new URL(preview.url).hostname.replace(/^www\./, '');

    // Show the card under the link, or above it when there is no space below
    useLayoutEffect(() => {
        const height = ref.current?.offsetHeight ?? 0;
        const below = anchor.bottom + GAP;
        const top =
            below + height > window.innerHeight - MARGIN &&
            anchor.top - GAP - height > MARGIN
                ? anchor.top - GAP - height
                : below;
        const left = Math.max(
            MARGIN,
            Math.min(anchor.left, window.innerWidth - CARD_WIDTH - MARGIN)
        );
        setPosition({ top, left });
    }, [anchor, preview]);

    return (
        <a
            ref={ref}
            href={preview.url}
            onPointerEnter={props.onPointerEnter}
            onPointerLeave={props.onPointerLeave}
            style={{
                width: CARD_WIDTH,
                maxWidth: `calc(100vw - ${2 * MARGIN}px)`,
                top: position?.top ?? 0,
                left: position?.left ?? 0,
                visibility: position ? 'visible' : 'hidden',
            }}
            className="fixed z-50 flex flex-col overflow-hidden rounded-md border border-neutral-300 bg-neutral-50 text-neutral-600 shadow-lg animate-fade-in dark:border-neutral-600 dark:bg-neutral-700 dark:text-gray-300"
        >
            {preview.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={preview.image}
                    alt=""
                    className="h-40 w-full object-cover bg-neutral-200 dark:bg-neutral-600"
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                    }}
                />
            )}
            <div className="flex flex-col gap-1 p-3">
                <span className="font-semibold line-clamp-2 dark:text-gray-50">
                    {preview.title}
                </span>
                {preview.description && (
                    <span className="text-sm line-clamp-3">
                        {preview.description}
                    </span>
                )}
                <span className="text-xs text-neutral-400">
                    {preview.siteName ?? host}
                </span>
            </div>
        </a>
    );
};
