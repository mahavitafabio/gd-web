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
import Checkbox from '@material-ui/core/Checkbox';

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
const numSelected = 0;
const rowCount = 0;
class CertificatOrigine extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        valueList: [],
        isAddDrawerOpen: false,
        newCertificatOrigine: {},
        selected: [],
        operation: 'POST',
        enableEdit: false
      };
  }


  componentDidMount() {
    this.getCoList();
  }

  getCoList() {
    fetch('http://localhost:8080/certificat')
    .then(result=>result.json())
    .then(items=>this.setState({valueList: items}));
  }
  
  handleOpenNew = () => {
    this.setState({ operation: 'POST' });
    this.setState({ isAddDrawerOpen: true });
    this.setState({newCertificatOrigine:{}});
  };

  handleOpenEdit = () => {
    let newCertificatOrigine = this.state.valueList.find(o => o.certificatId === this.state.selected[0]);
    console.log(JSON.stringify(newCertificatOrigine));
    this.setState({ newCertificatOrigine });
    this.setState({ operation: 'PUT' });
    this.setState({ isAddDrawerOpen: true });
  };

  handleClose = () => {
    this.setState({ isAddDrawerOpen: false });
  };

  saveCertificatOrigine = () => {
    let self = this;
    console.log(JSON.stringify(this.state.newCertificatOrigine));
    fetch('http://localhost:8080/certificat', {
      method: this.state.operation,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.newCertificatOrigine)
    }).then(function() {
      self.getCoList();
    }).catch(function (error) {
      alert("Sauvegarde impossible! Veuiller verifier les informations introduitent et réessayer s'il vous plait.");
    });
    this.handleClose();
    this.setState({newCertificatOrigine:{}});
  };

  handleChange(event) {
    let newCertificatOrigine = Object.assign({}, this.state.newCertificatOrigine);
    console.log(event.target);
    if (event.target.id === 'co-numero') {
      newCertificatOrigine.numero = event.target.value;
    } else if (event.target.id === 'co-date') {
      newCertificatOrigine.date = event.target.value;
    } else if (event.target.id === 'co-nom-entreprise') {
      newCertificatOrigine.nomEntreprise = event.target.value;
    } else if (event.target.id === 'co-adresse') {
      newCertificatOrigine.adresse = event.target.value;
    } else if (event.target.id === 'co-destination') {
      newCertificatOrigine.destination = event.target.value;
    } else if (event.target.id === 'co-produit') {
      newCertificatOrigine.produit = event.target.value;
    } else if (event.target.id === 'co-quatite-export') {
      newCertificatOrigine.quantiteExporte = event.target.value;
    } else if (event.target.id === 'co-unite') {
      newCertificatOrigine.unite = event.target.value;
    } else if (event.target.id === 'co-nombre-conteneur') {
      newCertificatOrigine.nombreConteneur = event.target.value;
    } else if (event.target.id === 'co-prix_unitaire') {
      newCertificatOrigine.prixUnitaire = event.target.value;
    } else if (event.target.id === 'co-montant') {
      newCertificatOrigine.montant = event.target.value;
    }
    this.setState({newCertificatOrigine});
  }

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    if (newSelected && newSelected.length === 1) {
      this.setState({ enableEdit: true });
    } else {
      this.setState({ enableEdit: false });
    }
    this.setState({ selected: newSelected });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const viewStyle= {
        height: '100%',
        marginTop: '10px'
    };

    return (
      <div style={viewStyle}>
        <ViewHeader addButtonHandler={this.handleOpenNew.bind(this)}
        editButtonHandler={this.handleOpenEdit.bind(this)} enableEdit={this.state.enableEdit}/>
        <Paper style={paperStyle}>
        <Table style={tableStyle}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
              </TableCell>
              <TableCell>Certificat Origine Id</TableCell>
              <TableCell>Numero</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Nom entreprise</TableCell>
              <TableCell>Adresse</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Produit</TableCell>
              <TableCell>Quantité exporté</TableCell>
              <TableCell>Unité</TableCell>
              <TableCell>Nombre de conteneur</TableCell>
              <TableCell>Prix unitaire</TableCell>
              <TableCell>Montant</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.valueList.map(row => {
              const isSelected = this.isSelected(row.certificatId);
              return (
                <TableRow key={row.certificatId}
                      hover
                      onClick={event => this.handleClick(event, row.certificatId)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox checked={isSelected} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.certificatId}
                  </TableCell>
                  <TableCell>{row.numero}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.nomEntreprise}</TableCell>
                  <TableCell>{row.adresse}</TableCell>
                  <TableCell>{row.destination}</TableCell>
                  <TableCell>{row.produit}</TableCell>
                  <TableCell>{row.quantiteExporte}</TableCell>
                  <TableCell>{row.unite}</TableCell>
                  <TableCell>{row.nombreConteneur}</TableCell>
                  <TableCell>{row.prixUnitaire}</TableCell>
                  <TableCell>{row.montant}</TableCell>
                  
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
              id="co-numero"
              label="Numéro"
              type="number"
              margin="normal"
              value={this.state.newCertificatOrigine.numero}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="co-date"
              label="Date"
              type="date"
              margin="normal"
              value={this.state.newCertificatOrigine.date}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="co-nom-entreprise"
              label="Nom entreprise"
              placeholder="Nom entreprise"
              margin="normal"
              value={this.state.newCertificatOrigine.nomEntreprise}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="co-adresse"
              label="Adresse"
              placeholder="Adresse"
              multiline
              margin="normal"
              value={this.state.newCertificatOrigine.adresse}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="co-destination"
              label="Destination"
              placeholder="Destination"
              multiline
              margin="normal"
              value={this.state.newCertificatOrigine.destination}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="co-produit"
              label="Produit"
              placeholder="Produit"
              margin="normal"
              value={this.state.newCertificatOrigine.produit}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="co-quatite-export"
              label="Quantité exporté"
              type="number"
              margin="normal"
              value={this.state.newCertificatOrigine.quantiteExporte}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="co-unite"
              label="Unité"
              placeholder="Unité"
              margin="normal"
              value={this.state.newCertificatOrigine.unite}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="co-nombre-conteneur"
              label="Nombre de conteneur"
              type="number"
              margin="normal"
              value={this.state.newCertificatOrigine.nombreConteneur}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="co-prix_unitaire"
              label="Prix unitaire"
              placeholder="Prix unitaire"
              margin="normal"
              value={this.state.newCertificatOrigine.prixUnitaire}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="co-montant"
              label="Montant"
              type="number"
              margin="normal"
              value={this.state.newCertificatOrigine.montant}
              onChange={this.handleChange.bind(this)}
            />


          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" onClick={this.saveCertificatOrigine}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default CertificatOrigine;