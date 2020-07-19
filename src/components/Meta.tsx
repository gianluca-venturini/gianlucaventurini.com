import React from 'react'
import { Helmet } from 'react-helmet'

export interface MetaProps {
    title: string;
    description: string;
}

export const Meta: React.FC<MetaProps> = props => {
    const { title, description } = props;

    return (
        <div className="application">
            <Helmet>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="description" content={description}></meta>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
        </div>
    )
}