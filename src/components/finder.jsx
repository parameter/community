import React, { Component } from 'react';
import Find from './find/find';
import AuthService from './auth/auth-service';
import AuthForm from './auth/auth-form';
import NavigationComp from './navigation';

class FinderComp extends Component {
    render() {
        return <div>
                  <AuthForm isAuthenticated={AuthService.isAuthenticated} authService={AuthService} />
                  <NavigationComp />
                  Qwertyu
                  <Find />
              </div>
    }
};

export default FinderComp;
