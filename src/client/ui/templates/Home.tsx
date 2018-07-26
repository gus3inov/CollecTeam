import * as React from 'react';
import {Fragment} from 'react';

import toggleOpen, { InjectedProps } from '../../hocs/toggleOpen';
import Menu from '../organisms/Menu';
import Header from '../organisms/Header';
import Workspace from '../organisms/Workspace';

export interface HomeProps {
    children: any;
    routes: Array<object>;
    user: object;
}

@toggleOpen
class Home extends React.Component <HomeProps & InjectedProps> {

    render() {
        const { toggleOpen, isOpen, children, routes, user } = this.props;

        return (
            <Fragment>
                <main className="home">
                    <Header user={user} isOpen={isOpen} />
                    <Menu routes={routes} toggleOpen={toggleOpen} isOpen={isOpen} />
                    <Workspace isOpen={isOpen}>
                        {children}
                    </Workspace>
                </main>
            </Fragment>
        )
    }
}

export default Home;
