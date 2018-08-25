import styled from 'styled-components';

export const StyledDetailStartup = styled.div`
    width: 100%;
    position: relative;
       
       .startup-detail {
            &__img {
                img {
                    width: 100%;
                    height: 300px;
                    object-fit: cover;
                }
            }
            
            &__title {
                position: absolute;
                top: 160px;
                left: 75px;
                font-size: 86px;
            }
               
            &__body {
                background-color: #0f2b3d;
                box-shadow: 0px 13px 20px rgba(15, 43, 61, 0.45);
                width: 90%;
                margin: 0 auto;
                position: relative;
                top: -40px;
                border-radius: 7px;
                position: relative;
            }
    }
    
    .startup-tab__content {
        padding: 20px 50px;
    }
`;
