import * as React from 'react';
import { LottieIcon } from './LottieIcon';
import twitterIconData from './animations/twitter.json'
import githubIconData from './animations/github.json'

interface LottieIconProps {
    height: number;
    width: number;
    animationData: object;
    href: string;
}

const LottieLinkIcon: React.FC<LottieIconProps> = ({ href, ...rest }) => {
    return (
        <LottieIcon
            {...rest}
            onClick={() => window.open(href)}
        />
    );
}

export const TwitterIcon: React.FC<{}> = () => {
    return (
        <LottieLinkIcon
            height={64}
            width={64}
            animationData={twitterIconData}
            href="https://twitter.com/gianlu_ventu"
        />
    );
}

export const GithubIcon: React.FC<{}> = () => {
    return (
        <LottieLinkIcon
            height={64}
            width={64}
            animationData={githubIconData}
            href="https://github.com/gianluca-venturini"
        />
    );
}
