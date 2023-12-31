import { type Collection } from 'tinacms';

export default {
    label: 'Books',
    name: 'bookshelf',
    path: 'content/bookshelf',
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
} satisfies Collection;
