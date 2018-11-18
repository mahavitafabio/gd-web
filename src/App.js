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
import Commerces from './views/Commerces';
import Revue from './views/Revue';
import Guide from './views/Guide';
import Services from './views/Services';
import Manuel from './views/Manuel';
import Autres from './views/Autres';
import Co2017 from './views/Co2017';
import Co2018 from './views/Co2018';
import Co2019 from './views/Co2019';
import Co2020 from './views/Co2020';
import Co2021 from './views/Co2021';
import Co2022 from './views/Co2022';
import Co2023 from './views/Co2023';

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
        toolbar: () => <SearchAppBar header="Industries" onSearch={this.onSearch.bind(this)} searchString={this.state.searchString}/>,
        main: () => <Entreprises searchString={this.state.searchString}/>
      },
      {
        path: "/entreprises",
        toolbar: () => <SearchAppBar header="Industries" onSearch={this.onSearch.bind(this)} searchString={this.state.searchString}/>,
        main: () => <Entreprises searchString={this.state.searchString} />
      },
      {
        path: "/commerces",
        toolbar: () => <SearchAppBar header="Commerces" onSearch={this.onSearch.bind(this)} searchString={this.state.searchString}/>,
        main: () => <Commerces searchString={this.state.searchString} />
      },
      {
        path: "/guide",
        toolbar: () => <SearchAppBar header="Guides" onSearch={this.onSearch.bind(this)} searchString={this.state.searchString}/>,
        main: () => <Guide searchString={this.state.searchString} />
      },
      {
        path: "/manuel",
        toolbar: () => <SearchAppBar header="Manuels" onSearch={this.onSearch.bind(this)} searchString={this.state.searchString}/>,
        main: () => <Manuel searchString={this.state.searchString} />
      },
      {
        path: "/services",
        toolbar: () => <SearchAppBar header="Services" onSearch={this.onSearch.bind(this)} searchString={this.state.searchString}/>,
        main: () => <Services searchString={this.state.searchString} />
      },
      {
        path: "/revue",
        toolbar: () => <SearchAppBar header="Revues" onSearch={this.onSearch.bind(this)} searchString={this.state.searchString}/>,
        main: () => <Revue searchString={this.state.searchString} />
      },
      {
        path: "/autres",
        toolbar: () => <SearchAppBar header="Autres" onSearch={this.onSearch.bind(this)} searchString={this.state.searchString}/>,
        main: () => <Autres searchString={this.state.searchString} />
      },
      {
        path: "/fichier-consulaires",
        toolbar: () => <SearchAppBar header="Fichier Consulaires" onSearch={this.onSearch.bind(this)} searchString={this.state.searchString}/>,
        main: () => <FichierConsulaires searchString={this.state.searchString} />
      },
      {
        path: "/ouvrages",
        toolbar: () => <SearchAppBar header="Ouvrages" onSearch={this.onSearch.bind(this)} searchString={this.state.searchString}/>,
        main: () => <Ouvrages searchString={this.state.searchString} />
      },
      {
        path: "/co2017",
        toolbar: () => <SearchAppBar header="Co2017" onSearch={this.onSearch.bind(this)} searchString={this.state.searchString}/>,
        main: () => <Co2017 searchString={this.state.searchString} />
      },
      {
        path: "/co2018",
        toolbar: () => <SearchAppBar header="Co2018" onSearch={this.onSearch.bind(this)} searchString={this.state.searchString}/>,
        main: () => <Co2018 searchString={this.state.searchString} />
      },
      {
        path: "/co2019",
        toolbar: () => <SearchAppBar header="Co2019" onSearch={this.onSearch.bind(this)} searchString={this.state.searchString}/>,
        main: () => <Co2019 searchString={this.state.searchString} />
      },
      {
        path: "/co2020",
        toolbar: () => <SearchAppBar header="Co2020" onSearch={this.onSearch.bind(this)} searchString={this.state.searchString}/>,
        main: () => <Co2020 searchString={this.state.searchString} />
      },
      {
        path: "/co2021",
        toolbar: () => <SearchAppBar header="Co2021" onSearch={this.onSearch.bind(this)} searchString={this.state.searchString}/>,
        main: () => <Co2021 searchString={this.state.searchString} />
      },
      {
        path: "/co2022",
        toolbar: () => <SearchAppBar header="Co2022" onSearch={this.onSearch.bind(this)} searchString={this.state.searchString}/>,
        main: () => <Co2022 searchString={this.state.searchString} />
      },
      {
        path: "/co2023",
        toolbar: () => <SearchAppBar header="Co2023" onSearch={this.onSearch.bind(this)} searchString={this.state.searchString}/>,
        main: () => <Co2023 searchString={this.state.searchString} />
      },
      {
        path: "/certificat",
        toolbar: () => <SearchAppBar header="Certificat Origine" onSearch={this.onSearch.bind(this)} searchString={this.state.searchString}/>,
        main: () => <CertificatOrigine searchString={this.state.searchString} />
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
