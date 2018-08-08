import * as React from 'react';
import styled from 'styled-components';
import { Input } from 'antd';

const StyledInputSearch = styled(Input)`
`;

type IProps = {

};

const InputSearch: React.SFC<IProps> = (props) => {
	return (
		<StyledInputSearch placeholder="Поиск..." type="text"/>
	);
};

export default InputSearch;
