import styled from 'styled-components';

// import { darkColor, fontWhite, borderBlue } from '../../theme'

export const StyledInfoCard = styled.div`
	.card {
        border-radius: 8px;
        color: white;
        float: left;
        padding: 10px;
        position: relative;
        width: 100%;
        min-height: 230px;
        background: ${(props: {color: string}) => props.color};
	}
	.header{
	    display: flex;
	    
	    &-title{
	        font-size: 31px;
            line-height: 40px;
            margin-right: 120px;
	    }
	}
	
	.mdi {
        color: white;
        font-size: 128px;
        opacity: 0.9;
        position: absolute;
        right: 13px;
        top: -17px;
	}
	.stat {
        border-top: 1px solid rgba(255,255,255,0.3);
        font-size: 16px;
        margin-top: 25px;
        position: absolute;
        padding: 10px 10px 0;
        text-transform: uppercase;
        bottom: 10px;
        width: 96%;
	}
	.value {
		font-size: 63px;
		padding: 0 10px;
	}
`;
