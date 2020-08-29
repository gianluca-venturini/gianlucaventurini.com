import React from 'react'
import styled from 'styled-components';
import { PageProps } from 'gatsby';
import { GUTTERS } from './Styles';
import { Hamburger } from './Hamburger';

interface NavCommonProps {
    isNavOpen: boolean;
}

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

const NavigationBackground = styled.div<NavCommonProps>`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    pointer-events: none;
    transition: opacity 0.2s ease-out;
    background: #fff;
    opacity: ${props => props.isNavOpen ? 1 : 0};
`;

const HamburgerWrapper = styled.div`
    display: flex;
    flex-direction: row-reverse;

    @media (min-width: ${props => props.theme.width.tablet}) {
        display: none;
    }
`;

const LinksContainer = styled.div<NavCommonProps>`
    position: relative;
    opacity: ${props => props.isNavOpen ? 1 : 0};
    transition: opacity 0.2s ease-out;

    @media (min-width: ${props => props.theme.width.tablet}) {
        opacity: 1;
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

    const [isNavOpen, setNavOpen] = React.useState(false);

    return (
        <NavigationWrapper onClick={() => setNavOpen(!isNavOpen)}>
            <NavigationBackground isNavOpen={isNavOpen} />
            <HamburgerWrapper>
                <Hamburger isNavOpen={isNavOpen} onClick={() => setNavOpen(!isNavOpen)} />
            </HamburgerWrapper>
            <LinksContainer isNavOpen={isNavOpen}>
                <h1><PageLink href='/' location={props.location}>Gianluca Venturini</PageLink></h1> {/* H1 used for SEO purposes */}
                <PageLink href='/bookshelf' location={props.location}>Bookshelf</PageLink>
            </LinksContainer>
        </NavigationWrapper>
    )
}

const PageLink: React.FC<{ href: string, location: PageProps['location'] }> = props => {
    const normalizedPathname = props.location.pathname.length === 1 ? props.location.pathname : props.location.pathname.replace(/\/$/, '');

    function click(e: React.MouseEvent<HTMLAnchorElement>) {
        // Manually trigger the redirect to give enough time to the animation to finish
        e.preventDefault();
        const link = e.currentTarget.href;
        setTimeout(() => {
            window.location.replace(link);
        }, 500);
    }

    return (
        <LinkWrapper onClick={click} href={props.href} current={normalizedPathname === props.href} style={{ lineHeight: `48px`, marginBottom: GUTTERS.xsmall }}>
            {props.children}
        </LinkWrapper>
    );
};
