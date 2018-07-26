import * as React from 'react';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { StyledDetailStartup } from './style';

export interface DetailStartupProps {
    data: object;
}

class DetailStartup extends React.Component<DetailStartupProps, any> {
    state = {
      tabIndex: 0
    };

    handleChange = (event, index) => {
      this.setState({
          tabIndex: index
      })
    };

    getTab = (index) => {

        switch (index) {
            case 0:
                return (
                    <div className="startup-tab__content">
                        Tab 0
                    </div>
                );
            case 1:
                return (
                    <div className="startup-tab__content">
                        Tab 1
                    </div>
                );
            case 2:
                return (
                    <div className="startup-tab__content">
                        Tab 3
                    </div>
                );
            case 3:
                return (
                    <div className="startup-tab__content">
                        Tab 4
                    </div>
                );
            case 4:
                return (
                    <div className="startup-tab__content">
                        Tab 5
                    </div>
                );
            default:
                return (
                    <div className="startup-tab__content">
                        No set tab
                    </div>
                )
        }
    };

    render() {
        const { data } = this.props;
        const { tabIndex } = this.state;

        return (
            <StyledDetailStartup className="startup-detail">
               <div className="startup-detail__img">
                   <img src={data.previewPicture} alt=""/>
               </div>
                <h2 className="startup-detail__title">{data.name}</h2>
                <div className="startup-detail__body">
                    <div className="tabs">
                        <Tabs value={tabIndex} onChange={this.handleChange}>
                            <Tab label="Описание" />
                            <Tab label="Об основателе" />
                            <Tab label="Кто нужен ?" />
                            <Tab label="Контакты" />
                        </Tabs>
                        {this.getTab(tabIndex)}
                    </div>
                </div>
            </StyledDetailStartup>
        );
    }
}

export default DetailStartup;
