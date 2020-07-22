import React from 'react'
import styled from 'styled-components';
import { PageProps } from 'gatsby';
import { GUTTERS } from './Styles';

const NavigationWrapper = styled.div`
    position: absolute;
    right: 40px;
    top: 40px;
    
    display: flex;
    flex-direction: column;
    justify-content: end;

    font-size: 13px;
    line-height: 16px;
    text-align: end;
    color: ${props => props.theme.colors.mainText};
    
    cursor: pointer;
    
    a:link, a:visited {
        text-decoration: none;
    }

    *:hover {
        font-weight: 600;
    }
    
    
`;
    
interface LinkWrapperProps {
    current: boolean;
}

const LinkWrapper = styled.a<LinkWrapperProps>`
    font-weight: ${props => props.current ? '600' : '400'};
    color: ${props => props.current ? props.theme.colors.redText : props.theme.colors.mainText};
`;

export interface NavigationProps {
    location: PageProps['location'];
}

export const Navigation: React.FC<NavigationProps> = props => {

    return (
        <NavigationWrapper>
            <h1><PageLink href='/' location={props.location}>Gianluca Venturini</PageLink></h1> {/* H1 used for SEO purposes */}
            <PageLink href='/bookshelf' location={props.location}>Bookshelf</PageLink>
        </NavigationWrapper>
    )
}

const PageLink: React.FC<{href: string, location: PageProps['location'] }> = props => {
    const normalizedPathname = props.location.pathname.length === 1 ? props.location.pathname : props.location.pathname.replace(/\/$/, '');
    return <LinkWrapper href={props.href} current={normalizedPathname === props.href} style={{lineHeight: `48px`, marginBottom: GUTTERS.xsmall}}>{props.children}</LinkWrapper>
};
