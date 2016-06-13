import React from 'react';

class Application extends React.Component {
    render() {
        var { application } = this.props;
        return (
            <div class="col-sm-1">
                <p>{application.name}</p>
            </div>
        )
    }
}

class Panel extends React.Component {
    componentDidMount() {
        this.props.getTopApplications();
    }

    render() {
        return (
            <div>
                <h1>Top applications:</h1>
                <div class="row">
                    {this.props.topApplications.map(function (application) {
                        return (
                            <Application application={application}/>
                        )
                    })}
                </div>

                {this.props.children}
            </div>

        )
    }
}

export default Panel;