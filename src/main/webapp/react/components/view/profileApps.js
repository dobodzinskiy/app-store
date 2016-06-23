import React from 'react';
import { Col, Thumbnail } from 'react-bootstrap';

class Application extends React.Component {
    render() {
        var { application } = this.props;
        var url = '#/app/' + application.id;
        var photo = '../resources/uploads/photos/' + application.packageName + '/' + application.smallPhoto;

        return (
            <Col sm={4}>
                <a href={url}>
                    <Thumbnail src={photo} alt="128x128">
                        <h3>{application.name}</h3>
                    </Thumbnail>
                </a>
            </Col>
        )
    }
}
class ProfileApps extends React.Component {
    render() {
        return (
            <div class="container">
                <h2>Downloaded application:</h2>
                <div class="row">
                    {this.props.profileState.currentUserApps.map((application) => {
                        return (
                            <Application application={application} key={application.id}/>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default ProfileApps;
