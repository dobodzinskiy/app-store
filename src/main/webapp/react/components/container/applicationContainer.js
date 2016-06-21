import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as applicationActions from '../../actions/applicationActions';
import * as profileActions from '../../actions/profileActions';

import Application from '../view/application';

function mapStateToProps(store) {
    return {
        application: store.applicationState.application,
        applicationRates: store.applicationState.applicationRates,
        profileState : store.profileState
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, applicationActions, profileActions), dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Application);
