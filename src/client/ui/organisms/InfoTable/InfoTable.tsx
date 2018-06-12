import * as React from 'react';
import Icon from '@material-ui/core/Icon';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import CardHeader from '../../molecules/CardHeader';
import { StyledInfoTable } from './style';

export interface InfoTableProps {
    size: number;
    value: object;
    hint: string;
    title: string;
    color: string;
    icon: string;
}

class InfoTable extends React.Component<InfoTableProps, any> {

    state = {
        age: ''
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { value, hint, title, size, color, icon } = this.props;

        return (
            <StyledInfoTable
                color={color}
                className={`col-md-${size} margin`}
            >
                <div className="projects">
                    <div className="projects-inner">
                        <CardHeader
                            title="Текущие проекты"
                        />
                        <table className="projects-table">
                            <thead>
                            <tr>
                                <th>Project</th>
                                <th>Deadline</th>
                                <th>Leader + Team</th>
                                <th>Budget</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tr>
                                <td>
                                    <p>New Dashboard</p>
                                    <p>Google</p>
                                </td>
                                <td>
                                    <p>17th Oct, 15</p>
                                    <p className="danger-text">Overdue</p>
                                </td>
                                <td className="member">
                                    <figure><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/584938/people_8.png"/></figure>
                                    <div className="member-info">
                                        <p>Myrtle Erickson</p>
                                        <p>UK Design Team</p>
                                    </div>
                                </td>
                                <td>
                                    <p>$4,670</p>
                                    <p>Paid</p>
                                </td>
                                <td className="status"><span className="status-text status-orange">In progress</span>
                                    <form className="form" action="#" method="POST">
                                        <Select
                                            style={{minWidth: '120px'}}
                                            value={this.state.age}
                                            onChange={this.handleChange}
                                            inputProps={{
                                                name: 'age',
                                                id: 'age-simple',
                                            }}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </form>
                                </td>
                            </tr>
                            <tr className="danger-item">
                                <td>
                                    <p>New Dashboard</p>
                                    <p>Google</p>
                                </td>
                                <td>
                                    <p>17th Oct, 15</p>
                                    <p className="danger-text">Overdue</p>
                                </td>
                                <td className="member">
                                    <figure><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/584938/people_8.png"/></figure>
                                    <div className="member-info">
                                        <p>Myrtle Erickson</p>
                                        <p>UK Design Team</p>
                                    </div>
                                </td>
                                <td>
                                    <p>$4,670</p>
                                    <p>Paid</p>
                                </td>
                                <td className="status"><span className="status-text status-red">Blocked</span>
                                    <form className="form" action="#" method="POST">
                                        <Select
                                            style={{minWidth: '120px'}}
                                            value={this.state.age}
                                            onChange={this.handleChange}
                                            inputProps={{
                                                name: 'age',
                                                id: 'age-simple',
                                            }}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </form>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>New Dashboard</p>
                                    <p>Google</p>
                                </td>
                                <td>
                                    <p>17th Oct, 15</p>
                                    <p className="danger-text">Overdue</p>
                                </td>
                                <td className="member">
                                    <figure><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/584938/people_8.png"/></figure>
                                    <div className="member-info">
                                        <p>Myrtle Erickson</p>
                                        <p>UK Design Team</p>
                                    </div>
                                </td>
                                <td>
                                    <p>$4,670</p>
                                    <p>Paid</p>
                                </td>
                                <td className="status"><span className="status-text status-orange">In progress</span>
                                    <form className="form" action="#" method="POST">
                                        <Select
                                            style={{minWidth: '120px'}}
                                            value={this.state.age}
                                            onChange={this.handleChange}
                                            inputProps={{
                                                name: 'age',
                                                id: 'age-simple',
                                            }}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </form>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>New Dashboard</p>
                                    <p>Google</p>
                                </td>
                                <td>
                                    <p>17th Oct, 15</p>
                                    <p className="danger-text">Overdue</p>
                                </td>
                                <td className="member">
                                    <figure><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/584938/people_8.png"/></figure>
                                    <div className="member-info">
                                        <p>Myrtle Erickson</p>
                                        <p>UK Design Team</p>
                                    </div>
                                </td>
                                <td>
                                    <p>$4,670</p>
                                    <p>Paid</p>
                                </td>
                                <td className="status"><span className="status-text status-blue">Early stages</span>
                                    <form className="form" action="#" method="POST">
                                        <Select
                                            style={{minWidth: '120px'}}
                                            value={this.state.age}
                                            onChange={this.handleChange}
                                            inputProps={{
                                                name: 'age',
                                                id: 'age-simple',
                                            }}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </form>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>New Dashboard</p>
                                    <p>Google</p>
                                </td>
                                <td>
                                    <p>17th Oct, 15</p>
                                    <p className="danger-text">Overdue</p>
                                </td>
                                <td className="member">
                                    <figure><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/584938/people_8.png"/></figure>
                                    <div className="member-info">
                                        <p>Myrtle Erickson</p>
                                        <p>UK Design Team</p>
                                    </div>
                                </td>
                                <td>
                                    <p>$4,670</p>
                                    <p>Paid</p>
                                </td>
                                <td className="status"><span className="status-text status-orange">In progress</span>
                                    <form className="form" action="#" method="POST">
                                        <Select
                                            style={{minWidth: '120px'}}
                                            value={this.state.age}
                                            onChange={this.handleChange}
                                            inputProps={{
                                                name: 'age',
                                                id: 'age-simple',
                                            }}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </form>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </StyledInfoTable>
        );
    }
}

export default InfoTable;
