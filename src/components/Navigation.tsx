import React from 'react'
import styled from 'styled-components';
import { Link, PageProps, GatsbyLinkProps } from 'gatsby';
import { GUTTERS } from './Styles';
import { Hamburger } from './Hamburger';
import { AUTHOR } from './Constants';
import { COLORS } from './Theme';
import { Typography, FONTS } from './Typography';

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

    a:hover {
        font-weight: 600!important;
        color: ${COLORS.text.dark};
    }

    a {
        user-select: none;
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

    return (
        <WrappedLink to={props.href} current={normalizedPathname === props.href}>
            {props.children}
        </WrappedLink>
    );
};

interface WrappedLinkProps {
    current: boolean;
    children: React.ReactNode;
}

const WrappedLink: React.FC<GatsbyLinkProps<{}> & WrappedLinkProps> = ({ children, current, style, to }) => {
    return (
        <Typography variant={{ ...FONTS.label.medium, weight: 400 }}>
            <Link 
                style={{ 
                    marginTop: GUTTERS.medium,
                    color: current ? COLORS.text.red : COLORS.text.primary,
                    cursor: 'pointer',
                    display: 'block',
                    background: 'none',
                    ...style
                }} 
                to={to}
            >
                    {children}
            </Link>
        </Typography>
    )
}

