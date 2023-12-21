import Link from 'next/link';
import { type InferGetStaticPropsType } from 'next/types';
import { useTina } from 'tinacms/dist/react';

import { client } from '../../../tina/__generated__/client';
import { formatDate } from '../../components/Utils';

export default function PostList(
    props: InferGetStaticPropsType<typeof getStaticProps>
) {
    // data passes though in production mode and data is updated to the sidebar data in edit-mode
    const { data } = useTina({
        query: props.query,
        variables: props.variables,
        data: props.data,
    });
    const postsList = data.postConnection.edges;
    if (!postsList) {
        throw new Error('Error in fetching posts!');
    }
    return (
        <>
            <h1 className="text-5xl font-bold mb-8">Posts</h1>
            <div className="flex flex-col">
                {postsList.map((post) => (
                    <Link
                        key={post?.node?.id}
                        href={`/posts/${post?.node?._sys.filename}`}
                        className="flex flex-row gap-2"
                    >
                        <span className="text-sm whitespace-nowrap">
                            {post?.node?.title}
                        </span>
                        {post?.node?.date && (
                            <>
                                <span className="text-sm">&mdash;</span>
                                <span className="text-sm font-thin whitespace-nowrap">
                                    {formatDate(post?.node?.date)}
                                </span>
                            </>
                        )}
                    </Link>
                ))}
            </div>
        </>
    );
}

export const getStaticProps = async () => {
    const { data, query, variables } = await client.queries.postConnection({
        sort: 'date',
        last: 10,
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
