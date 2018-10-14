import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'typeface-roboto'
import logo from './logo.svg';
import './App.css';
import SearchAppBar from './dashboard/SearchAppBar';
import Entreprises from './views/Entreprises';
import Ouvrages from './views/Ouvrages';
import FichierConsulaires from './views/FichierConsulaires';
import CertificatOrigine from './views/CertificatOrigine';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: ''
    }
  }

  onSearch(event) {
    this.setState({ searchString: event.target.value });
  }

  render() {
    const routes = [
      {
        path: "/",
        exact: true,
        toolbar: () => <SearchAppBar header="Entreprises" onSearch={this.onSearch.bind(this)} searchString={this.state.searchString}/>,
        main: () => <Entreprises searchString={this.state.searchString}/>
      },
      {
        path: "/entreprises",
        toolbar: () => <SearchAppBar header="Entreprises"/>,
        main: () => <Entreprises />
      },
      {
        path: "/fichier-consulaires",
        toolbar: () => <SearchAppBar header="Fichier Consulaires"/>,
        main: () => <FichierConsulaires />
      },
      {
        path: "/ouvrages",
        toolbar: () => <SearchAppBar header="Ouvrages"/>,
        main: () => <Ouvrages />
      },
      {
        path: "/certificat",
        toolbar: () => <SearchAppBar header="Certificat Origine"/>,
        main: () => <CertificatOrigine />
      }
    ];
    return (
      <Router>
        <div className="App">
          {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.toolbar}
              />
            ))}
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
          ))}
        </div>
      </Router>
    );
  }
}

export default App;
