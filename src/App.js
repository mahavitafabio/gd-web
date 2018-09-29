import React, { Component } from 'react';
import 'typeface-roboto'
import logo from './logo.svg';
import './App.css';
import SearchAppBar from './dashboard/SearchAppBar';
import Entreprises from './views/Entreprises';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SearchAppBar>
        </SearchAppBar>
        <Entreprises>
        </Entreprises>
      </div>
    );
  }
}

export default App;
