import React from 'react';
import { Col, Thumbnail } from 'react-bootstrap';

class Application extends React.Component {
    render() {
        var { application } = this.props;
        var url = '#/app/' + application.id;
        var photo = '../resources/uploads/photos/' + application.packageName + '/' + application.smallPhoto;

        return (
            <Col sm={3}>
                <a href={url}>
                    <div class="container-fluid text-center">
                        <h3>{ application.name }</h3>
                        <img class="img-responsive img-circle" style={{display: "inline"}} src={photo}/>
                    </div>
                </a>
            </Col>
        )
    }
}
class ProfileApps extends React.Component {
    componentDidMount() {
        this.props.getUserApplications();
    }

    render() {
        return (
            <div class="container">
                <h2>Downloaded applications:</h2>
                <div class="row">
                    {this.props.profileState.currentUserDownloads.map((application) => {
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
