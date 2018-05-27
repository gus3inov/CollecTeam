import styled from "styled-components";
import {darkColor, darkBlue, lightColor} from '../../theme';

const StyledWorkspace = styled.div`
    width: 1400px;
    margin: 0 auto;
    padding-top: 140px;
    margin-left: ${(props: { isOpen: boolean  }) => props.isOpen ? '411px' : '217px' };
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    transition: 0.32s;
`;

export default StyledWorkspace;