import * as React from 'react';

import Home from '../../ui/templates/Home'

export interface HomeContainerProps {

}

class HomeContainer extends React.Component<HomeContainerProps, any> {
    render() {
        return (
           <Home />
        );
    }
}

export default HomeContainer;