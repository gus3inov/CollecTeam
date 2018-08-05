import * as React from 'react';
import styled from 'styled-components';
import { lightColor } from '@ui/theme';

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

type IProps = {
	children: any;
};

const SectionTitle: React.SFC<IProps> = (props: IProps) => {
	return <StyledSectionTitle>{props.children}</StyledSectionTitle>;
};

export default SectionTitle;
