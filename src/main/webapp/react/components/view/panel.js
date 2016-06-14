import React from 'react';

import NavPanel from './navPanel';
import TopApplications from './topApplications'

class Panel extends React.Component {
    componentDidMount() {
        this.props.getTopApplications();
    }
    render() {
        return (
            <div>
                <NavPanel profileState={this.props.profileState}
                          profileActions={this.props.profileActions} />
                <TopApplications applications={this.props.topApplications} />
                {this.props.children}
            </div>

        )
    }
}
export default Panel;