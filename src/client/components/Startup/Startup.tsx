import * as React from 'react';
import {connect} from 'react-redux';
import { loadStartup, moduleName } from '../../ducks/startups'
import {Fragment} from 'react';
import DetailStartup from '../../ui/organisms/DetailStartup/index';

export interface StartupProps {

}

@connect((state) => ({
    startup: state[moduleName].entitie
}), { loadStartup })
class Startup extends React.Component<StartupProps, any> {

    componentDidMount () {
        this.props.loadStartup(this.props.name)
    }

    render() {
        const { startup } = this.props;
        console.log(startup)
        return (
            <Fragment>
                {
                    startup !== null
                        ?
                        <DetailStartup data={startup}/>
                        : ''
                }
            </Fragment>
        );
    }
}

export default Startup;
