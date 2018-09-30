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

class Entreprises extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        valueList: [],
      };
  }


  componentDidMount() {
    this.getEntrepriseList();
  }

  getEntrepriseList() {
    fetch('http://localhost:8080/enterprise')
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
              <TableCell>Entreprise Id</TableCell>
              <TableCell>Nom Entreprise</TableCell>
              <TableCell>Address Enterprise</TableCell>
              <TableCell>Activite Principale</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Nom Responsable</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.valueList.map(row => {
              return (
                <TableRow key={row.entreprisesId}>
                  <TableCell component="th" scope="row">
                    {row.entreprisesId}
                  </TableCell>
                  <TableCell>{row.nomEntreprise}</TableCell>
                  <TableCell>{row.adresseEntreprise}</TableCell>
                  <TableCell>{row.activitePrincipale}</TableCell>
                  <TableCell>{row.contact}</TableCell>
                  <TableCell>{row.nomResponsable}</TableCell>
                  
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
export default Entreprises;