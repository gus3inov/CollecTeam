import styled from 'styled-components';
import { darkColor } from '../../theme';
import deepPurple from '@material-ui/core/colors/deepPurple';
import green from '@material-ui/core/colors/green';

export const StyledHeader = styled.header`
  background: ${darkColor};
  padding: 10px;
  padding-left: 90px;
  padding-right: 50px;
  height: 95px;
  position: fixed;
  width: calc(100% - 100px);
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
    margin-left: 100px;
  }
  
  &.alt-header_open {
    padding-left: 10px;
    margin-left: 300px;
    width: calc(100% - 300px);
  }
`;

export const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    row: {
        display: 'flex',
        justifyContent: 'center',
    },
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        width: 60,
        height: 60,
        backgroundColor: deepPurple[500],
        color: '#fff',
    },
    greenAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: green[500],
    },
};
