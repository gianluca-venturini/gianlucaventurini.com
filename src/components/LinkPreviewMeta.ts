export interface LinkPreviewData {
    url: string;
    title?: string;
    description?: string;
    image?: string;
    siteName?: string;
}

const ENTITIES: Record<string, string> = {
    amp: '&',
    lt: '<',
    gt: '>',
    quot: '"',
    apos: "'",
    nbsp: ' ',
};

function decodeEntities(text: string) {
    return text.replace(
        /&(#x[0-9a-f]+|#\d+|[a-z]+);/gi,
        (match, code: string) => {
            if (code[0] === '#') {
                const n =
                    code[1].toLowerCase() === 'x'
                        ? parseInt(code.slice(2), 16)
                        : parseInt(code.slice(1), 10);
                return isNaN(n) ? match : String.fromCodePoint(n);
            }
            return ENTITIES[code.toLowerCase()] ?? match;
        }
    );
}

function clean(text?: string) {
    const value = text && decodeEntities(text).replace(/\s+/g, ' ').trim();
    return value === '' ? undefined : value;
}

// Reads Open Graph, Twitter and plain HTML metadata from a page.
// Works on the server and in the browser, so it uses regexes and not DOMParser.
export function parseLinkPreview(html: string, url: string): LinkPreviewData {
    const meta: Record<string, string> = {};
    for (const [tag] of Array.from(html.matchAll(/<meta\s[^>]*>/gi))) {
        const key = /(?:property|name)\s*=\s*["']([^"']+)["']/i.exec(tag)?.[1];
        const content = /content\s*=\s*(?:"([^"]*)"|'([^']*)')/i.exec(tag);
        if (key && content && !(key.toLowerCase() in meta)) {
            meta[key.toLowerCase()] = content[1] ?? content[2];
        }
    }
    const title = /<title[^>]*>([^<]*)<\/title>/i.exec(html)?.[1];
    const image = clean(meta['og:image'] ?? meta['twitter:image']);

    return {
        url,
        title: clean(meta['og:title'] ?? meta['twitter:title'] ?? title),
        description: clean(
            meta['og:description'] ??
                meta['twitter:description'] ??
                meta.description
        ),
        image: image && new URL(image, url).toString(),
        siteName: clean(meta['og:site_name']),
    };
}
