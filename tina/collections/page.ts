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
            const isInPageDir = document._sys.filename.startsWith('page/');
            if (isInPageDir) {
                return document._sys.filename === 'page/home'
                    ? '/'
                    : `/${document._sys.filename}`;
            }
            return undefined;
        },
    },
} satisfies Collection;
