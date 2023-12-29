/* eslint-disable react/prop-types */
import { type Components, TinaMarkdown } from 'tinacms/dist/rich-text';

import { Code } from './Code';

export const Markdown = (props: Parameters<typeof TinaMarkdown>[0]) => {
    return (
        <span className="markdown">
            <TinaMarkdown {...props} components={components} />
        </span>
    );
};

interface CustomComponents {
    Visualization: { title?: string };
    Video: { src?: string };
}

const components: Components<CustomComponents> = {
    // Override default markdown components
    code_block: (props) =>
        props?.lang && props.value ? (
            <Code language={props.lang}>{props.value}</Code>
        ) : (
            <div />
        ),
    img: (props) => (
        <span className="flex flex-col items-center">
            {props?.url ? (
                <img
                    src={props.url}
                    alt={props?.alt}
                    style={{
                        maxHeight: '50vh',
                        width: 'auto',
                        objectFit: 'contain',
                    }}
                />
            ) : null}
            <span className="text-sm text-neutral-400">{props?.caption}</span>
        </span>
    ),
    // Custom components
    Visualization: (props) => <h1>{props?.title}</h1>,
    Video: (props) =>
        props?.src ? (
            <video loop autoPlay playsInline muted>
                <source src={props?.src} />
            </video>
        ) : (
            <div />
        ),
};
