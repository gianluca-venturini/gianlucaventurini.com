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
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={url}
                    alt={alt}
                    style={{
                        maxHeight: '50vh',
                        width: maxWidth ?? 'auto',
                        objectFit: 'contain',
                    }}
                />
            ) : null}
            <span className="text-sm text-neutral-400">{alt}</span>
        </span>
    );
};
