import styled from 'styled-components';

export const darkColor = '#040B10';
export type darkColor = typeof  darkColor;

export const lightColor = '#07D2FF';
export type lightColor = typeof  lightColor;

export const lightBlue = '#07D2FF';
export type lightBlue = typeof lightBlue;

export const darkBlue = '#0c2740';
export type darkBlue = typeof darkBlue;


export const lightPurple = '#535393';
export type lightPurple = typeof lightPurple;

export const darkPurple = '#2B2B7E';
export type darkPurple = typeof darkPurple;


export const fontWhite = '#e5e2da';
export type fontWhite = typeof fontWhite;

export const borderBlue = '#253340';
export type borderBlue = typeof borderBlue;

export const BackgroundOpacity = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;   
    z-index: 10;
    background-color: rgba(0,0,0,.${(props: {opacity: number}) => props.opacity});
`;
