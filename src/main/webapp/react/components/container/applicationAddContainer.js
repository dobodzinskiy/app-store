import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as applicationActions from '../../actions/applicationActions';

import ApplicationAdd from '../view/applicationAdd';

function mapStateToProps(store) {
    return {
        uploadErrors: store.applicationState.uploadErrors
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(applicationActions, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ApplicationAdd);
