import styled from 'styled-components';

import { darkColor } from '../../theme';

export const StyledChartCard = styled.div`

    .dashboard-chart.col-md-12 {
        width: 550px;
    }
    
    .dashboard-chart {
        background: ${darkColor};
        border-radius: 10px;
        overflow: hidden;
        box-shadow: -6px 5px 20px 2px #101010;
    }
 
    .dashboard-chart__content {
        width: 100%;
        padding: 20px 30px;
    }
`;
