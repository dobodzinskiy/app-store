import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as applicationActions from '../../actions/applicationActions';

import ApplicationAdd from '../view/applicationAdd';

function mapDispatchToProps(dispatch) {
    return bindActionCreators(applicationActions, dispatch);
}
export default connect(mapDispatchToProps)(ApplicationAdd);
