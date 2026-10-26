import type { NextApiRequest, NextApiResponse } from 'next';
import { lookup } from 'node:dns/promises';
import { isIP } from 'node:net';

import {
    type LinkPreviewData,
    parseLinkPreview,
} from '../../components/LinkPreviewMeta';

const USER_AGENT =
    'Mozilla/5.0 (compatible; GianlucaVenturiniLinkPreview/1.0; +https://gianlucaventurini.com)';
const MAX_HTML_BYTES = 512 * 1024;
const MAX_REDIRECTS = 3;
const TIMEOUT_MS = 5000;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method Not Allowed' });
        return;
    }

    let url: URL;
    try {
        url = new URL(String(req.query.url));
    } catch {
        res.status(400).json({ error: 'Invalid url' });
        return;
    }

    try {
        const preview =
            (await fetchWikipediaPreview(url)) ?? (await fetchPagePreview(url));
        res.setHeader(
            'Cache-Control',
            'public, s-maxage=86400, stale-while-revalidate=604800'
        );
        res.status(200).json(preview);
    } catch (error) {
        res.setHeader('Cache-Control', 'public, s-maxage=3600');
        res.status(404).json({ error: 'Preview not available' });
    }
}

// Wikipedia pages have no description meta tag, but the REST API gives a summary.
async function fetchWikipediaPreview(
    url: URL
): Promise<LinkPreviewData | undefined> {
    const host = /^([a-z-]+)\.(?:m\.)?wikipedia\.org$/.exec(url.hostname);
    const page = /^\/wiki\/(.+)$/.exec(url.pathname);
    if (!host || !page) return undefined;

    const response = await fetchWithTimeout(
        `https://${host[1]}.wikipedia.org/api/rest_v1/page/summary/${page[1]}`
    );
    if (!response.ok) return undefined;
    const summary = await response.json();
    return {
        url: url.toString(),
        title: summary.title,
        description: summary.extract,
        image: summary.thumbnail?.source,
        siteName: 'Wikipedia',
    };
}

async function fetchPagePreview(url: URL): Promise<LinkPreviewData> {
    // Follow redirects by hand, so that each hop is checked to be a public address
    for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
        await assertPublicUrl(url);
        const response = await fetchWithTimeout(url.toString(), {
            redirect: 'manual',
        });
        const location = response.headers.get('location');
        if (response.status >= 300 && response.status < 400 && location) {
            url = new URL(location, url);
            continue;
        }
        if (!response.ok) throw new Error(`Status ${response.status}`);
        if (!response.headers.get('content-type')?.includes('text/html')) {
            throw new Error('Not an HTML page');
        }
        return parseLinkPreview(await readHead(response), url.toString());
    }
    throw new Error('Too many redirects');
}

async function fetchWithTimeout(url: string, init: RequestInit = {}) {
    return await fetch(url, {
        ...init,
        headers: { 'User-Agent': USER_AGENT, Accept: 'text/html,*/*' },
        signal: AbortSignal.timeout(TIMEOUT_MS),
    });
}

// Reads the HTML until the end of <head>, where the metadata is.
async function readHead(response: Response) {
    const reader = response.body?.getReader();
    if (!reader) return '';
    const decoder = new TextDecoder();
    let html = '';
    let bytes = 0;
    while (bytes < MAX_HTML_BYTES) {
        const { done, value } = await reader.read();
        if (done) break;
        bytes += value.length;
        html += decoder.decode(value, { stream: true });
        if (/<\/head>/i.test(html)) break;
    }
    await reader.cancel();
    return html;
}

async function assertPublicUrl(url: URL) {
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        throw new Error('Unsupported protocol');
    }
    const hostname = url.hostname.replace(/^\[|\]$/g, '');
    const addresses = isIP(hostname)
        ? [hostname]
        : (await lookup(hostname, { all: true })).map((a) => a.address);
    if (addresses.some(isPrivateAddress)) {
        throw new Error('Private address');
    }
}

function isPrivateAddress(address: string) {
    const ipv4 = /^(?:::ffff:)?(\d+)\.(\d+)\.\d+\.\d+$/i.exec(address);
    if (ipv4) {
        const [a, b] = [Number(ipv4[1]), Number(ipv4[2])];
        return (
            a === 0 ||
            a === 10 ||
            a === 127 ||
            (a === 100 && b >= 64 && b <= 127) ||
            (a === 169 && b === 254) ||
            (a === 172 && b >= 16 && b <= 31) ||
            (a === 192 && b === 168) ||
            a >= 224
        );
    }
    const lower = address.toLowerCase();
    return (
        lower === '::' ||
        lower === '::1' ||
        /^f[cd]/.test(lower) ||
        /^fe[89ab]/.test(lower)
    );
}
