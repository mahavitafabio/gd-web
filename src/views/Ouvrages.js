import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import PrintIcon from '@material-ui/icons/Print';
import Ionicon from 'react-ionicons';

class Ouvrages extends React.Component {
  componentDidMount() {
    this.getOuvrageList();
  }

  getOuvrageList() {
    fetch('http://localhost:8080/Ouvrages')
      .then(( results ) => console.log(results.json()));
  }
  render() {
    const viewStyle= {
        height: '100%',
        marginTop: '10px'
    };
    const buttonStyle= {
        marginLeft: '40px'
    };

    return (
      <div style={viewStyle}>
       <div>
        
        <Button variant="contained" color="primary" style={buttonStyle}>
        <Ionicon icon="md-add" fontSize="35px" color="white"/>
        Ajouter
        </Button>
        <Button variant="contained" color="primary" style={buttonStyle}>
        <Ionicon icon="md-cloud-upload" fontSize="35px" color="white"/>
        Importer
        </Button>
        <Button variant="contained" color="primary" style={buttonStyle}>
        <Ionicon icon="md-cloud-download" fontSize="35px" color="white"/>
        Exporter
        </Button>
        <Button variant="contained" color="primary" style={buttonStyle}>
        <Ionicon icon="md-print" fontSize="35px" color="white"/>
        Imprimer
      </Button>
       </div>
      </div>
    );
  }
}
export default Ouvrages;