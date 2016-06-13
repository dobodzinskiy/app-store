import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as applicationActions from '../../actions/applicationActions';

import Panel from '../view/panel';

function mapStateToProps(store) {
    return {
        topApplications: store.applicationState.topApplications
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(applicationActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel);