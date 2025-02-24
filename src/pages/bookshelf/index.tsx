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

    return (
        <div className="flex flex-col">
            <h1 className="text-5xl font-bold mb-8 dark:text-gray-50">
                My Bookshelf
            </h1>
            {data.bookshelf.book?.map((book) => (
                <div key={book?.title} className="flex flex-row gap-2">
                    <span className="text-sm whitespace-nowrap">
                        {book?.title}
                    </span>
                    <span className="text-sm">&mdash;</span>
                    <span className="text-sm font-thin whitespace-nowrap">
                        {book?.author}
                    </span>
                </div>
            ))}
        </div>
    );
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
