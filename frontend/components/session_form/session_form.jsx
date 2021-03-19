import React from 'react';
import { Link } from 'react-router-dom';


class SessionForm extends React.Component{
    constructor(props){
        super(props);
        
        this.state={
            username: '',
            password: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDemo = this.handleDemo.bind(this);
    }

    handleInput(field){
        return e => 
            this.setState({
                [field]: e.target.value
            });
    };

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user);
    }

    renderErrors(){
        return(
            <ul>
                {this.props.errors.map((error, i) =>(
                    <li key={`error-${i}`}>
                        {error}
                    </li>
                ))}
            </ul>
        );
    }

    handleDemo(e) {
        const demoUser = {username: 'Demo@user.com', password: 123456}
        const user = Object.assign({}, demoUser);
        this.props.processForm(user);
    }

    componentWillUnmount() {
        this.props.removeErrors();
    }


    render(){
        return (
            <div className='userAuth'>
                <span className='login_title'>Customer Login</span>
                
                <div className='login_form_container'>

                    <div className='left_login'>
                        <h2 className='sub_title'>Registered Customers</h2>
                        <hr/>

                        <div className='error_message'>
                            {this.renderErrors()}
                        </div>


                        <form onSubmit={this.handleSubmit} className='login_form_box'>
                            <p>If you have an account, sign in with your username address.</p>
                            <label className='email_login'>Username<span className='asterisk'>*</span>
                                <input type="text" 
                                value={this.state.username}
                                onChange={this.handleInput('username')}
                                />
                            </label>

                            <label className='password_login'>Password<span className='asterisk'>*</span> 
                                <input type="password"
                                    value={this.state.password}
                                    onChange={this.handleInput('password')}
                                />
                            </label>

                            <button type="submit" value="Sign In" className='signinButton'>Sign In</button>
                            <span className='requried_field'>* Required Field</span>
                        </form>
                    </div>

                    <div className='spacer_login'></div>
                    
                    <div className='right_login'>
                        <h1 className='sub_title'>New Customers</h1>
                        <hr />
                        <div className='userOption'>
                            {this.props.formType === "login"
                                ? <Link to='/signup' className='createButton'>Create an account</Link>
                                : <Link to='/login' >Sign In</Link> 
                            }
                        
                            {/* <button type='submit' onClick={this.handleDemo} className='demoButton'>Demo User</button> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SessionForm;