import {connect} from 'react-redux';
import React from 'react';
import SessionForm from './session_form';
import { Link } from 'react-router-dom';
import { signup } from '../../actions/session_actions';
import SignUpForm from './signup_form';

import { removeErrors } from '../../actions/session_actions';


const mapStateToProps = (state, ownProps) => {
    return{ 
        errors: state.errors.session,
        formType: 'signup',
        // navLink: <Link to="/login">log in instead</Link>
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        signupForm: (user) => dispatch(signup(user)),
        removeErrors: () => dispatch(removeErrors())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);