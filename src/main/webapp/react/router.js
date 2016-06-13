import { Router,    Route, IndexRoute } from 'react-router';
import React from 'react';

import Panel from './components/container/panelContainer';
import Home from './components/container/homeContainer';

export default (
    <Router>
        <Route path="/" component={Panel}>
        </Route>
    </Router>
);
//<Route path="applications">
//    <Route path=":type/:id" component={ Application }/>
//</Route>
//<Route path="profile">
//    <IndexRoute component={Profile}/>
//    <Route path="applications" component={ProfileApps}/>
//    <Route path="uploaded" component={ProfileDevApps}/>
//</Route>
//<Route path="*" component={Spinner}/>
