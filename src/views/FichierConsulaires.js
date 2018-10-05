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

class FichierConsulaires extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        valueList: [],
        isAddDrawerOpen: false,
        newFichierConsulaire: {}
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
  
  handleClickOpen = () => {
    this.setState({ isAddDrawerOpen: true });
  };

  handleClose = () => {
    this.setState({ isAddDrawerOpen: false });
  };
  
  saveFichierConsulaire = () => {
    console.log(JSON.stringify(this.state.newFichierConsulaire));
  };
  
  handleChange(event) {
    let newFichierConsulaire = Object.assign({}, this.state.newFichierConsulaire);
    console.log(event.target);
    if (event.target.id === 'raison-social') {
      newFichierConsulaire.raisonSocial = event.target.value;
    } else if (event.target.id === 'adresse') {
      newFichierConsulaire.adresse = event.target.value;
    } else if (event.target.id === 'capital-consulaire') {
      newFichierConsulaire.capital = event.target.value;
    } else if (event.target.id === 'date-creation') {
      newFichierConsulaire.createdDate = event.target.value;
    } else if (event.target.id === 'email-consulaire') {
      newFichierConsulaire.email = event.target.value;
    } else if (event.target.id === 'forme-juridique') {
      newFichierConsulaire.formeJuridique = event.target.value;
    } else if (event.target.id === 'numero-fiscal') {
      newFichierConsulaire.numeroFiscal = event.target.value;
    } else if (event.target.id === 'numero-identite') {
      newFichierConsulaire.numeroIdentite = event.target.value;
    } else if (event.target.id === 'numero-registre') {
      newFichierConsulaire.numeroRegistre = event.target.value;
    } else if (event.target.id === 'sigle-consulaire') {
      newFichierConsulaire.sigle = event.target.value;
    } else if (event.target.id === 'date-modification') {
      newFichierConsulaire.updatedDate = event.target.value;
    }
    this.setState({newFichierConsulaire});
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
              <TableCell>Consulaire Id</TableCell>
              <TableCell>Raison social</TableCell>
              <TableCell>Adresse</TableCell>
              <TableCell>Capital</TableCell>
              <TableCell>Date de création</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Forme juridique</TableCell>
              <TableCell>Numéro fiscal</TableCell>
              <TableCell>Numéro identite</TableCell>
              <TableCell>Numéro registre</TableCell>
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
                  <TableCell>{row.raisonSocial}</TableCell>
                  <TableCell>{row.adresse}</TableCell>
                  <TableCell>{row.capital}</TableCell>
                  <TableCell>{row.createdDate}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.formeJuridique}</TableCell>
                  <TableCell>{row.numeroFiscal}</TableCell>
                  <TableCell>{row.numeroIdentite}</TableCell>
                  <TableCell>{row.numeroRegistre}</TableCell>
                  <TableCell>{row.sigle}</TableCell>
                  <TableCell>{row.updatedDate}</TableCell>
                  
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        </Paper>
        <Dialog open={this.state.isAddDrawerOpen} aria-labelledby="simple-dialog-title">
          <DialogTitle id="simple-dialog-title">Ajouter un Fichier Consulaire</DialogTitle>
          <DialogContent>
            <TextField
              id="raison-social"
              label="Raison social"
              placeholder="Raison social"
              multiline
              margin="normal"
              value={this.state.newFichierConsulaire.raisonSocial}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="adresse"
              label="Adresse"
              placeholder="Adresse"
              multiline
              margin="normal"
              value={this.state.newFichierConsulaire.adresse}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="capital-consulaire"
              label="Capital"
              type="number"
              margin="normal"
              value={this.state.newFichierConsulaire.capital}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="date-creation"
              label="Date création"
              type="date"
              margin="normal"
              value={this.state.newFichierConsulaire.createdDate}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="email-consulaire"
              label="Email"
              placeholder="Email"
              margin="normal"
              value={this.state.newFichierConsulaire.email}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="forme-juridique"
              label="Forme juridique"
              placeholder="Forme juridique"
              multiline
              margin="normal"
              value={this.state.newFichierConsulaire.formeJuridique}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="numero-fiscal"
              label="Numéro fiscal"
              type="number"
              margin="normal"
              value={this.state.newFichierConsulaire.numeroFiscal}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="numero-identite"
              label="Numéro fiscal"
              type="number"
              margin="normal"
              value={this.state.newFichierConsulaire.numeroIdentite}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="numero-registre"
              label="Numéro registre"
              type="number"
              margin="normal"
              value={this.state.newFichierConsulaire.numeroRegistre}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="sigle-consulaire"
              label="Sigle"
              placeholder="Sigle"
              margin="normal"
              value={this.state.newFichierConsulaire.sigle}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="date-modification"
              label="Date modification"
              type="date"
              margin="normal"
              value={this.state.newFichierConsulaire.updatedDate}
              onChange={this.handleChange.bind(this)}
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" onClick={this.saveFichierConsulaire}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default FichierConsulaires;