import Link from 'next/link';
import { type InferGetStaticPropsType } from 'next/types';
import { useTina } from 'tinacms/dist/react';

import { client } from '../../../tina/__generated__/client';

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
            <h1>Posts</h1>
            <div>
                {postsList.map((post) => (
                    <div key={post?.node?.id}>
                        <Link href={`/posts/${post?.node?._sys.filename}`}>
                            {post?.node?._sys.filename}
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}

export const getStaticProps = async () => {
    const { data, query, variables } = await client.queries.postConnection();

    return {
        props: {
            data,
            query,
            variables,
            // myOtherProp: 'some-other-data',
        },
    };
};
