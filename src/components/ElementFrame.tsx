import { useEffect, useRef, useState } from 'react';

// Window size of the page in the frame. At this size the 3D views of the
// Raptor pages have the same shape as the preview card.
const FRAME_WIDTH = 1400;
const FRAME_HEIGHT = 654;

interface Rect {
    left: number;
    top: number;
    width: number;
    height: number;
}

// Shows one element of a page of this site, live, scaled to fit the box width.
// Pages of other sites cannot be shown this way, because the browser blocks
// access to their content.
export const ElementFrame = (props: {
    url: string;
    selector: string;
    // Height of the box before the page loads
    initialHeight: number;
    maxHeight?: number;
    maxScale?: number;
    // Let the reader click and drag in the page
    interactive?: boolean;
    className?: string;
}) => {
    const box = useRef<HTMLDivElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [boxWidth, setBoxWidth] = useState(0);
    const [rect, setRect] = useState<Rect>();

    useEffect(() => {
        const element = box.current;
        if (!element) return;
        const observer = new ResizeObserver(() => {
            setBoxWidth(element.offsetWidth);
        });
        observer.observe(element);
        return () => {
            observer.disconnect();
        };
    }, []);

    // A page rendered on the server can load the frame before React handles its
    // load event: place it now when the page in the frame is already loaded
    useEffect(() => {
        const iframe = iframeRef.current;
        const doc = iframe?.contentDocument;
        if (
            iframe &&
            doc?.readyState === 'complete' &&
            doc.location.href !== 'about:blank'
        ) {
            place(iframe);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function place(iframe: HTMLIFrameElement) {
        const frame = iframe.contentWindow;
        if (!frame) return;
        // The wheel must scroll this page, not the page in the frame
        frame.document.documentElement.style.overflow = 'hidden';
        const element = frame.document.querySelector(props.selector);
        if (!element) {
            setRect({
                left: 0,
                top: 0,
                width: FRAME_WIDTH,
                height: FRAME_HEIGHT,
            });
            return;
        }
        // The frame paints only its own window: make it tall enough for the element
        const elementHeight = Math.ceil(element.getBoundingClientRect().height);
        if (elementHeight > iframe.offsetHeight) {
            iframe.height = String(elementHeight);
        }
        requestAnimationFrame(() => {
            // Scroll only the frame: scrollIntoView would also scroll this page
            frame.scrollTo(
                0,
                element.getBoundingClientRect().top + frame.scrollY
            );
            const r = element.getBoundingClientRect();
            setRect({
                left: r.left,
                top: r.top,
                width: r.width,
                height: r.height,
            });
        });
    }

    const scale =
        rect && boxWidth
            ? Math.min(
                  boxWidth / rect.width,
                  (props.maxHeight ?? Infinity) / rect.height,
                  props.maxScale ?? Infinity
              )
            : undefined;

    return (
        <div
            ref={box}
            className={`flex w-full justify-center overflow-hidden ${
                props.className ?? ''
            }`}
            style={{
                height:
                    rect && scale ? rect.height * scale : props.initialHeight,
            }}
        >
            <div
                className="relative overflow-hidden"
                style={{
                    width: rect && scale ? rect.width * scale : '100%',
                    height: '100%',
                }}
            >
                <iframe
                    src={props.url}
                    ref={iframeRef}
                    onLoad={(e) => {
                        place(e.currentTarget);
                    }}
                    title=""
                    aria-hidden={!props.interactive}
                    tabIndex={props.interactive ? undefined : -1}
                    width={FRAME_WIDTH}
                    height={FRAME_HEIGHT}
                    className={`absolute left-0 top-0 border-0 origin-top-left transition-opacity duration-200 ${
                        props.interactive ? '' : 'pointer-events-none'
                    }`}
                    style={{
                        transform:
                            rect && scale
                                ? `scale(${scale}) translate(${-rect.left}px, ${-rect.top}px)`
                                : undefined,
                        opacity: rect && scale ? 1 : 0,
                    }}
                />
            </div>
        </div>
    );
};
