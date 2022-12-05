import React from 'react'
import { Helmet } from 'react-helmet'
import { PageProps } from 'gatsby';
import { AUTHOR } from './Constants';

export interface MetaProps {
    title: string;
    description: string;
    location: PageProps['location'];
}

export const Meta: React.FC<MetaProps> = props => {
    const { title, description } = props;

    return (
        <div className="application">
            <Helmet>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={`${AUTHOR} Software Engineer`} />
                <meta name="author" content={AUTHOR}></meta>
                <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
                <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:creator" content="@gianlu_ventu" />
                <meta name="twitter:site" content="@gianlu_ventu" />
                <meta property="og:site_name" content={AUTHOR} />
                <meta property="og:url" content="https://gianlucaventurini.com" />
                <meta property="og:title" content={AUTHOR} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content="https://images.prismic.io/gianlucaventurini/36e634b9-ab07-4657-a146-a1a3a1627a8b_paint_0-1.png" />
                <meta property="og:image:width" content="320" />
                <meta property="og:image:height" content="320" />
            </Helmet>
        </div>
    )
}