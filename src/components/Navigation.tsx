import React from 'react'
import styled from 'styled-components';
import { Link, PageProps } from 'gatsby';
import { GUTTERS } from './Styles';
import { Hamburger } from './Hamburger';
import { AUTHOR } from './Constants';

interface NavCommonProps {
    isNavOpen: boolean;
}

const NavigationWrapper = styled.div`
    position: fixed;
    z-index: 1;

    right: 40px;
    top: 40px;
    
    @media (max-width: ${props => props.theme.width.phone}) {
        right: 20px;
        top: 20px;
    }

    display: flex;
    flex-direction: column;
    justify-content: end;

    font-size: 13px;
    line-height: 16px;
    text-align: end;
    color: ${props => props.theme.colors.mainText};
    
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
    backdrop-filter: blur(10px);
    display: ${props => props.isNavOpen ? 'block' : 'none'};
    @media (min-width: ${props => props.theme.width.tablet}) {
        display: none;
    }
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
    display: ${props => props.isNavOpen ? 'block' : 'none'};

    @media (min-width: ${props => props.theme.width.tablet}) {
        display: block;
    }
`;

interface LinkWrapperProps {
    current: boolean;
}

const LinkWrapper = styled.div<LinkWrapperProps>`
    a {
        font-weight: ${props => props.current ? '600' : '400'};
        color: ${props => props.current ? props.theme.colors.redText : props.theme.colors.mainText};
        cursor: pointer;
    }
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
                <h1><PageLink href='/' location={props.location}>{AUTHOR}</PageLink></h1> {/* H1 used for SEO purposes */}
                <PageLink href='/bookshelf' location={props.location}>Bookshelf</PageLink>
                <PageLink href='/blog' location={props.location}>Blog</PageLink>
            </LinksContainer>
        </NavigationWrapper>
    )
}

const PageLink: React.FC<{ href: string, location: PageProps['location'], children?: React.ReactNode }> = props => {
    const normalizedPathname = props.location.pathname.length === 1 ? props.location.pathname : props.location.pathname.replace(/\/$/, '');

    function click(e: React.MouseEvent<HTMLDivElement>) {
        e.preventDefault();
    }

    return (
        <LinkWrapper onClick={click} current={normalizedPathname === props.href} style={{ lineHeight: `48px`, marginBottom: GUTTERS.xsmall }}>
            <Link to={props.href}>
                {props.children}
            </Link>
        </LinkWrapper>
    );
};
