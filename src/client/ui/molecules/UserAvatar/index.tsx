import * as React from 'react';

import MainUserAvatar from './UserAvatar';

export interface HeaderProps {
    user?: object;
}

const UserAvatar:  React.StatelessComponent<HeaderProps> = (props: HeaderProps) => {

    return <MainUserAvatar />
};

export default UserAvatar;
