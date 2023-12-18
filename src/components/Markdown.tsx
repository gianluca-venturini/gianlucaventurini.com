import { TinaMarkdown } from 'tinacms/dist/rich-text';

export const Markdown = (props: Parameters<typeof TinaMarkdown>[0]) => {
    return (
        <span className="markdown">
            <TinaMarkdown {...props} />
        </span>
    );
};
