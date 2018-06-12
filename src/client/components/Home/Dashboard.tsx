import * as React from 'react';
import {Fragment} from 'react';

import ChartCard from '../../ui/organisms/ChartCard';
import InfoCard from '../../ui/organisms/InfoCard';
import Section from '../../ui/organisms/Section';
import InfoTable from '../../ui/organisms/InfoTable';

export interface DashboardProps {

}

class Dashboard extends React.Component<DashboardProps, any> {
    render() {
        const data = {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: '# of Votes',
                data: [12, 14, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(153, 0, 204, 0.5)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        };

        return (
            <Fragment>
                <Section title="Рабочая панель" bg={false}>
                   <div className="dashboard">
                       <div className="row">
                           <InfoCard
                                color="linear-gradient(135deg,  #e535e2 30%,#fe665b 70%)"
                                value="4,500"
                                title="Что то"
                                size={3}
                                icon="database"
                                hint="аовыда"
                           />
                           <InfoCard
                               color="linear-gradient(135deg,  #e535e2 30%,#fe665b 70%)"
                               value="4,500"
                               title="Что то"
                               size={3}
                               icon="database"
                               hint="аовыда"
                           />
                           <InfoCard
                               color="linear-gradient(135deg,  #00fe9e 30%,#acff3d 70%)"
                               value="4,500"
                               title="Что то"
                               size={3}
                               icon="arrow-up-bold-box"
                               hint="аовыда"
                           />
                           <InfoCard
                               color="linear-gradient(135deg,  #bbc0f7 30%,#2afcef 70%)"
                               value="4,500"
                               title="Что то"
                               size={3}
                               icon="arrow-down-box"
                               hint="аовыда"
                           />
                       </div>
                       <div className="row">
                           <ChartCard
                                size={4}
                                title="Продуктивность команды"
                                type="doughnut"
                                data={data}
                                height={330}
                           />
                           <ChartCard
                               size={8}
                               title="Общий поток"
                               type="bar"
                               data={data}
                           />
                           <InfoTable size={8}/>
                           <ChartCard
                               size={4}
                               title="Общий поток"
                               type="radar"
                               data={data}
                               height={300}
                            />
                           <ChartCard
                               size={12}
                               title="Рост венчурного капитала"
                               type="line"
                               data={data}
                           />
                           <ChartCard
                               size={6}
                               title="Общий поток"
                               type="radar"
                               data={data}
                           />
                       </div>
                   </div>
                </Section>
            </Fragment>
        );
    }
}

export default Dashboard;
