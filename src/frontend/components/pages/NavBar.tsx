import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { prismic } from '../../services';

interface NavBarProps extends RouteComponentProps<{}> {}

interface NavBarState {
    pages: any[]
}

export class NavBar extends React.Component<NavBarProps, NavBarState> {

    constructor(props: NavBarProps) {
        super(props);
        this.state = {
            pages: null
        };
    }

    componentDidMount() {
        this.loadPageList();
    }

    render() {
        const {pages} = this.state;
        return (
            <div>
                {pages?.map(page => <Link key={page.data.route} to={page.data.route}><div>{page.data.title[0].text}</div></Link>)}
            </div>
        );
    }

    private async loadPageList() {
        const pages = await prismic.getPages();
        this.setState({pages});
    }

}