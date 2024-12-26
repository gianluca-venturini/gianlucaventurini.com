import React from 'react';

export interface ImageProps {
    url?: string;
    alt?: string;
    maxWidth?: string;
}

export const Image = ({ url, alt, maxWidth }: ImageProps) => {
    return (
        <span className="flex flex-col items-center">
            {url ? (
                <img
                    src={url}
                    alt={alt}
                    style={{
                        maxHeight: '50vh',
                        width: !!maxWidth ? maxWidth : 'auto',
                        objectFit: 'contain',
                    }}
                />
            ) : null}
            <span className="text-sm text-neutral-400">{alt}</span>
        </span>
    );
};