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

class CO extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        valueList: [],
        isAddDrawerOpen: false,
      };
  }


  componentDidMount() {
    this.getCoList();
  }

  getCoList() {
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
              <TableCell>Adresse Enterprise</TableCell>
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
          <DialogTitle id="simple-dialog-title">Ajouter un CO</DialogTitle>
          <DialogContent>
            <TextField
              id="nom-entreprise"
              label="Nom entreprise"
              placeholder="Nom entreprise"
              margin="normal"
            />
            <br/>
            <TextField
              id="enterprise-adresse"
              label="Adresse"
              placeholder="Adresse"
              multiline
              margin="normal"
            />
            <br/>
            <TextField
              id="activite-principale"
              label="Activite principale"
              placeholder="Activite principale"
              multiline
              margin="normal"
            />
            <br/>
            <TextField
              id="entreprise-contact"
              label="Contact"
              type="number"
              margin="normal"
            />
            <br/>
            <TextField
              id="nom-responsable"
              label="Nom responsable"
              placeholder="Nom responsable"
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
export default CO;