import * as React from "react"

import { StyledHeader } from './style'
import {HeaderProps} from "./index";
import Search from '../../molecules/Search';
import UserAvatar from '../../molecules/UserAvatar';

export interface OriginProps {
    isOpen?: boolean;
}

const Header: React.StatelessComponent<HeaderProps> = (props: OriginProps ) => {
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
