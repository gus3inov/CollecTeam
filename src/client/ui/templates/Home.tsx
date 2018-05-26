import * as React from 'react';
import {Fragment} from 'react';

import toggleOpen, { InjectedProps } from '../../hocs/toggleOpen';
import Menu from '../organisms/Menu';
import Header from '../organisms/Header';

export interface HomeProps {
    title?: string;
    children: any;
}

class Home extends React.Component <HomeProps & InjectedProps> {

    render() {
        const { toggleOpen, isOpen } = this.props;

        return (
            <Fragment>
                <main className="home">
                    <Header isOpen={isOpen} />
                    <Menu toggleOpen={toggleOpen} isOpen={isOpen} />
                    <div>
                        {this.props.children}
                    </div>
                </main>
            </Fragment>
        )
    }
}

export default toggleOpen(Home);
