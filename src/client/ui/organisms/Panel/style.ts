import styled from 'styled-components';

import { darkColor, darkBlue, lightColor } from '../../theme';

const StyledPanel = styled.section`
    background-image: url(${(props: { url: string }) => props.url});
    background-position: center -240px;
    background-attachment: fixed;
    width: 100%;
    height: 476px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 0 140px;
   
   .panel {
        display: flex;
        align-items: center;
        z-index: 100;
        
        &-logo {
            width: 280px;
            img {
                width: 100%;
                height: auto;
            }
        }
        
        &-descr {
            width: 628px;
            margin-left: 37px;
            
            p {
                padding-top: 23px;
                font-size: 30px;
            }
        }
   }
`;

export default StyledPanel;
