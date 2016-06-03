import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
    handleSubmit(e) {
        e.preventDefault();
        var application = {
            name : 'app',
            archive: $("#archive"),
            applicationType: 'Art',
            description: 'application'
        };
        $.ajax({
            url: '/applications',
            type: 'POST',
            data: JSON.stringify(application),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function () {
                alert("done");
            }
        })
    }
    render() {
        return (
            <div class="container">
                <form id="form-file" role="form" onSubmit={this.handleSubmit}>
                    <input type="file" class="form-control" id="archive" />
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("app"));