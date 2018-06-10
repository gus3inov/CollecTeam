import styled from 'styled-components';
import deepPurple from '@material-ui/core/colors/deepPurple';
import green from '@material-ui/core/colors/green';

const StyledSearch = styled.div`
    display: flex;
    align-items: center;
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

export default StyledSearch;
