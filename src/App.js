import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomeComp from './components/home';
import FindComp from './components/finder';
import './App.css';

class App extends Component {
  render() {
    return (
          <Switch>
            <Route path="/" component={HomeComp} exact />
            <Route path="/finder" component={FindComp} />
          </Switch>
    );
  }
}

export default App;
