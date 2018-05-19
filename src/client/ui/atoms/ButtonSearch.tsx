import * as React from 'react';

import styled from 'styled-components';

const StyledButtonSearch = styled.button`
    font-size: 36px;
`;

type ButtonSearchProps = {
    onClick(): void;
}

const ButtonSearch: React.SFC<ButtonSearchProps> = (props) => {
    const { onClick } = props;

    return (
        <StyledButtonSearch className="button button_search" onClick={onClick}>
            <span className="mdi mdi-magnify"></span>
        </StyledButtonSearch>
    )
}

export default ButtonSearch;