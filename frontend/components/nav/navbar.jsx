import React from "react";
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/session_actions';


const NavBar = (props) => {

    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.session.id)

    function logoutUser() {
        dispatch(logout());

    }


    function getLinks() {
        if (loggedIn !== 0) {
            return (
                <div className='lefty'>
                    <Link to={'/account'} className='logoutButton'>Account</Link>
                    <button onClick={() => logoutUser()} className='logoutButton'>Logout</button>
                </div>
            );
        } else {
            return (
                <div className='right-navbar'>
                    <Link to={'/login'} className='signinButton'>Sign in</Link>
                </div>
            );
        }
    }

    return (
    
        <div className='navbar-container'>
            <div className='nav-header-bar'>
                <div className='left-navbar'>    
                    <Link to={'/clip'}>
                        <div className='brand-navbar'>Queue</div>
                    </Link>
                </div>
                <div>
                    {getLinks()}
                </div>
            </div>
        </div>
        

    )


}

export default NavBar;