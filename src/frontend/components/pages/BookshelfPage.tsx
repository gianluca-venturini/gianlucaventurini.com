import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { prismic } from '../../services';
import { renderSlice } from '../slices/SliceUtil';
import { Page } from './Page';
import { PrismicPage } from './PageJson';


interface BookshelfProps extends RouteComponentProps<{}> {}

interface BookshelfState {
    page: PrismicPage;
}

export class BookshelfPage extends React.Component<BookshelfProps, BookshelfState> {

    constructor(props: BookshelfProps) {
        super(props);
        this.state = {
            page: null
        }
    }
    
    componentDidMount() {
        this.loadContent();
    }
    
    render() {
        const {page} = this.state;
        const slices = page?.data?.body;
        return (
            <Page {...this.props}>
                Bookshelf
                {slices?.map(slice => renderSlice(slice))}
            </Page>
        );
    }
    
    private async loadContent() {
        const response = await prismic.getBookshelf();
        const page = response.results[0] as PrismicPage;
        console.log(page);
        this.setState({page})
    }
 
}