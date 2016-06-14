import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as applicationActions from '../../actions/applicationActions';
import * as profileActions from '../../actions/profileActions';

import Panel from '../view/panel';

function mapStateToProps(store) {
    return {
        topApplications: store.applicationState.topApplications,
        profileState : store.profileState
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(applicationActions, profileActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel);