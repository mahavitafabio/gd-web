import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import PrintIcon from '@material-ui/icons/Print';
import Ionicon from 'react-ionicons';

class CO extends React.Component {
  componentDidMount() {
    this.getCoList();
  }

  getCoList() {
    fetch('http://localhost:8080/Co')
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
        <Ionicon icon="md-brush" fontSize="35px" color="white"/>
        Modifier
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
export default CO;