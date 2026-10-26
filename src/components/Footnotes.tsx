/* eslint-disable react/prop-types */
import { type TinaMarkdown } from 'tinacms/dist/rich-text';

// Tina does not parse Markdown footnotes: `[^label]` and `[^label]: note`
// stay plain text. These helpers turn that text into footnotes.
const REFERENCE = /\[\^([^\]\s]+)\]/;
const DEFINITION = /^\[\^([^\]\s]+)\]:[ \t]*/;

interface MarkdownNode {
    type: string;
    text?: string;
    children?: MarkdownNode[];
    [key: string]: unknown;
}

export interface Footnote {
    label: string;
    number: number;
    content: MarkdownNode[];
}

type Content = Parameters<typeof TinaMarkdown>[0]['content'];

const footnoteId = (label: string) => `fn-${label}`;
const referenceId = (label: string) => `fnref-${label}`;

/**
 * Takes the notes out of the body and replaces each `[^label]` with a
 * numbered reference. A note starts with a `[^label]: text` paragraph and
 * contains all the blocks after it until the next note, so notes go at the
 * end of the post. Numbers follow the order of the first reference. A note
 * without references is not shown, and a reference without a note stays text.
 */
export function extractFootnotes(content: Content): {
    body: Content;
    footnotes: Footnote[];
} {
    const root = (
        Array.isArray(content) ? { type: 'root', children: content } : content
    ) as MarkdownNode;
    const blocks: MarkdownNode[] = [];
    const notes = new Map<string, MarkdownNode[]>();
    let note: MarkdownNode[] | undefined;
    for (const block of root.children ?? []) {
        const definition = readDefinition(block);
        if (definition) {
            note = [definition.paragraph];
            notes.set(definition.label, note);
        } else if (note) {
            note.push(block);
        } else {
            blocks.push(block);
        }
    }
    if (notes.size === 0) return { body: content, footnotes: [] };

    const numbers = new Map<string, number>();
    const body = { ...root, children: blocks.map(addReferences) };

    function addReferences(node: MarkdownNode): MarkdownNode[] | MarkdownNode {
        // Do not put a link inside a link or inside code
        if (node.type === 'a' || node.type === 'code_block') return node;
        if (node.type === 'text') {
            return node.code ? node : splitText(node);
        }
        if (!node.children) return node;
        return { ...node, children: node.children.flatMap(addReferences) };
    }

    function splitText(node: MarkdownNode): MarkdownNode[] {
        // Items at odd positions are labels: ['text ', 'label', ' more text']
        const pieces = (node.text ?? '').split(REFERENCE);
        if (pieces.length === 1) return [node];
        const parts: MarkdownNode[] = [];
        let text = '';
        pieces.forEach((piece, index) => {
            if (index % 2 === 0) {
                text += piece;
            } else if (!notes.has(piece)) {
                text += `[^${piece}]`;
            } else {
                if (text) parts.push({ ...node, text });
                text = '';
                const first = !numbers.has(piece);
                if (first) numbers.set(piece, numbers.size + 1);
                parts.push({
                    type: 'mdxJsxTextElement',
                    name: 'FootnoteReference',
                    props: { label: piece, number: numbers.get(piece), first },
                    children: [],
                });
            }
        });
        if (text) parts.push({ ...node, text });
        return parts;
    }

    const footnotes = Array.from(numbers, ([label, number]) => ({
        label,
        number,
        content: addBackLink(notes.get(label) ?? [], label),
    })).sort((a, b) => a.number - b.number);

    return { body: body as unknown as Content, footnotes };
}

function readDefinition(block: MarkdownNode) {
    const first = block.children?.[0];
    if (block.type !== 'p' || first?.type !== 'text') return;
    const match = DEFINITION.exec(first.text ?? '');
    if (!match) return;
    const rest = (first.text ?? '').slice(match[0].length);
    const children = block.children?.slice(1) ?? [];
    return {
        label: match[1],
        paragraph: {
            ...block,
            children: rest ? [{ ...first, text: rest }, ...children] : children,
        },
    };
}

// Put the back link at the end of the last line of text of the note
function addBackLink(note: MarkdownNode[], label: string) {
    const backLink: MarkdownNode = {
        type: 'mdxJsxTextElement',
        name: 'FootnoteBackLink',
        props: { label },
        children: [],
    };
    const last = note[note.length - 1];
    const lastWithLink = last && appendToLastLine(last, backLink);
    return lastWithLink
        ? [...note.slice(0, -1), lastWithLink]
        : [...note, { type: 'p', children: [backLink] }];
}

function appendToLastLine(
    node: MarkdownNode,
    inline: MarkdownNode
): MarkdownNode | undefined {
    const children = node.children ?? [];
    if (node.type === 'p' || node.type === 'lic') {
        return { ...node, children: [...children, inline] };
    }
    const last = children[children.length - 1];
    if (!['ul', 'ol', 'li'].includes(node.type) || !last) return;
    const lastWithInline = appendToLastLine(last, inline);
    return (
        lastWithInline && {
            ...node,
            children: [...children.slice(0, -1), lastWithInline],
        }
    );
}

export const FootnoteReference = (props: {
    label: string;
    number: number;
    first: boolean;
}) => (
    <sup
        id={props.first ? referenceId(props.label) : undefined}
        className="footnote-reference"
    >
        <a href={`#${footnoteId(props.label)}`}>{props.number}</a>
    </sup>
);

export const FootnoteBackLink = (props: { label: string }) => (
    <>
        {' '}
        <a
            href={`#${referenceId(props.label)}`}
            aria-label="Back to the text"
            className="footnote-back-link"
        >
            {/* The variation selector shows the arrow as text, not as emoji */}
            {'↩︎'}
        </a>
    </>
);

export const FootnoteList = (props: {
    footnotes: Footnote[];
    renderNote: (content: MarkdownNode[]) => React.ReactNode;
}) => (
    <section className="footnotes">
        <h2>Footnotes</h2>
        <ol>
            {props.footnotes.map((footnote) => (
                <li key={footnote.label} id={footnoteId(footnote.label)}>
                    {props.renderNote(footnote.content)}
                </li>
            ))}
        </ol>
    </section>
);
