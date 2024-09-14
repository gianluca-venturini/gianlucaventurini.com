import { type Collection } from 'tinacms';

/**
 * @type {import('tinacms').Collection}
 */
export default {
    label: 'Blog Posts',
    name: 'post',
    path: 'content/post',
    format: 'mdx',
    fields: [
        {
            type: 'string',
            label: 'Title',
            name: 'title',
        },
        {
            type: 'string',
            label: 'Snippet',
            name: 'snippet',
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
            templates: [
                {
                    name: 'Visualization',
                    label: 'Visualization',
                    fields: [
                        {
                            name: 'id',
                            label: 'Id',
                            type: 'string',
                        },
                    ],
                },
                {
                    name: 'Video',
                    label: 'Video',
                    fields: [
                        {
                            name: 'src',
                            label: 'Source',
                            type: 'string',
                        },
                    ],
                },
            ],
        },
    ],
} satisfies Collection;
