import React from 'react';
import { Thumbnail, Button } from 'react-bootstrap';

class Application extends React.Component {
    download(id) {
        var download = '/applications/' + id + '/zip';
        var win = window.open(download, '_blank');
        if (win) {
            //Browser has allowed it to be opened
            win.focus();
        } else {
            //Browser has blocked it
            alert('Please allow popups for this website');
        }
    }

    render() {
        var { application } = this.props;
        var url = '#/' + application.id;
        var photo = '../resources/uploads/photos/' + application.packageName + '/' + application.smallPhoto;

        var Download =
            <Button onClick={(e) => { e.preventDefault(); this.download(application.id);}}
                    bsStyle="primary" disabled>
                Download
            </Button>;
        if (this.props.currentUserRole == "ROLE_USER") {
            Download =
                <Button onClick={(e) => { e.preventDefault(); this.download(application.id);}}
                        bsStyle="primary">
                    Download
                </Button>;
        }
        return (
            <div class="col-sm-1">
                <a href={url}>
                    <Thumbnail src={photo} alt="128x128">
                        <h5>{application.name}</h5>
                        <p>
                            { Download }
                        </p>
                    </Thumbnail>
                </a>
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
                    {this.props.topApplications.map((application) => {
                        return (
                            <Application currentUserRole={this.props.profileState.currentUserRole}
                                         application={application}
                                         downloadApplication={this.props.downloadApplication}
                                         key={application.id}/>
                        )
                    })}
                </div>
                <hr />
            </div>
        )
    }
}
export default TopApplications;