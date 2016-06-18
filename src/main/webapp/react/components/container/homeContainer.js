import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as applicationActions from '../../actions/applicationActions';
import * as profileActions from '../../actions/profileActions';

import Home from '../view/home';

function mapStateToProps(store) {
    return {
        applications: store.applicationState.applications,
        profileState : store.profileState
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, applicationActions, profileActions), dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);