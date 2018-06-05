import * as React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import styled from 'styled-components';
import { lightColor } from "../theme";

const StyledLink = styled.span`
    color: #fff;
    text-decoration: none;
    transition: 0.32s;
    
    &:hover {
        color: #fff;
    }
    
    &:before {
        transition: 0.32s;
    }
    
    &:hover {
        color: ${lightColor};
        &:before {
            color: ${lightColor};
        }
    }
    
`;

interface LinkMenuProps extends NavLinkProps{
    isOpen: boolean;
    text: string;
    icon: string;
}

const LinkMenu: React.SFC<LinkMenuProps> = (props: LinkMenuProps) => {
    const { to, isOpen, text, icon }: LinkMenuProps = props;
    return (
        <NavLink to={to} className={"alt-nav-link"} activeClassName="alt-nav-link_active">
                { isOpen
                    ? ( <StyledLink className={`mdi ${icon}`}>{text}</StyledLink>)
                    : ( <div>
                        <StyledLink className={`mdi ${icon}`}>{}</StyledLink>
                    </div>)
                }
        </NavLink>
    )
};

export default LinkMenu;
