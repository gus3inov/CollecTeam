import * as React from 'react';

import styled from 'styled-components';
import { lightColor } from "../theme";

const StyledSectionTitle = styled.h3`
    font-size: 64px;
    color: ${lightColor};
    position: relative;
    
    &:before {
        content: '';
        background-color: ${lightColor};
        position: absolute;
        width: 80%;
        height: 5px;
        bottom: -4px;
    }
`;

type SectionTitleProps = {
    children: any;
}


const SectionTitle: React.SFC<SectionTitleProps> = (props: SectionTitleProps) => {
    return <StyledSectionTitle>{props.children}</StyledSectionTitle>
};

export default SectionTitle;
