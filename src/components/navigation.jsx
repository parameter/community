import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavigationComp extends Component {
    render() {
        return <nav className="navigation">
                  <Link to='/'>Home</Link>
                  <Link to='/finder'>Finder</Link>
               </nav>
    }
};

export default NavigationComp;
