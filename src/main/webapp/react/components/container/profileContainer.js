import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Profile from '../view/profile';

function mapStateToProps(store) {
    return {
        profileState : store.profileState
    };
}
export default connect(mapStateToProps)(Profile);