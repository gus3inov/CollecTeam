import * as React from "react"

import { StyledHeader } from './style'
import Search from '../../molecules/Search';
import UserAvatar from '../../molecules/UserAvatar';

export interface HeaderProps {
    isOpen?: boolean;
}

const Header: React.StatelessComponent<HeaderProps> = (props: HeaderProps ) => {
    const { isOpen } = props;
        return (
            <StyledHeader className={`alt-header ${isOpen ? 'alt-header_open' : 'alt-header_closed'} container-fluid`}>
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-5">
                            <Search />
                            <UserAvatar />
                        </div>
                    </div>
                </div>
            </StyledHeader>
        )
};

export default Header;
