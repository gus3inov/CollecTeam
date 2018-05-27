import * as React from 'react';

import styled from 'styled-components';
import { fontWhite } from "../theme";

const StyledTitle = styled.h3`
    font-size: ${(props: { size: number }) => props.size}px;
    color: ${fontWhite};
    position: relative;
`;

type TitleProps = {
    size: number;
    children: any;
}


const Title: React.SFC<TitleProps> = (props: TitleProps) => {
    const { children, size } = props;

    return <StyledTitle size={size}>{children}</StyledTitle>
};

export default Title;
