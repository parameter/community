import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import HomeComp from './components/home';
 
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={HomeComp} />
      </BrowserRouter>
    );
  }
}

export default App;
