import * as React from 'react';

import HomeContainer from '../Home/HomeContainer';

export interface HomePageProps {

}

class HomePage extends React.Component<HomePageProps, any> {
    render() {
        return (
            <HomeContainer />
        );
    }
}

export default HomePage;