import React, { Component } from 'react';
import MyProfile from './my-profile/my-profile';
import AuthService from './auth/auth-service';
import AuthForm from './auth/auth-form';
import NavigationComp from './navigation';
import { Consumer } from './context/profile-context';

class HomeComp extends Component {
    render() {
        return <div>
            <AuthForm isAuthenticated={AuthService.isAuthenticated} authService={AuthService} />
            <NavigationComp />
            <Consumer>
                {value => {
                    console.log(value);
                    return <MyProfile context={value} />
                }}
            </Consumer>
        </div>
    }
};

export default HomeComp;
