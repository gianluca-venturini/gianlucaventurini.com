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
            return undefined;
        },
    },
} satisfies Collection;
