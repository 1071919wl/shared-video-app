import React from "react";
import {Route, Redirect, Switch, Link, HashRouter} from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import LoginFormContainer from './session_form/login_form_container';
import SignupFormContainer from './session_form/signup_form_container';
import Clip from './clip/clip'
import Account from './account/account'
import ClipItem from './clip/clip_item'
// import { PUSHER_CONFIG } from "../../config/pusher.config";
// import { PusherProvider } from "./PusherContext";


const App = () => {


    return (
        <div>
            <Switch>
                <AuthRoute path="/login" component={LoginFormContainer} />
                <AuthRoute path="/signup" component={SignupFormContainer} />
                {/* <PusherProvider pusher={pusher}> */}
                    <ProtectedRoute exact path="/clip" component={Clip}/>
                    {/* <ProtectedRoute exact path="/clip/:id" component={ClipItem}/> */}
                    <Route exact path="/clip/:id" component={ClipItem}/>

                    <ProtectedRoute exact path="/Account" component={Account}/>
                {/* </PusherProvider> */}
            </Switch>
        </div>
    )

};

export default App;

