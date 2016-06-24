import { Router,    Route, IndexRoute } from 'react-router';
import React from 'react';

import Panel from './components/container/panelContainer';
import Home from './components/container/homeContainer';
import Application from './components/container/applicationContainer';
import Spinner from './components/view/spinner';
import Profile from './components/container/profileContainer';
import ProfileApps from './components/container/profileAppsContainer';
import ApplicationAdd from './components/container/applicationAddContainer';

export default (
    <Router>
        <Route path="/" component={Panel}>
            <IndexRoute component={Home}/>
            <Route path="/app/:id" component={ Application }/>
            <Route path="profile">
                <IndexRoute component={Profile}/>
                <Route path="applications" component={ProfileApps}/>
            </Route>
            <Route path="upload" component={ ApplicationAdd }/>
            <Route path="*" component={Spinner}/>
        </Route>
    </Router>
);