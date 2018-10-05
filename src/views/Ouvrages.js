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

class Ouvrages extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        valueList: [],
        isAddDrawerOpen: false,
        newOuvrage: {}
      };
  }

  componentDidMount() {
    this.getOuvrageList();
  }

  getOuvrageList() {
    fetch('http://localhost:8080/ouvrage')
    .then(result=>result.json())
    .then(items=>this.setState({valueList: items}));
  }

  handleClickOpen = () => {
    this.setState({ isAddDrawerOpen: true });
  };

  handleClose = () => {
    this.setState({ isAddDrawerOpen: false });
  };
  
  saveOuvrage = () => {
    console.log(JSON.stringify(this.state.newOuvrage));
  };

  handleChange(event) {
    let newOuvrage = Object.assign({}, this.state.newOuvrage);
    console.log(event.target);
    if (event.target.id === 'code-ouvrages') {
      newOuvrage.codeOuvrages = event.target.value;
    } else if (event.target.id === 'commentaire-ouvrage') {
      newOuvrage.commentaire = event.target.value;
    } else if (event.target.id === 'ouvrage-domaine') {
      newOuvrage.domaines = event.target.value;
    } else if (event.target.id === 'ouvrage-etage') {
      newOuvrage.etage = event.target.value;
    } else if (event.target.id === 'nombre-exemplaire') {
      newOuvrage.nombreExemplaire = event.target.value;
    } else if (event.target.id === 'ouvrage-ranger') {
      newOuvrage.ranger = event.target.value;
    } else if (event.target.id === 'titre-ouvrage') {
      newOuvrage.titreOuvrages = event.target.value;
    } 
    this.setState({newOuvrage});
  }

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
              <TableCell>Ouvrage Id</TableCell>
              <TableCell>Code ouvrage</TableCell>
              <TableCell>Commentaire</TableCell>
              <TableCell>Domaine</TableCell>
              <TableCell>Etage</TableCell>
              <TableCell>Nombre d'exemplaire</TableCell>
              <TableCell>Ranger</TableCell>
              <TableCell>Titre ouvrage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.valueList.map(row => {
              return (
                <TableRow key={row.ouvrageId}>
                  <TableCell component="th" scope="row">
                    {row.ouvrageId}
                  </TableCell>
                  <TableCell>{row.codeOuvrages}</TableCell>
                  <TableCell>{row.commentaire}</TableCell>
                  <TableCell>{row.domaines}</TableCell>
                  <TableCell>{row.etage}</TableCell>
                  <TableCell>{row.nombreExemplaire}</TableCell>
                  <TableCell>{row.ranger}</TableCell>
                  <TableCell>{row.titreOuvrages}</TableCell>

                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        </Paper>
        <Dialog open={this.state.isAddDrawerOpen} aria-labelledby="simple-dialog-title">
          <DialogTitle id="simple-dialog-title">Ajouter un Ouvrage</DialogTitle>
          <DialogContent>
            <TextField
              id="code-ouvrage"
              label="Code ouvrage"
              type="number"
              margin="normal"
              value={this.state.newOuvrage.codeOuvrages}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="commentaire-ouvrage"
              label="Commentaire"
              placeholder="Commentaire"
              multiline
              margin="normal"
              value={this.state.newOuvrage.commentaire}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="ouvrage-domaine"
              label="Domaine"
              placeholder="Domaine"
              margin="normal"
              value={this.state.newOuvrage.domaines}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="ouvrage-etage"
              label="Etage"
              type="number"
              margin="normal"
              value={this.state.newOuvrage.etage}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="nombre-exemplaire"
              label="Nombre exemplaire"
              type="number"
              margin="normal"
              value={this.state.newOuvrage.nombreExemplaire}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="ouvrage-ranger"
              label="Rangé"
              type="number"
              margin="normal"
              value={this.state.newOuvrage.ranger}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="titre-ouvrage"
              label="Titre ouvrage"
              placeholder="titre ouvrage"
              multiline
              margin="normal"
              value={this.state.newOuvrage.titreOuvrages}
              onChange={this.handleChange.bind(this)}
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" onClick={this.saveOuvrage}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default Ouvrages;