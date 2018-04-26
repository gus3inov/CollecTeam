import * as React from "react"
import styled from 'styled-components'

const StyledButton = styled.button`
    font-size: 43px;
    padding:    ${ (props: { size: boolean })    : string => props.size ? '23px': '5px' };
    border: none;
    outline: 0;
`

const Black = StyledButton.extend`
    background: #000;
    color: #fff;
`

const White = StyledButton.extend`
    background: #fff;
    color: #000;
`

interface Button {
    children: string,
    size: boolean
}

export const BlackButton = (props: Button) => {
    const {size} = props
    return (
        <Black size={size}>{props.children}</Black>
    )
}

export const WhiteButton = (props: Button) => {
    const {size} = props
    return (
        <White size={size}>{props.children}</White>
    )
}
