import React from 'react';
import { Tab, Nav, NavItem, Row, Col, Thumbnail, Button } from 'react-bootstrap';
import * as Bootstrap from 'react-bootstrap';

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
        this.props.downloadApplication(id);
    }

    render() {
        var { application } = this.props;
        var url = '#/app/' + application.id;
        var photo = '../resources/uploads/photos/' + application.packageName + '/' + application.smallPhoto;

        var Download =
            <Button onClick={(e) => { e.preventDefault(); this.download(application.id);}}
                    bsStyle="primary" disabled>
                Download
            </Button>;
        if (this.props.currentUserRole != null) {
            Download =
                <Button onClick={(e) => { e.preventDefault(); this.download(application.id);}}
                        bsStyle="primary">
                    Download
                </Button>;
        }
        return (
            <Col sm={2}>
                <a href={url}>
                    <Thumbnail src={photo} alt="128x128">
                        <h5>{application.name}</h5>
                        <p>
                            { Download }
                        </p>
                    </Thumbnail>
                </a>
            </Col>
        )
    }
}
class Applications extends React.Component {
    render() {
        return (
            <div class="row">
                {this.props.applications.map((application) => {
                    return (
                        <Application currentUserRole={this.props.currentUserRole}
                                     downloadApplication={this.props.downloadApplication}
                                     application={application}
                                     key={application.id}/>
                    )
                })}
            </div>
        )
    }
}
class Navigation extends React.Component {
    render() {
        return (
            <Tab.Container id="left-tabs-example" defaultActiveKey="Games">
                <Row className="clearfix">
                    <Col sm={4}>
                        <Nav bsStyle="pills" stacked>
                            <NavItem eventKey="Games"
                                     onClick={(e)=>{e.preventDefault(); this.props.getApplications('Games');}}>
                                Games
                            </NavItem>
                            <NavItem eventKey="Multimedia"
                                     onClick={(e)=>{e.preventDefault(); this.props.getApplications('Multimedia');}}>
                                Multimedia
                            </NavItem>
                            <NavItem eventKey="Productivity"
                                     onClick={(e)=>{e.preventDefault(); this.props.getApplications('Productivity');}}>
                                Productivity
                            </NavItem>
                            <NavItem eventKey="Tools"
                                     onClick={(e)=>{e.preventDefault(); this.props.getApplications('Tools');}}>
                                Tools
                            </NavItem>
                            <NavItem eventKey="Health"
                                     onClick={(e)=>{e.preventDefault(); this.props.getApplications('Health');}}>
                                Health
                            </NavItem>
                            <NavItem eventKey="Lifestyle"
                                     onClick={(e)=>{e.preventDefault(); this.props.getApplications('Lifestyle');}}>
                                Lifestyle
                            </NavItem>
                            <NavItem eventKey="Art"
                                     onClick={(e)=>{e.preventDefault(); this.props.getApplications('Art');}}>
                                Art
                            </NavItem>
                        </Nav>
                    </Col>
                    <Col sm={8}>
                        <Tab.Content animation>
                            <Applications applications={this.props.applications}
                                          currentUserRole={this.props.currentUserRole}
                                          downloadApplication={this.props.downloadApplication}/>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        )
    }
}
class Home extends React.Component {
    componentDidMount() {
        this.props.getApplications('Games');
    }

    render() {
        return (
            <div>
                <h1>Applications:</h1>
                <Navigation applications={this.props.applications}
                            currentUserRole={this.props.profileState.currentUserRole}
                            getApplications={this.props.getApplications}
                            downloadApplications={this.props.downloadApplication}/>
            </div>
        )
    }
}
export default Home;