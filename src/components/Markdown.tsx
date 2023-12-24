import { TinaMarkdown } from 'tinacms/dist/rich-text';

export const Markdown = (props: Parameters<typeof TinaMarkdown>[0]) => {
    return (
        <span className="markdown">
            <TinaMarkdown {...props} components={components} />
        </span>
    );
};

const components: Record<string, (props: object) => JSX.Element> = {
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
