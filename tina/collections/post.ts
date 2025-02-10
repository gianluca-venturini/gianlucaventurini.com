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
                            name: 'title',
                            label: 'Title',
                            type: 'string',
                        },
                    ],
                },
                {
                    name: 'Image',
                    label: 'Image',
                    fields: [
                        {
                            name: 'url',
                            label: 'Source',
                            type: 'string',
                        },
                        {
                            name: 'alt',
                            label: 'Image description',
                            type: 'string',
                        },
                        {
                            name: 'maxWidth',
                            label: 'Max width',
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
                {
                    name: 'VideoYoutube',
                    label: 'VideoYoutube',
                    fields: [
                        {
                            name: 'id',
                            label: 'Youtube id',
                            type: 'string',
                        },
                        {
                            name: 'time',
                            label: 'Time',
                            type: 'number',
                        },
                    ],
                },
                {
                    name: 'Comment',
                    label: 'Comment',
                    fields: [
                        {
                            name: 'comment',
                            label: 'Comment',
                            type: 'string',
                        },
                    ],
                },
            ],
        },
    ],
} satisfies Collection;
