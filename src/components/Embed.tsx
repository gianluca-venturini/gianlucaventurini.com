import { useEffect, useRef, useState } from 'react';

import { ElementFrame } from './ElementFrame';

export interface EmbedProps {
    // A page of this site with `#<id>` shows only that element of the page
    src?: string;
    title?: string;
    // "auto" makes the frame as tall as the page content (pages of this site only),
    // else the frame is 16:9
    height?: string;
}

export const Embed = (props: EmbedProps) => {
    const ref = useRef<HTMLIFrameElement>(null);
    const [height, setHeight] = useState<number>();
    const auto = props.height === 'auto';

    useEffect(() => {
        const iframe = ref.current;
        if (!auto || !iframe) return;
        let observer: ResizeObserver | undefined;
        const fit = () => {
            const root = iframe.contentDocument?.documentElement;
            if (!root) return;
            observer?.disconnect();
            observer = new ResizeObserver(() => {
                setHeight(Math.ceil(root.getBoundingClientRect().height));
            });
            observer.observe(root);
        };
        iframe.addEventListener('load', fit);
        // The page can finish loading before this code runs
        if (iframe.contentDocument?.readyState === 'complete') fit();
        return () => {
            iframe.removeEventListener('load', fit);
            observer?.disconnect();
        };
    }, [auto, props.src]);

    if (!props.src) return <div />;
    const [url, id] = props.src.split('#');
    if (id && url.startsWith('/')) {
        return (
            // A div, not a p: HTML does not allow a div inside a p
            <div className="mb-4">
                <ElementFrame
                    url={url}
                    selector={`#${id}`}
                    initialHeight={400}
                    maxScale={1}
                    interactive
                />
            </div>
        );
    }
    return (
        <p style={auto ? { height: height ?? 400 } : { aspectRatio: '16 / 9' }}>
            <iframe
                ref={ref}
                allowFullScreen
                src={props.src}
                title={props.title ?? ''}
                style={{
                    width: '100%',
                    height: '100%',
                    border: 0,
                }}
            />
        </p>
    );
};
