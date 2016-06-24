import React from 'react';
import $ from 'jquery';

class ApplicationAdd extends React.Component {
    handleSubmit(e) {
        e.preventDefault();
        var data = new FormData();
        data.append("file", $('input[type=file]')[0].files[0]);
        data.append("name", $("#name").val());
        data.append("type", $("#type").val());
        data.append("description", $("#description").val());

        this.props.uploadApplication(data);
    }

    render() {
        return (
            <div class="container">
                <h2>Upload new application:</h2>
                <form id="form-file" role="form" onSubmit={this.handleSubmit}>
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" id="name" required="required"/>
                    </div>
                    <div class="form-group">
                        <label for="type">Type</label>
                        <input type="text" class="form-control" id="type" required="required"/>
                    </div>
                    <div class="form-group">
                        <label for="archive">Archive</label>
                        <input type="file" class="form-control" id="archive" required="required"/>
                    </div>
                    <div class="form-group">
                        <label for="description">Description</label>
                        <input type="text" class="form-control" id="description" required="required"/>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
                <hr/>
            </div>
        )
    }
}

export default ApplicationAdd;