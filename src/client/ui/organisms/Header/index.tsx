import * as React from 'react';

import MainHeader from './Header';

export interface HeaderProps {
    isOpen: boolean;
}

const Header:  React.StatelessComponent<HeaderProps> = (props: HeaderProps) => {
        const { isOpen } = props;

        return <MainHeader isOpen={ isOpen }/>
};

export default Header;
