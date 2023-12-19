import { type Collection } from 'tinacms';

export default {
    label: 'Books',
    name: 'books',
    path: 'content/books',
    format: 'md',
    fields: [
        {
            name: 'book',
            label: 'Book',
            type: 'object',
            list: true,
            fields: [
                {
                    name: 'title',
                    label: 'Title',
                    type: 'string',
                },
                {
                    name: 'author',
                    label: 'Author',
                    type: 'string',
                },
            ],
        },
    ],
    ui: {
        router: ({ document }) => {
            return `/books/${document._sys.filename}`;
        },
    },
} satisfies Collection;
