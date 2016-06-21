import React from 'react';
import { Media, Image, Panel, ProgressBar, Button } from 'react-bootstrap';
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
                            <Button onClick={(e) => { e.preventDefault(); this.download(application.id);}}
                                    bsStyle="primary"
                                    bsSize="large">
                                Download
                            </Button>
                        </div>
                    </Panel>
                </div>
            )
        }
        return (<p>Loading</p>)
    }
}

export default Application;