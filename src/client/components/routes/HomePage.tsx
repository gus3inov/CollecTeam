import * as React from 'react';
import { Route, NavLink } from 'react-router-dom'

import HomeContainer from '../Home/HomeContainer';

export interface HomePageProps {

}

class HomePage extends React.Component<HomePageProps, any> {
    render() {
        return (
            <div>
                <HomeContainer>
                    <div>
                        This home page
                    </div>
                </HomeContainer>
            </div>
        );
    }
}

export default HomePage;