import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { prismic } from '../../services';
import { Page } from './Page';


interface BookshelfProps extends RouteComponentProps<{}> {}

export class Bookshelf extends React.Component<BookshelfProps> {
    
    componentDidMount() {
        this.loadContent();
    }
    
    render() {
        return <Page {...this.props}>Bookshelf</Page>;
    }
    
    private async loadContent() {
        console.log(await prismic.getBookshelf());
    }
 
}