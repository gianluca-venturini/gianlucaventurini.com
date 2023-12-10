import { tinaField, useTina } from 'tinacms/dist/react';
import { Layout } from '../components/Layout';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { client } from '../../tina/__generated__/client';
import { type InferGetStaticPropsType } from 'next/types';

export default function Home(
    props: InferGetStaticPropsType<typeof getStaticProps>
) {
    // data passes though in production mode and data is updated to the sidebar data in edit-mode
    const { data } = useTina({
        query: props.query,
        variables: props.variables,
        data: props.data,
    });

    const content = data.page.body;
    return (
        <div data-tina-field={tinaField(data.page, 'body')}>
            <TinaMarkdown content={content} />
        </div>
    );
}

export const getStaticProps = async () => {
    const { data, query, variables } = await client.queries.page({
        relativePath: 'home.mdx',
    });

    return {
        props: {
            data,
            query,
            variables,
            // myOtherProp: 'some-other-data',
        },
    };
};
