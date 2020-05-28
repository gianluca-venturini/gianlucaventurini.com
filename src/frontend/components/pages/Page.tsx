import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { NavBar } from './NavBar';

interface PageProps extends RouteComponentProps<{}> {}

export class Page extends React.Component<PageProps> {

    render() {
        const {children, ...rest} = this.props;
        return (<>{children}<NavBar {...rest} /></>);
    }

}