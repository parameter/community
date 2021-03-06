import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import './auth-form.css';

class AuthForm extends Component {

    constructor() {
        super();

        this.state = {
            authenticated: false,
            signup: false,
            email: '',
            password: ''
        }
    }

    login = (event) => {
        event.preventDefault();

        fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: this.state.email, password: this.state.password})
        }).then(response => {
            if (response.statusText === 'OK') {
                return response.json();
            }
        }).then(data => {
            if (data.success) {
                this.props.authService.authenticateUser(data.token);
                this.setState({authenticated: true});
            }
        }).catch(err => {
            // Error :(
        }); 
    }

    signup = (event) => {
        event.preventDefault();

        console.log(  JSON.stringify({email: this.state.email, password: this.state.password})  );

        fetch('/auth/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: this.state.email, password: this.state.password})
        }).then(function(response) {
            console.log( response );
        }).catch(function(err) {
            // Error :(
        });
    }

    logout = (event) => {
        fetch('/auth/signout', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        }).then(response => {
            if (response.statusText === 'OK') {
                return response.json();
            }
        }).then(data => {
            if (data.success) {
                this.props.authService.deauthenticateUser();
                this.setState({authenticated: false});
            }
        }).catch(err => {
            // Error :(
        });
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };

    setregister = event => {
        console.log('setregister');
        this.setState({signup: true});
    };

    componentDidMount() {
        console.log( this.state.email );
        if (this.props.authService.isUserAuthenticated()) {
            this.setState({
                authenticated: true,
                signup: false
            });
        }
    }

    render() {

        if (this.state.authenticated && this.state.signup === false) {
            return <div className="auth-form__logout">
                <p onClick={this.logout}>Logga av</p>
            </div>;
        }

        if (this.state.signup === false) {
            return <div className="auth-form">
                    <form className="auth-form__holder" onSubmit={this.login}>
                        <p className="auth-form__title">Logga in</p>
                        <TextField fullWidth margin="normal" label="email" type="email" value={this.state.email} onChange={this.handleChange('email')} variant="outlined" />
                        <TextField fullWidth margin="normal" label="password" type="password" value={this.state.password} onChange={this.handleChange('password')} variant="outlined" />
                        <Button className="auth-form__button" type="submit" variant="contained">Logga in!</Button>
                    </form>
                    <p className="auth-form__set-register" onClick={this.setregister}>Register</p>
                </div>
        } else {
            return <div className="auth-form">
                    <form className="auth-form__holder" onSubmit={this.signup}>
                        <p className="auth-form__title">Registrera</p>
                        <TextField fullWidth margin="normal" label="email" type="email" value={this.state.email} onChange={this.handleChange('email')} variant="outlined" />
                        <TextField fullWidth margin="normal" label="password" type="password" value={this.state.password} onChange={this.handleChange('password')} variant="outlined" />
                        <Button className="auth-form__button" type="submit" variant="contained">Registrera!</Button>
                    </form>
                </div>
        }
    }
};

export default AuthForm;
