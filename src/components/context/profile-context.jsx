import React, { Component } from 'react';

const Context = React.createContext();

export class Provider extends Component {

    state = {
        profile : {xxx:'yyyy'}
    }

    componentDidMount() {

        console.log('componentDidMount');

        fetch('/api/get-profile', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'bearer ' + localStorage.getItem('token'), 
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.statusText === 'OK') {
                return response.json();
            }
        }).then(data => {
            if (data) {
                console.log('data ', data );
                this.setState({
                    profile: data
                });
            }
        }).catch(err => {
            // Error :(
        }); 
    }

    
    render() {
        return <Context.Provider value={this.state}>
                  {this.props.children}
              </Context.Provider>
    }
}

export const Consumer = Context.Consumer;
