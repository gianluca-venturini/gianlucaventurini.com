import React from 'react'
import styled from 'styled-components';

export const NavigationWrapper = styled.div`
    position: absolute;
    right: 40px;
    top: 40px;
    
    display: flex;
    flex-direction: column;
    justify-content: end;

    font-size: 13px;
    line-height: 16px;
    text-align: end;

    cursor: pointer;

    a:link, a:visited {
        text-decoration: none;
        color: ${props => props.theme.colors.mainText};
    }

    *:hover {
        font-weight: 600;
    }

    
`;
    
    // a:hover {
    //     color: ${props => props.theme.colors.redText};
    // }
export const Navigation: React.FC = props => {

    return (
        <NavigationWrapper>
            <h1><a href='/'>Gianluca Venturini</a></h1> {/* H1 used for SEO purposes */}
            <a href='/'>Bookshelf</a>
        </NavigationWrapper>
    )
}