import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Page } from './Page';
import { PrismicPage } from './PageJson';

interface HomePageProps extends RouteComponentProps<{}> {
    page: PrismicPage
}

export const HomePage: React.FC<HomePageProps> = props => {
    return (
        <Page {...props}>Home</Page>
    );
}
