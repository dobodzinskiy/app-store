import React from 'react';
import { Media, Image, Panel, ProgressBar, Button } from 'react-bootstrap';


class RateForm extends React.Component {
    handleSubmit(e) {
        e.preventDefault();

        var rate = $("#rate");
        var applicationId = this.props.application.id;
        var login = this.props.profileState.currentUser.login;
        this.props.rateApplication({
            login,
            applicationId,
            rate
        })
    }

    render() {
        return (
            <form role="form" id="commentForm" onSubmit={this.handleSubmit}>
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
            </form>
        )
    }

}
class Application extends React.Component {
    componentDidMount() {
        this.props.getApplication(this.props.params.id);
    }

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
        this.props.downloadApplication(id)
        var downloaded;
        this.props.profileState.currentUserApps.forEach((app) => {
            if (app.id == this.props.application.id) {
                downloaded = true;
            }
        });
        if (!downloaded) {
            this.props.toDownloads(this.props.application);
        }
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
                stars.push(<span class="glyphicon glyphicon-star"></span>)
            }

            var Download =
                <Button onClick={(e) => { e.preventDefault(); this.download(application.id);}}
                        bsStyle="primary" disabled>
                    Download
                </Button>;
            if (this.props.profileState.currentUserRole == "ROLE_USER") {
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
                            <div class="col-sm-8">
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