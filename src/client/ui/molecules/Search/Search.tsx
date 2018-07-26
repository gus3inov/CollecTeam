import * as React from 'react';

import ButtonSearch from '../../atoms/ButtonSearch';
import InputSearch from '../../atoms/InputSearch';
import StyledSearch from './style';

export interface SearchProps {

}

class  Search extends React.Component<SearchProps, any> {
    render() {
        return (
            <StyledSearch className="alt-header__search">
                <ButtonSearch
                    onClick={() => console.log('search')}
                />
                <InputSearch />
            </StyledSearch>
        );
    }
}

export default Search;
