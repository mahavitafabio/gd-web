import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ViewHeader from './ViewHeader';
import Paper from '@material-ui/core/Paper';

const paperStyle = {
  width: '100%',
  marginTop: '5px',
  overflowX: 'auto',
  marginTop: '25px',
  padding: '25px',
  backgroundColor: 'lightgray'
}

const tableStyle = {
  backgroundColor: 'white'
}

class FichierConsulaires extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        valueList: [],
      };
  }


  componentDidMount() {
    this.getFichierConsulaireList();
  }

  getFichierConsulaireList() {
    fetch('http://localhost:8080/fichier-consulaire')
    .then(result=>result.json())
    .then(items=>this.setState({valueList: items}));
  }

  render() {
    const viewStyle= {
        height: '100%',
        marginTop: '10px'
    };

    return (
      <div style={viewStyle}>
        <ViewHeader/>
        <Paper style={paperStyle}>
        <Table style={tableStyle}>
          <TableHead>
            <TableRow>
              <TableCell>Consulaire Id</TableCell>
              <TableCell>Adresse</TableCell>
              <TableCell>Capital</TableCell>
              <TableCell>Date de création</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Forme juridique</TableCell>
              <TableCell>Numéro fiscal</TableCell>
              <TableCell>Numéro identite</TableCell>
              <TableCell>Numéro registre</TableCell>
              <TableCell>Raison social</TableCell>
              <TableCell>Sigle</TableCell>
              <TableCell>Date de modification</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.valueList.map(row => {
              return (
                <TableRow key={row.consulaireId}>
                  <TableCell component="th" scope="row">
                    {row.consulaireId}
                  </TableCell>
                  <TableCell>{row.adresse}</TableCell>
                  <TableCell>{row.capital}</TableCell>
                  <TableCell>{row.createdDate}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.formJuridique}</TableCell>
                  <TableCell>{row.numeroFiscal}</TableCell>
                  <TableCell>{row.numeroIdentite}</TableCell>
                  <TableCell>{row.numeroRegistre}</TableCell>
                  <TableCell>{row.raisonSocial}</TableCell>
                  <TableCell>{row.sigle}</TableCell>
                  <TableCell>{row.updatedDate}</TableCell>
                  
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        </Paper>
      </div>
    );
  }
}
export default FichierConsulaires;