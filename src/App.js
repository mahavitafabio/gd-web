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

const routes = [
  {
    path: "/",
    exact: true,
    toolbar: () => <SearchAppBar />,
    main: () => <Entreprises />
  },
  {
    path: "/entreprises",
    toolbar: () => <SearchAppBar/>,
    main: () => <Entreprises />
  },
  {
    path: "/fichier-consulaires",
    toolbar: () => <SearchAppBar/>,
    main: () => <FichierConsulaires />
  },
  {
    path: "/ouvrages",
    toolbar: () => <SearchAppBar />,
    main: () => <Ouvrages />
  },
  {
    path: "/certificat",
    toolbar: () => <SearchAppBar />,
    main: () => <CertificatOrigine />
  }
];

class App extends Component {
  render() {
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
