import styled from 'styled-components';

import { darkColor, lightBlue } from '../../theme'

export const StyledInfoTable = styled.div`
.projects {
	background-color: ${darkColor};
	border: 4px solid ${lightBlue};
    border-radius: 10px;
    overflow: hidden;
    border: 4px solid #07D2FF;
	width: 100%;
	
	&-inner {
		border: 1px solid ${lightBlue};
		border-radius: 4px;
	}
}
.projects-header {
    background-color: ${lightBlue};
	color: white;
	padding: 22px;
	.count,
	.title {
		display: inline-block;
	}
	.count {
		color: #738297;
	}
	.glyphicon {
		cursor: pointer;
		float: right;
		font-size: 16px;
		margin: 5px 0;
	}
	.title {
		font-size: 21px;
		//font-weight: lighter;
		+ .count {
			margin-left: 5px;
		}
	}
}
.projects-table {
	width: 100%;
	td,
	th {
		color: white;
		padding: 10px 22px;
		vertical-align: middle;
	}
	td p {
		font-size: 12px;
		&:last-of-type {
			color: @light-text;
			font-size: 11px;
		}
	}
	th {
		background-color: @light-bg;
	}
	tr:not(:last-of-type) {
		border-bottom: 1px solid @light-bg;
	}
	.member {
		figure,
		.member-info {
			display: inline-block;
			vertical-align: top;
		}
		figure + .member-info {
			margin-left: 7px;
		}
		img {
			border-radius: 50%;
			height: 32px;
			width: 32px;
		}
	}
	.status > form {
		float: right;
	}
	.status-text {
		display: inline-block;
		font-size: 12px;
		margin: 11px 0;
		padding-left: 20px;
		position: relative;
		
		&:before {
			border: 3px solid;
			border-radius: 50%;
			content: "";
			height: 14px;
			left: 0;
			position: absolute;
			top: 1px;
			width: 14px;
		}
		&.status-blue:before {
			border-color: #1C93ED;
		}
		&.status-green:before {
			border-color: #66B92E;
		}
		&.status-orange:before {
			border-color: #DA932C;
		}
		&.status-red:before {
			border-color: #D65B4A;
		}
	}
}
.selectric {
	background-color: transparent;
	border-color: @light-bg;
	border-radius: 4px;
	.label {
		color: @light-text;
		line-height: 34px;
		margin-right: 10px;
		text-align: left;
	}
	&-wrapper {
		float: right;
		width: 150px;
	}
}
// helper classes
.danger-item {
	border-left: 11px solid #d91616;
}
.danger-text {
	color: #A84D43 !important;
}
`;
