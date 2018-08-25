import * as React from 'react';
// import { darkColor, lightColor } from '@ui/theme';
import { Button as AntButton } from 'antd';
import { ButtonProps } from 'antd/es/button';

type IProps = {
	children: string;
	onClick(): void;
};

const Button: React.SFC<IProps & ButtonProps> = (props) => {
	const { onClick } = props;
	return (
		<AntButton
			{...props}
			onClick={onClick}
		>
			{props.children}
		</AntButton>
	);
};

export default Button;
