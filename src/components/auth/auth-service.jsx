const AuthService =  {

    isAuthenticated: false,

    /**
     * Authenticate a user. Save a token string in Local Storage
     *
     * @param {string} token
     */
    authenticateUser: function(token) {
      localStorage.setItem('token', token);
      this.isAuthenticated = true;
      console.log('this.isAuthenticated',this.isAuthenticated);
    },
   
    /**
     * Check if a user is authenticated - check if a token is saved in Local Storage
     *
     * @returns {boolean}
     */
    isUserAuthenticated: function() {
      return localStorage.getItem('token') !== null;
    },
  
    /**
     * Deauthenticate a user. Remove a token from Local Storage.
     *
     */
    deauthenticateUser: function() {
        console.log( 'deauthenticateUser' );
      localStorage.removeItem('token');
      this.isAuthenticated = false;
      console.log(this.isAuthenticated);
    },
  
    /**
     * Get a token value.
     *
     * @returns {string}
     */
  
    getToken: function() {
      return localStorage.getItem('token');
    }
  
  }
  
  export default AuthService;