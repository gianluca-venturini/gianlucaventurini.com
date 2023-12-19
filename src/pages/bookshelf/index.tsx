import { type InferGetStaticPropsType } from 'next/types';
import { useTina } from 'tinacms/dist/react';

import { client } from '../../../tina/__generated__/client';

export default function Bookshelf(
    props: InferGetStaticPropsType<typeof getStaticProps>
) {
    // data passes though in production mode and data is updated to the sidebar data in edit-mode
    const { data } = useTina({
        query: props.query,
        variables: props.variables,
        data: props.data,
    });

    return <div>{JSON.stringify(data)}</div>;
}

export const getStaticProps = async () => {
    const { data, query, variables } = await client.queries.bookshelf({
        relativePath: 'bookshelf.md',
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
