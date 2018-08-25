import * as React from 'react';
import { Input } from 'antd';

type IProps = {

};

const InputSearch: React.SFC<IProps> = (props: IProps) => {
	return (
		<Input placeholder="Поиск..." type="text"/>
	);
};

export default InputSearch;
