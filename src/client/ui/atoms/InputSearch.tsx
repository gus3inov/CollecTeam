import * as React from 'react';

import styled from 'styled-components';

const StyledSearchInput = styled.input`
    
`

type SearchInputProps = {

}

const SearchInput: React.SFC<SearchInputProps> = (props) => {
    return (
        <StyledSearchInput placeholder="Поиск..." type="text" className="input input_search"/>
    )
};

export default SearchInput;