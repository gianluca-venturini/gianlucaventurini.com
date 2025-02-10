import { type GetStaticPaths, type GetStaticProps } from 'next';

import { client } from '../../../tina/__generated__/client';

export default function RedirectPage() {
    return null; // This page should never be rendered due to redirects
}

const YEARS_BEFORE_MIGRATION = ['2025', '2024', '2023', '2022'];

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const slug = params?.year as string;

    for (const year of YEARS_BEFORE_MIGRATION) {
        try {
            // Fetch post data using the guessed year
            const { data } = await client.queries.post({
                relativePath: `${year}/${slug}.mdx`,
            });
            const post = data?.post;
            // If post or year is not found, return a 404 page
            if (!post?.date) {
                return {
                    notFound: true,
                };
            }
            // Redirect to the correct path with the year and slug
            return {
                redirect: {
                    destination: `/blog/${new Date(post?.date)
                        .getFullYear()
                        .toString()}/${slug}`,
                    permanent: true,
                },
            };
        } catch (error) {
            // Post wasn't found, continue iterating
        }
    }

    // Nothing was found
    return {
        notFound: true,
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    // Optionally, you can pre-generate paths if you want
    return {
        paths: [],
        fallback: 'blocking',
    };
};
