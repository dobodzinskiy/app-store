import React from 'react';
import { Media, Image, Panel, ProgressBar, Button } from 'react-bootstrap';
import $ from 'jquery';


class RateForm extends React.Component {

    handleSubmit(e) {
        e.preventDefault();

        var rate = $("#rate");
        var applicationId = this.props.application.id;
        var login = this.props.profileState.currentUser.login;
        this.props.rateApplication({
            username: login,
            applicationId: applicationId,
            rate : rate.val()
        });
    }

    render() {
        return (
            <form role="form" id="rateForm" onSubmit={(e) => {this.handleSubmit(e); }}>
                <div class="form-group">
                    <label for="rate">Rate this application, if you like it :</label>
                    <select className="form-control" id="rate" placeholder="Select rate">
                        <option value="1">&#9733;</option>
                        <option value="2">&#9733;&#9733;</option>
                        <option value="3">&#9733;&#9733;&#9733;</option>
                        <option value="4">&#9733;&#9733;&#9733;&#9733;</option>
                        <option value="5">&#9733;&#9733;&#9733;&#9733;&#9733;</option>
                    </select>
                </div>
                <button class="btn btn-primary" type="submit"> Rate!</button>
            </form>
        )
    }

}
class Application extends React.Component {

    componentDidMount() {
        this.props.getApplication(this.props.params.id);
    }

    download(id) {
        this.props.downloadApplication(id);
    }

    render() {
        if (this.props.application) {
            var { application } = this.props;
            var { applicationRates } = this.props;
            var photo = '../resources/uploads/photos/' + application.packageName + '/' + application.bigPhoto;

            var stars = [];
            var rating = 0;
            applicationRates.map((rate) => {
                rating += rate.rate;
            });
            rating /= applicationRates.length;
            for (var i = 0; i < rating; i++) {
                stars.push(<span key={i} class="glyphicon glyphicon-star" />)
            }

            var Download =
                <Button onClick={(e) => { e.preventDefault(); this.download(application.id);}}
                        bsStyle="primary" disabled>
                    Download
                </Button>;
            if (this.props.profileState.currentUserRole != null) {
                Download =
                    <Button onClick={(e) => { e.preventDefault(); this.download(application.id);}}
                            bsStyle="primary">
                        Download
                    </Button>;
                var downloaded = false;
                this.props.profileState.currentUserApps.forEach((app) => {
                    if (app.id = application.id) {
                        downloaded = true;
                    }
                });
                if (downloaded) {
                    Download =
                        <div>
                            <Button onClick={(e) => { e.preventDefault(); this.download(application.id);}}
                                    bsStyle="primary">
                                Download
                            </Button>
                            <hr/>
                            <div class="col-sm-8 text-center">
                                <RateForm application={this.props.application}
                                          profileState={this.props.profileState}
                                          rateApplication={this.props.rateApplication}/>
                            </div>
                        </div>

                }
            }

            return (
                <div class="container">
                    <Panel>
                        <div class="text-center">
                            <Image src={photo} circle/>
                            <h1>{application.name}</h1>
                        </div>
                        <h2>Description</h2>
                        <p>{application.description}</p>
                        <hr/>
                        <h3>
                            Rating: {stars}
                            <small>rated: {applicationRates.length}</small>
                            <br />
                            Downloaded:
                            <small>{application.downloads}</small>
                        </h3>
                        <div class="text-center">
                            { Download }
                        </div>
                    </Panel>
                </div>
            )
        }
        return (<p>Loading</p>)
    }
}

export default Application;