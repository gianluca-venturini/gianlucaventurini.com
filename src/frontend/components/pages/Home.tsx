import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Page } from './Page';

interface HomeProps extends RouteComponentProps<{}> {}

export class Home extends React.Component<HomeProps> {

    render() {
        return <Page {...this.props}>Home</Page>;
    }

}