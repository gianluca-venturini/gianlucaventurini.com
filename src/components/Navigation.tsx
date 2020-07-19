import React from 'react'
import styled from 'styled-components';
import { PageProps } from 'gatsby';

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
            <h1><LinkWrapper href='/' current={props.location.pathname === '/'}>Gianluca Venturini</LinkWrapper></h1> {/* H1 used for SEO purposes */}
            <LinkWrapper href='/bookshelf' current={props.location.pathname === '/bookshelf'}>Bookshelf</LinkWrapper>
        </NavigationWrapper>
    )
}