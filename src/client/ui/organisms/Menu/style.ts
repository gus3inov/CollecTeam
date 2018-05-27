import styled from "styled-components";

import { darkColor, darkBlue, lightColor } from "../../theme";

export const StyledMenu = styled.div`
    background: ${darkColor};
    width: ${ (props: { isOpen: boolean }) => props.isOpen ? '300px' : '100px' };
    height: 100vh;
    position: fixed;
    top: 0;
    transition: 0.32s;
    z-index: 101;
    font-size: ${ (props: { isOpen: boolean }) => props.isOpen ? '30px' : '43px' };
    
    &.alt-menu_closed {
        .logo {
            height: 85px;
            display: flex;
            align-items: center;
            justify-content: center;
            
            img { 
                 width: auto;
                 height: 60px;
                 margin-top: 11px;
            }
        }
        
        .alt-menu-nav {
            .alt-menu-nav__list {
                .alt-menu-nav__list__item .alt-nav-link{
                    display: flex;
                    justify-content: center;
                    
                    span {                      
                        &:before {
                            margin-right: 0px
                        }
                    }
                }
            }
        }
    }
    
        .alt-menu-nav { 
            .alt-menu-nav__list { 
                .alt-menu-nav__list__item {
                
                    .alt-nav-link {
                        width: 100%;
                        padding: 10px 30px;
                        position: relative;
                         
                        span {
                          -webkit-animation: Fade 0.26s 0.63s 1 alternate backwards;
                            animation: Fade 0.26s 0.63s 1 alternate backwards;
                            transition: 0.32s;
                            
                            &:before {
                                margin-right: 30px
                            }
                        }
                    }
                    
                    .alt-nav-link_active {
                        background-color: ${darkBlue};
                        
                        &:before {
                            content: '';
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 10px;
                            height: 100%;
                            background-color: ${lightColor};
                        }
                    }
                    
                }
            }
        }
    
    .logo {
        height: 180px;
        display: flex;
        justify-content: center;
        
        img {
            width: auto;
            height: auto;
        }
    }
`;
