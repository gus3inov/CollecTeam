import * as React from 'react';
import styled from 'styled-components';
// import { darkColor, lightColor } from '@ui/theme';
import { Button as AntButton } from 'antd';

type IProps = {
	children: string;
	size: string;
	type: string;
	onClick(): void;
};

const StyledButton: any = styled(AntButton)`
	
`;

const Button: React.SFC<IProps> = (props) => {
	const { type, size, onClick } = props;
	return (
		<StyledButton
			type={type}
			size={size}
			onClick={onClick}
		>
			{props.children}
		</StyledButton>
	);
};

export default Button;
