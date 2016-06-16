import React from 'react';
import { Thumbnail, Button } from 'react-bootstrap';

class Application extends React.Component {
    render() {
        var { application } = this.props;
        var url = '#/' + application.id;
        var photo = '../resources/uploads/photos/' + application.packageName + '/' + application.smallPhoto;
        var download = '/applications/' + application.id + '/zip';
        return (
            <div class="col-sm-1">
                <Thumbnail src={photo} alt="128x128">
                    <a href={url}><h5>{application.name}</h5></a>
                    <p>
                        <Button onClick={(e) => { e.preventDefault();this.props.downloadApplication(application.id);}}
                                bsStyle="primary">
                            Download
                        </Button>
                    </p>
                </Thumbnail>
            </div>
        )
    }
}
class TopApplications extends React.Component {
    render() {
        return (
            <div>
                <h1>TOP 10:</h1>
                <hr />
                <div class="row">
                    {this.props.applications.map((application) => {
                        return (
                            <Application application={application} downloadApplication={this.props.downloadApplication} key={application.id}/>
                        )
                    })}
                </div>
            </div>
        )
    }
}
export default TopApplications;