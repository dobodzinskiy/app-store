import React from 'react';
import { Thumdnail, Button } from 'react-bootstrap';

class Application extends React.Component {
    render() {
        var { application } = this.props;
        var url = '#/' + application.id;
        var photo = '../../uploads/photos/' + application.packageName + '/' + application.smallPhoto;
        return(
            <div class="col-sm-1">
                <Thumbnail src="/assets/thumbnaildiv.png" alt="242x200">
                    <h3>Thumbnail label</h3>
                    <p>Description</p>
                    <p>
                        <Button bsStyle="primary">Button</Button>&nbsp;
                        <Button bsStyle="default">Button</Button>
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
                            <Application application={application} />
                        )
                    })}
                </div>
            </div>
        )
    }
}
export default TopApplications;