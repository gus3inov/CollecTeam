import * as React from 'react';
import styled from 'styled-components';
import AntInput from 'antd/lib/input';

const StyledSearchInput = styled(AntInput)`
    
`;

type IProps = {

};

const SearchInput: React.SFC<IProps> = (props) => {
	return (
		<StyledSearchInput placeholder="Поиск..." type="text"/>
	);
};

export default SearchInput;
