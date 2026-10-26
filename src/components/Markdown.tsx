/* eslint-disable react/prop-types */
import { useMemo } from 'react';

import { type Components, TinaMarkdown } from 'tinacms/dist/rich-text';

import { Code } from './Code';
import {
    extractFootnotes,
    FootnoteBackLink,
    FootnoteList,
    FootnoteReference,
} from './Footnotes';
import { Image, type ImageProps } from './Image';
import { PreviewLink } from './LinkPreview';

export const Markdown = (props: Parameters<typeof TinaMarkdown>[0]) => {
    const { body, footnotes } = useMemo(
        () => extractFootnotes(props.content),
        [props.content]
    );
    return (
        <span className="markdown">
            <TinaMarkdown content={body} components={components} />
            {footnotes.length > 0 && (
                <FootnoteList
                    footnotes={footnotes}
                    renderNote={(content) => (
                        <TinaMarkdown
                            content={content as any}
                            components={components}
                        />
                    )}
                />
            )}
        </span>
    );
};

interface CustomComponents {
    Visualization: { title?: string };
    Image: ImageProps;
    Video: { src?: string };
    VideoYoutube: { id?: string; time?: number };
    Comment: { comment?: string };
    FootnoteReference: { label: string; number: number; first: boolean };
    FootnoteBackLink: { label: string };
}

const components: Components<CustomComponents> & any = {
    // Override default markdown components
    code_block: (props: any) =>
        props?.lang && props.value ? (
            <Code language={props.lang}>{props.value}</Code>
        ) : (
            <div />
        ),
    img: (props: any) => (props ? <Image {...props} /> : <div />),
    a: (props: any) => (
        <PreviewLink url={props?.url}>{props?.children}</PreviewLink>
    ),
    table: (props: any) =>
        props ? (
            <div style={{ overflowX: 'auto' }} className="mb-6">
                <table className="border-collapse border border-neutral-400">
                    {props.children ||
                        props.tableRows?.map((row: any, rowIndex: number) => (
                            <tr
                                key={rowIndex}
                                className="border border-neutral-400"
                            >
                                {row.tableCells?.map(
                                    (cell: any, cellIndex: number) => (
                                        <td
                                            key={cellIndex}
                                            className="border border-neutral-400 p-2"
                                        >
                                            <TinaMarkdown
                                                content={cell.value}
                                            />
                                        </td>
                                    )
                                ) || null}
                            </tr>
                        ))}
                </table>
            </div>
        ) : (
            <div />
        ),
    // Custom components
    Visualization: (props: any) => <h1>{props?.title}</h1>,
    Image: (props: any) => (props ? <Image {...props} /> : <div />),
    Video: (props: any) =>
        props?.src ? (
            <video loop autoPlay playsInline muted>
                <source src={props?.src} />
            </video>
        ) : (
            <div />
        ),
    VideoYoutube: (props: any) =>
        props?.id ? (
            <p style={{ aspectRatio: '16 / 9' }}>
                <iframe
                    allowFullScreen
                    src={`https://www.youtube.com/embed/${props.id}?start=${props.time}`}
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
    FootnoteReference: (props: any) => <FootnoteReference {...props} />,
    FootnoteBackLink: (props: any) => <FootnoteBackLink {...props} />,
};
