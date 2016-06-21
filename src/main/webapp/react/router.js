import { Router,    Route, IndexRoute } from 'react-router';
import React from 'react';

import Panel from './components/container/panelContainer';
import Home from './components/container/homeContainer';
import Application from './components/container/applicationContainer'

export default (
    <Router>
        <Route path="/" component={Panel}>
            <IndexRoute component={Home}/>
            <Route path=":id" component={ Application }/>
        </Route>
    </Router>
);

//<Route path="upload" component={ Upload }/>
//    <Route path="profile">
//    <IndexRoute component={Profile}/>
//    <Route path="applications" component={ProfileApps}/>
//    <Route path="uploaded" component={ProfileDevApps}/>
//    </Route>
//    <Route path="*" component={Spinner}/>