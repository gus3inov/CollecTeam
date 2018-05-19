import * as React from 'react';

import MainMenu from './Menu';

export interface MenuProps {
    isOpen: boolean;
    toggleOpen(): any;
}

const Menu:  React.StatelessComponent<MenuProps> = (props: MenuProps) => {
    const { toggleOpen, isOpen } = props;

    return <MainMenu toggleOpen={toggleOpen} isOpen={ isOpen }/>
};

export default Menu;
