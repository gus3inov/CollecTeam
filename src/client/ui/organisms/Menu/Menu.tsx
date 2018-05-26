import * as React from 'react';

import { StyledMenu } from "./style";
import LinkMenu from '../../atoms/LinkMenu';
import ButtonToggle from '../../atoms/ButtonToggle'

export interface MenuProps {
    isOpen: boolean;
    toggleOpen<A>(): A;
}

const Menu: React.StatelessComponent<MenuProps> = (props: MenuProps) => {
    const { isOpen, toggleOpen } = props;
    return(
        <StyledMenu className={`alt-menu ${isOpen ? 'alt-menu_open' : 'alt-menu_closed'}`} isOpen={ isOpen }>
            <ButtonToggle
                toggleOpen={toggleOpen}
                isOpen={isOpen}
            />
            <div className="logo">
                { isOpen ? <img src="http://g989666z.beget.tech/images/logo.png" alt=""/> : <img src="http://g989666z.beget.tech/images/logo.png" alt=""/> }
            </div>
            <nav className="alt-menu-nav">
                <ul className="alt-menu-nav__list">
                    <li className="alt-menu-nav__list__item">
                        <LinkMenu
                            to="/home"
                            isOpen={isOpen}
                            text="Home"
                            icon="mdi-home"
                        />
                    </li>
                    <li className="alt-menu-nav__list__item">
                        <LinkMenu
                            to="/startups"
                            isOpen={isOpen}
                            text="Startup"
                            icon="mdi-application"
                        />
                    </li>
                </ul>
            </nav>
        </StyledMenu>
    )
};


export default Menu;