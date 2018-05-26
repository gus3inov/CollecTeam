import * as React from 'react';

import StyledUserAvatar from './style';

export interface UserAvatarProps {

}

class MainUserAvatar extends React.Component<UserAvatarProps, any> {
    render() {
        return (
            <StyledUserAvatar className="alt-header__user">
                <img src="" alt=""/>
            </StyledUserAvatar>
        );
    }
}

export default MainUserAvatar;