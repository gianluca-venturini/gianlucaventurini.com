import React from 'react'
import { Helmet } from 'react-helmet'

export interface MetaProps {
    title: string;
    description: string;
    pathname: string;
}

export const Meta: React.FC<MetaProps> = props => {
    const { title, description, pathname } = props;

    return (
        <div className="application">
            <Helmet>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content="Gianluca Venturini Software Engineer" />
                <meta name="author" content="Gianluca Venturini"></meta>
                <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
                <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
                <link rel="canonical" href={`https://gianlucaventurini.com/${pathname.toLowerCase()}`} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:creator" content="@gianlu_ventu" />
                <meta name="twitter:site" content="@gianlu_ventu" />
                <meta property="og:site_name" content="Gianluca Venturini" />
                <meta property="og:url" content="https://gianlucaventurini.com" />
                <meta property="og:title" content="Gianluca Venturini" />
                <meta property="og:description" content={description} />
                <meta property="og:image" content="https://images.prismic.io/gianlucaventurini/647363bf-0035-4794-ac75-06a1130213da_gray+scale+white+shirt+contour+small.png" />
                <meta property="og:image:width" content="320" />
                <meta property="og:image:height" content="320" />
            </Helmet>
        </div>
    )
}