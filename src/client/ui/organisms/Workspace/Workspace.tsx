import * as React from 'react';

import StyledWorkspace from './style';

export interface WorkspaceProps {
    isOpen?: boolean;
    children: any;
}

class Workspace extends React.Component<WorkspaceProps, any> {
    render() {
        const { isOpen, children } = this.props;

        return (
            <StyledWorkspace isOpen={isOpen || false}>
                {children}
            </StyledWorkspace>
        );
    }
}

export default Workspace;
