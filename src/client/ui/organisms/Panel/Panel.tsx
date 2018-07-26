import * as React from 'react';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

import {BackgroundOpacity} from '../../theme';
import StyledPanel from './style';
import Title from '../../atoms/Title';

export interface PanelProps {
    urlImg: string;
}

const Panel: React.StatelessComponent<PanelProps> = (props: PanelProps) => {
    const {urlImg} = props;

    return (
        <TransitionGroup>
            <CSSTransition
                key="1"
                classNames="slide"
                timeout={{enter: 500, exit: 300}}
            >
                <StyledPanel url={urlImg} className="container-fluid">
                    <BackgroundOpacity opacity={8}/>
                    <div className="panel container">
                        <div className="panel-logo">
                            <img src="/images/logo.png" alt=""/>
                        </div>
                        <div className="panel-descr">
                            <Title size={64}>Upgrade Skills</Title>
                            <p>Upgrade Skills - это проект который предназначен для реализации идей в жизнь, и для сбора
                                команд для реализации этих идей.</p>
                        </div>
                    </div>
                </StyledPanel>
            </CSSTransition>
        </TransitionGroup>
    );
};

export default Panel;
