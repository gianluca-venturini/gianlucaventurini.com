import { makeStyles } from '@material-ui/styles';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import * as React from 'react';
import { PrismicSlice } from './SliceJson';

interface BookshelfItem {
    book_description: RichTextBlock;
    book_title: RichTextBlock;
}

type BookshelfSlice = PrismicSlice<'bookshelf', BookshelfItem>;

const styles = makeStyles({
    root: {
        '&:hover': {
            color: 'red'
        },
        '@media only screen and (max-width: 600px)': {
            backgroundColor: 'red'
        }
    },
    description: {
        '& strong': {
            color: 'blue'
        }
    }
});

interface BookshelfProps {
    slice: BookshelfSlice;
}

export const Bookshelf: React.FC<BookshelfProps> = props => {
    
    const {slice} = props;
    const classes = styles();
    return (
        <div>
            {
                slice.items.map(item => (
                    <div className={classes.root}>
                        <div>
                            <RichText render={item.book_title} />
                        </div>
                        <div className={classes.description}>
                            <RichText render={item.book_description} />
                        </div>
                    </div>
                ))
            }
        </div>
    );

}