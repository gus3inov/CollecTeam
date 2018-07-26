import styled from "styled-components";
import {darkColor, darkBlue, lightColor} from '../../theme';

const StyledWorkspace = styled.div`
    width: ${(props: { isOpen: boolean  }) => props.isOpen ? '1500px' : '1680px' };
    margin: 0 auto;
    padding-top: 80px;
    margin-left: ${(props: { isOpen: boolean  }) => props.isOpen ? '311px' : '127px' };
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    transition: 0.32s;
`;

export default StyledWorkspace;
