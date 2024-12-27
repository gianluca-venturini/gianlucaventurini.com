/* eslint-disable react/prop-types */
import { type Components, TinaMarkdown } from 'tinacms/dist/rich-text';

import { Code } from './Code';
import { Image, type ImageProps } from './Image';

export const Markdown = (props: Parameters<typeof TinaMarkdown>[0]) => {
    return (
        <span className="markdown">
            <TinaMarkdown {...props} components={components} />
        </span>
    );
};

interface CustomComponents {
    Visualization: { title?: string };
    Image: ImageProps;
    Video: { src?: string };
    VideoYoutube: { id?: string };
    Comment: { comment?: string };
}

const components: Components<CustomComponents> = {
    // Override default markdown components
    code_block: (props) =>
        props?.lang && props.value ? (
            <Code language={props.lang}>{props.value}</Code>
        ) : (
            <div />
        ),
    img: (props) => (props ? <Image {...props} /> : <div />),
    table: (props) =>
        props ? (
            <p style={{ overflowX: 'auto' }}>
                <table className="border-collapse border border-neutral-400">
                    {props.tableRows.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className="border border-neutral-400"
                        >
                            {row.tableCells.map((cell, cellIndex) => (
                                <td
                                    key={cellIndex}
                                    className="border border-neutral-400 p-2"
                                >
                                    <TinaMarkdown content={cell.value} />
                                </td>
                            ))}
                        </tr>
                    ))}
                </table>
            </p>
        ) : (
            <div />
        ),
    // Custom components
    Visualization: (props) => <h1>{props?.title}</h1>,
    Image: (props) => (props ? <Image {...props} /> : <div />),
    Video: (props) =>
        props?.src ? (
            <video loop autoPlay playsInline muted>
                <source src={props?.src} />
            </video>
        ) : (
            <div />
        ),
    VideoYoutube: (props) =>
        props?.id ? (
            <p style={{ aspectRatio: '16 / 9' }}>
                <iframe
                    allowFullScreen
                    src={`https://www.youtube.com/embed/${props.id}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                />
            </p>
        ) : (
            <div />
        ),
    Comment: () => <></>,
};
