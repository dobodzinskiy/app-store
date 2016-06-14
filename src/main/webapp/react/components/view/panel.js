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
                          showLogin={this.props.showLogin}
                          showSignUp={this.props.showSignUp}
                          login={this.props.login}
                          signUp={this.props.signUp}/>
                <TopApplications applications={this.props.topApplications} />
                {this.props.children}
            </div>

        )
    }
}
export default Panel;