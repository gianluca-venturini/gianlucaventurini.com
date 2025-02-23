import {
    type GetStaticPaths,
    type GetStaticProps,
    type InferGetStaticPropsType,
} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useTina } from 'tinacms/dist/react';

import { client } from '../../../../tina/__generated__/client';
import { type PostPartsFragment } from '../../../../tina/__generated__/types';
import { Markdown } from '../../../components/Markdown';
import { formatDate } from '../../../components/Utils';

export default function Home(
    props: InferGetStaticPropsType<typeof getStaticProps>
) {
    // data passes though in production mode and data is updated to the sidebar data in edit-mode
    const { data } = useTina<{ post: PostPartsFragment }>({
        query: props.query,
        variables: props.variables,
        data: props.data,
    });

    return (
        <div>
            <Head>
                <meta name="robots" content="index, follow" />
                {data.post.title && (
                    <>
                        <title>{data.post.title}</title>
                        <meta property="og:title" content={data.post.title} />
                        <meta name="twitter:title" content={data.post.title} />
                    </>
                )}
                {data.post.snippet && (
                    <>
                        <meta
                            property="og:description"
                            content={data.post.snippet}
                        />
                        <meta
                            name="twitter:description"
                            content={data.post.snippet}
                        />
                    </>
                )}
                {data.post.cover && (
                    <>
                        <meta property="og:image" content={data.post.cover} />
                        <meta name="twitter:card" content={data.post.cover} />
                        <meta name="twitter:image" content={data.post.cover} />
                    </>
                )}
                <meta property="og:url" content="The URL of your blog post" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:creator" content="@gianlu_ventu" />
                <meta name="twitter:site" content="@gianlu_ventu" />
            </Head>
            {data.post.date && (
                <h3 className="text-neutral-400">
                    {formatDate(data.post.date)}
                </h3>
            )}
            <h1 className="text-5xl font-bold mb-4 dark:text-gray-50">
                {data.post.title}
            </h1>
            {data.post.cover && (
                <Image
                    src={data.post.cover}
                    alt={data.post.cover}
                    width={1600}
                    height={500}
                    className="mb-4"
                />
            )}
            <Markdown content={data.post.body} />
        </div>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await client.queries.postConnection();
    const paths = data.postConnection.edges
        ?.map((x) => {
            if (!x?.node?.date) {
                throw new Error(
                    `Post date is missing ${x?.node?._sys.filename}`
                );
            }
            return {
                params: {
                    slug: x?.node?._sys.filename,
                    year: new Date(x?.node?.date).getFullYear().toString(),
                },
            };
        })
        .filter((path) => !!path) as Array<{
        params: {
            slug: string;
            year: string;
        };
    }>;

    return {
        paths,
        fallback: 'blocking',
    };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    let response;
    try {
        response = await client.queries.post({
            relativePath: `${ctx.params?.year as string}/${
                ctx.params?.slug as string
            }.mdx`,
        });
    } catch (error) {
        return {
            notFound: true,
        };
    }
    const { data, query, variables } = response;

    return {
        props: {
            data,
            query,
            variables,
        },
    };
};
