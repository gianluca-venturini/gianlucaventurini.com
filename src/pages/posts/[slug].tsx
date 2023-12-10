import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { useTina } from 'tinacms/dist/react';
import { client } from '../../../tina/__generated__/client';
import {
    type GetStaticPaths,
    type GetStaticProps,
    type InferGetStaticPropsType,
} from 'next';
import { Layout } from '../../components/Layout';

export default function Home(
    props: InferGetStaticPropsType<typeof getStaticProps>
) {
    // data passes though in production mode and data is updated to the sidebar data in edit-mode
    const { data } = useTina({
        query: props.query,
        variables: props.variables,
        data: props.data,
    });

    const content = data.post.body;
    return <TinaMarkdown content={content} />;
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
        relativePath: `${ctx.params?.slug as string}.md`,
    });

    return {
        props: {
            data,
            query,
            variables,
        },
    };
};
