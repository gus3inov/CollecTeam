import styled from 'styled-components';

import { darkColor, fontWhite, borderBlue } from '../../theme'

const StyledFormAuth = styled.div`
    width: 100%;
    background-color: ${darkColor};
    padding: 30px 40px;
    padding-bottom: 50px;
    margin: 90px 0;
    border-radius: 10px;
    box-shadow: 10px 10px 20px #02101A;
    color: ${fontWhite};
    
    .auth-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
        animation: Fade 0.26s 0.03s 1 alternate backwards;
        
        .mdi-arrow-left, .mdi-arrow-right {
            font-size: 30px;
        }
        
        &__left {
            width: 70%;
            display: flex;
            justify-content: center;
            
            &.auth-header__sign-in {
                width: 38%;
                justify-content: space-between;
            }
            
            .title {
                font-size: 30px;
                text-transform: uppercase;
            }
        }
        
        &__right {
            width: 30%;
            display: flex;
            justify-content: flex-end;
        }
    }
    
    .auth-body {
        display: flex;
        align-items: center;
        width: 100%;
        
        &__form {
            width: 70%;
            border-right: 1px solid ${borderBlue};
            padding: 0 70px;
            
            form {
                animation: Slide 0.26s 0.03s 1 alternate backwards;
            }
                
            &__submit {
                input {
                    background-color: ${borderBlue};
                    border-radius: 10px;
                    color: ${fontWhite};
                    font-size: 22px;
                    border: none;
                    padding: 5px 70px;
                }
            }
            
            &__input {
                width: 100%;
                margin-bottom: 30px;
                
                input {
                    width: 100%;
                    height: 40px;
                    border: 1px solid ${borderBlue};
                    border-radius: 10px;
                    background-color: transparent;
                    text-indent: 20px;
                    color: ${fontWhite};
                }    
            }
        }
        
        &__service {
            width: 30%;
            padding: 0 50px;
            padding-right: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            
            .title {
                text-align: center;
                font-size: 30px;
            }
            
            &__content {
                padding-top: 30px;
                display: flex;
                justify-content: space-around;
                align-items: center;
                
                .mdi {
                    font-size: 52px;
                    
                    &.mdi-facebook {
                        color: rgb(59, 89, 152)
                    }
                    
                    &.mdi-vk {
                        color: rgb(74, 118, 168);
                    }
                    
                    &.mdi-google-plus {
                        color: rgb(219, 68, 55);
                    }
                }
            }
        }
    }
`;

export default StyledFormAuth;
