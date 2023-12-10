import { type Collection } from 'tinacms';

export default {
    label: 'Page',
    name: 'page',
    path: 'content/page',
    format: 'mdx',
    fields: [
        {
            name: 'body',
            label: 'Main Content',
            type: 'rich-text',
            isBody: true,
        },
    ],
    ui: {
        router: ({ document }) => {
            if (document._sys.filename === 'lol') {
                return `/`;
            }
            return undefined;
        },
    },
} satisfies Collection;