import { useRef } from 'react';

export interface StrangeAttractorVizProps {
    name: string;
}

export const StrangeAttractorViz = ({ name }: StrangeAttractorVizProps) => {
    return (
        <div className="">{name}</div>
    );
};
