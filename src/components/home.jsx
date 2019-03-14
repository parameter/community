import React, { Component } from 'react';
import MyProfile from './my-profile/my-profile';
import AuthService from './auth/auth-service';
import AuthForm from './auth/auth-form';

class HomeComp extends Component {
    render() {
        return <div><AuthForm isAuthenticated={AuthService.isAuthenticated} authService={AuthService} /><MyProfile /></div>
    }
};

export default HomeComp;
