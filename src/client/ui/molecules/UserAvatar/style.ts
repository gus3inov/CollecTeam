import styled from 'styled-components';
import deepPurple from '@material-ui/core/colors/deepPurple';
import green from '@material-ui/core/colors/green';

const StyledSearch = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
    
    .MuiBadge-badge-66 {
        top: -9px;
        color: #fafafa;
        width: 20px;
        right: -9px;
        height: 20px;
        display: flex;
        z-index: 1;
        position: absolute;
        flex-wrap: wrap;
        font-size: 11px;
        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
        align-items: center;
        border-radius: 50%;
        align-content: center;
        flex-direction: row;
        justify-content: center;
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
		width: 40,
		height: 40,
		backgroundColor: deepPurple[500],
		color: '#fff',
		fontSize: 18,
	},
	greenAvatar: {
		margin: 10,
		color: '#fff',
		backgroundColor: green[500],
	},
};

export default StyledSearch;
