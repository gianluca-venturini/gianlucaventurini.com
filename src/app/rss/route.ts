import client from '../../../tina/__generated__/client';
import { BASE_URL } from '../../constants';

export const GET = async () => {
    const { data } = await client.queries.postConnection({
        sort: 'date',
        last: 10,
    });

    const posts = data.postConnection.edges
        ?.map((e) => e?.node)
        .filter((n) => !!n);

    const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
    <channel>
    <title>Gianluca Venturini RSS Feed</title>
    <link>${BASE_URL}</link>
    <description>Gianluca Venturini's personal blog</description>
${posts
    ?.map(
        (p) => `    <item>
        <title>${p?.title}</title>
        <link>${BASE_URL}/posts/${p?._sys.filename}</link>
        <description>${p?.snippet}</description>
        <author>Gianluca Venturini</author>
        <pubDate>${new Date(p?.date ?? '').toUTCString()}</pubDate>
    </item>`
    )
    .join('\n')}
    </channel>
</rss>`;

    return new Response(rssFeed, {
        headers: {
            'Content-Type': 'text/xml',
        },
    });
};
