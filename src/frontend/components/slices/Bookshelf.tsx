import { RichText, RichTextBlock } from 'prismic-reactjs';
import * as React from 'react';
import { PrismicSlice } from './SliceJson';

interface BookshelfItem {
    book_description: RichTextBlock;
    book_title: RichTextBlock;
}

type BookshelfSlice = PrismicSlice<'bookshelf', BookshelfItem>;

interface BookshelfProps {
    slice: BookshelfSlice;
}

export class Bookshelf extends React.Component<BookshelfProps> {

    render() {
        const {slice} = this.props;
        console.log('HERE', slice);
        return (
            <div>
                {
                    slice.items.map(item => (
                        <div>
                            <div>
                                <RichText render={item.book_title} />
                            </div>
                            <div>
                                <RichText render={item.book_description} />
                            </div>
                        </div>
                    ))
                }
            </div>
        );
    }

}