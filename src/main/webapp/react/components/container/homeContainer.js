import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getApplications } from '../../actions/applicationActions';

import Home from '../view/home';

const mapStateToProps = function (store) {
    return {
        applications: store.applicationState.applications
    }
};
const mapDispatchToProps = (dispatch) => bindActionCreators({
    getApplications
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);