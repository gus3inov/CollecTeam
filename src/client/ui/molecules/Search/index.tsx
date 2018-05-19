import * as React from 'react';

import MainSearch from './Search';

export interface HeaderProps {

}

const Search:  React.StatelessComponent<HeaderProps> = (props: HeaderProps) => {

    return <MainSearch />
};

export default Search;
