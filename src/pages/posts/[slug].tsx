import {
    type GetStaticPaths,
    type GetStaticProps,
    type InferGetStaticPropsType,
} from 'next';
import Image from 'next/image';
import { useTina } from 'tinacms/dist/react';

import { client } from '../../../tina/__generated__/client';
import { type PostPartsFragment } from '../../../tina/__generated__/types';
import { Markdown } from '../../components/Markdown';
import { formatDate } from '../../components/Utils';

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
            {data.post.date && (
                <h3 className="text-neutral-400">
                    {formatDate(data.post.date)}
                </h3>
            )}
            <h1 className="text-5xl font-bold mb-4">{data.post.title}</h1>
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
            return { params: { slug: x?.node?._sys.filename } };
        })
        .filter((path) => !!path) as Array<{
        params: {
            slug: string;
        };
    }>;

    return {
        paths,
        fallback: 'blocking',
    };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { data, query, variables } = await client.queries.post({
        relativePath: `${ctx.params?.slug as string}.mdx`,
    });

    return {
        props: {
            data,
            query,
            variables,
        },
    };
};
