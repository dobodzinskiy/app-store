import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
    handleSubmit(e) {
        //var application = {
        //    name: 'app',
        //    archive: $("#archive").file,
        //    applicationType: 'Art',
        //    description: 'application'
        //};
        e.preventDefault();
        var data = new FormData();
        data.append("file", $('input[type=file]')[0].files[0]);
        $.ajax({
            url: '/applications/upload',
            type: 'POST',
            data: data,
            enctype: 'multipart/form-data',
            processData: false,
            contentType:false,
            success: function () {
                alert("done");
            }
        });
    }
    render() {
        return (
            <div class="container">
                <form id="form-file" role="form" onSubmit={this.handleSubmit}>
                    <div class="form-group">
                        <label for="archive">Archive</label>
                        <input type="file" class="form-control" id="archive"/>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>


            </div>
        )
    }
}
//<form id="form-file" role="form" onSubmit={this.handleSubmit}>
//    <div class="form-group">
//        <label for="name">Name</label>
//        <input type="text" class="form-control" id="name"/>
//    </div>
//    <div class="form-group">
//        <label for="type">Type</label>
//        <input type="text" class="form-control" id="type"/>
//    </div>
//    <div class="form-group">
//        <label for="archive">Archive</label>
//        <input type="file" class="form-control" id="archive"/>
//    </div>
//    <div class="form-group">
//        <label for="description">Description</label>
//        <input type="text" class="form-control" id="description"/>
//    </div>
//    <button type="submit" class="btn btn-primary">Submit</button>
//</form>
ReactDOM.render(<App />, document.getElementById("app"));