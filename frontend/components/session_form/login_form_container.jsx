import { connect } from 'react-redux';
import React from 'react';
import SessionForm from './session_form';
import { Link } from 'react-router-dom';
import { login } from '../../actions/session_actions';
import { removeErrors } from '../../actions/session_actions';


const mapStateToProps = (state, ownProps) => {
    return {
        errors: state.errors.session,
        formType: 'login',
        // navLink: <Link to="/signup">sign up instead</Link>
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        processForm: (user) => dispatch(login(user)),
        removeErrors: () => dispatch(removeErrors())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);