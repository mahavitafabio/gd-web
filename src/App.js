import React, { Component } from 'react';
import 'typeface-roboto'
import logo from './logo.svg';
import './App.css';
import SearchAppBar from './dashboard/SearchAppBar';


class App extends Component {
  render() {
    return (
      <div className="App">
        <SearchAppBar>
        </SearchAppBar>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
