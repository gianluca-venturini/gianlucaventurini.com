import { TinaMarkdown } from 'tinacms/dist/rich-text';

import { Code } from './Code';

export const Markdown = (props: Parameters<typeof TinaMarkdown>[0]) => {
    return (
        <span className="markdown">
            <TinaMarkdown {...props} components={components} />
        </span>
    );
};

const components: Record<string, (props: object) => JSX.Element> = {
    // Override default markdown components
    code_block: (props: any) =>
        props.lang &&
        props.value && <Code language={props.lang}>{props.value}</Code>,
    // Custom components
    Visualization: (props: { title?: string }) => <h1>{props.title}</h1>,
    Video: (props: { src?: string }) =>
        props.src ? (
            <video loop autoPlay playsInline muted>
                <source src={props.src} />
            </video>
        ) : (
            <div />
        ),
};
