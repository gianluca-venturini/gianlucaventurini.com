import React from 'react';
import { GUTTERS } from './Styles';
import { Typography, FONTS } from './Typography';
import { COLORS } from './Theme';

interface ImageProps {
    url: string;
    alt?: string;
    description?: string;
    dimensions: {
        width: number;
        height: number;
    }
}

export const Image: React.FC<ImageProps> = ({ url, alt, description, dimensions }) => {
    return (
        <div style={{ marginTop: GUTTERS.medium, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: GUTTERS.small }}>
            <img 
                style={{ 
                    maxWidth: `min(${dimensions.width / 2}px, calc(var(--page-max-width) - 20px))`,
                    maxHeight: dimensions.height / 2,
                    width: 'auto',
                    height: 'auto', 
                }} 
                src={url}
                alt={alt}
            />
            {!!description && <Typography variant={FONTS.body.small} color={COLORS.text.light} align="center">{description}</Typography>}
        </div>
    )
};