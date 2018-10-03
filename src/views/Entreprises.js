import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ViewHeader from './ViewHeader';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
        isAddDrawerOpen: false,
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

  handleClickOpen = () => {
    this.setState({ isAddDrawerOpen: true });
  };

  handleClose = () => {
    this.setState({ isAddDrawerOpen: false });
  };

  render() {
    const viewStyle= {
        height: '100%',
        marginTop: '10px'
    };

    return (
      <div style={viewStyle}>
        <ViewHeader addButtonHandler={this.handleClickOpen.bind(this)}/>
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
        <Dialog open={this.state.isAddDrawerOpen} aria-labelledby="simple-dialog-title">
          <DialogTitle id="simple-dialog-title">Ajouter un Entreprise</DialogTitle>
          <DialogContent>
            <TextField
              id="entreprise-name"
              label="Name"
              placeholder="Name"
              margin="normal"
            />
            <br/>
            <TextField
              id="enterprise-address"
              label="Address"
              placeholder="Address"
              multiline
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default Entreprises;