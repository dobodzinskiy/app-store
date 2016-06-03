import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    render() {
        return (
            <div class="container">
                <h1>Hello!</h1>
                <p>Update!</p>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("app"));