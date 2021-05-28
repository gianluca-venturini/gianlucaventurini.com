import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { renderSlice } from '../slices/SliceUtil';
import { Page } from './Page';
import { PrismicPage } from './PageJson';

interface BookshelfProps extends RouteComponentProps<{}> {
    page: PrismicPage;
}

export const BookshelfPage: React.FC<BookshelfProps> = props => {
    const { page, ...rest } = props;
    const slices = page?.data?.body;
    return (
        <Page {...rest}>
            Bookshelf
            {slices?.map(slice => renderSlice(slice))}
        </Page>
    );
}
