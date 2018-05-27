import * as React from 'react';
import { Fragment } from 'react';

import Panel from '../organisms/Panel';

export interface AboutProps {
}

class About extends React.Component<AboutProps, {}> {
    render() {
        const { children } = this.props;

        return (
            <Fragment>
                <Panel urlImg="http://g989666z.beget.tech/images/about-bg.jpg" />
                <div className="container">
                    { children }
                </div>
            </Fragment>
        )
    }
}

export default About;
