import * as React from "react";
import styled from 'styled-components';

export interface IconProps {
    type:string;
    width: string;
    height: string;
}

const IconStyle = styled.i`
    display: block;
    width: ${ props => props.width };
    height: ${ props => props.height };
    background-image: url(../assets/img/icons/${ props => props.type }.svg);
    background-repeat: no-repeat;
    background-size: cover;
`;

const Icon: React.SFC<IconProps> = (props: IconProps) => {
    const { type, width, height } = props
    return (
        <IconStyle type={ type } width={ width } height={ height } />
    );
};

export default Icon;
