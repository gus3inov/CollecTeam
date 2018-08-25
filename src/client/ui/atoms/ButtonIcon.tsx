import * as React from 'react';
// import { darkColor, lightColor } from '@ui/theme';
import {
	Icon as AntIcon,
	Button as AntButton,
} from 'antd';

type IProps = {
	children: string;
	iconType: string;
	onClick(): void;
};

const ButtonIcon: React.SFC<IProps> = (props) => {
	const { iconType, onClick } = props;
	return (
		<AntButton
			{...props}
			onClick={onClick}
		>
			<AntIcon type={iconType} /> {props.children}
		</AntButton>
	);
};

export default ButtonIcon;
