import React from 'react';

//class Application extends React.Component {
//    render() {
//        var { application } = this.props;
//        return (
//            <div class="col-sm-1">
//                <p>{application.name}</p>
//            </div>
//        )
//    }
//}
class Home extends React.Component {
    componentDidMount() {
        this.props.getApplications('Art');
    }
    render() {
        return (
            <h1>Applications:</h1>
        )
    }
}
export default Home;