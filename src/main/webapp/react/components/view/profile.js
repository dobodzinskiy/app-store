import React from 'react';

class Profile extends React.Component {
    render() {
        var { currentUser} = this.props.profileState;
        var role;
        if (this.props.currentUser == "ROLE_USER") {
            role = 'User'
        } else {
            role = 'Developer'
        }
        return(
            <div className="container">
                <h2 className="page-header">
                    Your login: {currentUser.login}
                </h2>
                <table className="table">
                    <tbody>
                    <tr>
                        <td>You are</td>
                        <td>{role}</td>
                    </tr>
                    <tr>
                        <td>Name:</td>
                        <td>{currentUser.firstName}</td>
                    </tr>
                    <tr>
                        <td>Last name:</td>
                        <td>{currentUser.lastName}</td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>{currentUser.email}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Profile;