import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import StyledCardHeader from './style';

export interface CardHeaderProps {
    title: string;
}

class  CardHeader extends React.Component<CardHeaderProps, any> {
    render() {
        const { title } = this.props;

        return (
            <StyledCardHeader className="card-header">
                    <h2 className="chart-header__title">{title}</h2>
                    <IconButton
                        aria-label="More"
                        aria-haspopup="true"
                    >
                        <MoreVertIcon />
                    </IconButton>
            </StyledCardHeader>
        );
    }
}

export default CardHeader;
