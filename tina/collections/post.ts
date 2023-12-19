import { type Collection } from 'tinacms';

/**
 * @type {import('tinacms').Collection}
 */
export default {
    label: 'Blog Posts',
    name: 'post',
    path: 'content/post',
    fields: [
        {
            type: 'string',
            label: 'Title',
            name: 'title',
        },
        {
            type: 'image',
            label: 'Cover Image',
            name: 'cover',
        },
        {
            type: 'datetime',
            label: 'Date Publish',
            name: 'date',
        },
        {
            type: 'rich-text',
            label: 'Blog Post Body',
            name: 'body',
            isBody: true,
        },
    ],
    ui: {
        router: ({ document }) => {
            return `/posts/${document._sys.filename}`;
        },
    },
} satisfies Collection;
