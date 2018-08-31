import styled from 'styled-components';
import {darkColor} from '../../theme';
// import deepPurple from '@material-ui/core/colors/deepPurple';
// import green from '@material-ui/core/colors/green';

export const StyledHeader = styled.header`
  background: ${darkColor};
  padding: 10px;
  padding-left: 90px;
  padding-right: 50px;
  height: 60px;
  position: fixed;
  width: calc(100% - 80px);
  top: 0;
  left: 0;
  z-index: 100;
  transition: 0.32s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  .alt-header__user {
      display: flex;
    &_assignment {
        display: flex;
        align-items: center;
        margin-right: 30px;
    }
  }
  
  &.alt-header_closed {
    margin-left: 80px;
  }
  
  &.alt-header_open {
    padding-left: 10px;
    margin-left: 260px;
    width: calc(100% - 260px);
  }
`;
