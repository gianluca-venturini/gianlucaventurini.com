import React from 'react';

interface Dimensions {
    width: string;
    height: string;
}

export interface PrismicImageProps {
    url: string;
    dimensions: Dimensions;
    round?: boolean;
}

export const PrismicImage: React.FC<PrismicImageProps> = props => {
    return <img src={removeCompression(props.url)} style={{width: props.dimensions.width, height: props.dimensions.height, borderRadius: props.round ? '50%' : undefined}} />;
}

function removeCompression(url: string) {
    // Removes all params for now
    return url.replace(/\?.*/, '');
}
