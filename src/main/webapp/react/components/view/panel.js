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
                          logout={this.props.logout}
                          signUp={this.props.signUp}/>
                <div class="col-sm-12">
                    <TopApplications topApplications={this.props.topApplications}
                                     profileState={this.props.profileState}
                                     downloadApplication={this.props.downloadApplication}/>
                    {this.props.children}
                </div>
            </div>

        )
    }
}
export default Panel;