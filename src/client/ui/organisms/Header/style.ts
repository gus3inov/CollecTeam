import styled from 'styled-components';
import { darkColor } from '../../theme';

export const StyledHeader = styled.header`
  background: ${darkColor};
  padding: 10px;
  padding-left: 90px;
  height: 95px;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 100;
  transition: 0.32s;
  display: flex;
  align-items: center;
  
  &.alt-header_closed {
    margin-left: 100px;
  }
  
  &.alt-header_open {
    margin-left: 300px;
  }
`;
