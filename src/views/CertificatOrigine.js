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

class CertificatOrigine extends React.Component {

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
    fetch('http://localhost:8080/certificat')
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
              return (
                <TableRow key={row.certificatId}>
                  <TableCell component="th" scope="row">
                    {row.certificatId}
                  </TableCell>
                  <TableCell>{row.numero}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.nomEntreprise}</TableCell>
                  <TableCell>{row.adresse}</TableCell>
                  <TableCell>{row.destination}</TableCell>
                  <TableCell>{row.produit}</TableCell>
                  <TableCell>{row.quantiteExport}</TableCell>
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
            />
            <br/>
            <TextField
              id="co-date"
              label="Date"
              type="date"
              margin="normal"
            />
            <br/>
            <TextField
              id="co-nom-entreprise"
              label="Nom entreprise"
              placeholder="Nom entreprise"
              margin="normal"
            />
            <br/>
            <TextField
              id="co-adresse"
              label="Adresse"
              placeholder="Adresse"
              multiline
              margin="normal"
            />
            <br/>
            <TextField
              id="co-destination"
              label="Destination"
              placeholder="Destination"
              multiline
              margin="normal"
            />
            <br/>
            <TextField
              id="co-produit"
              label="Produit"
              placeholder="Produit"
              margin="normal"
            />
            <br/>
            <TextField
              id="co-quatite-export"
              label="Quantité exporté"
              type="number"
              margin="normal"
            />
            <br/>
            <TextField
              id="co-unite"
              label="Unité"
              placeholder="Unité"
              margin="normal"
            />
            <TextField
              id="co-nombre-conteneur"
              label="Nombre de conteneur"
              type="number"
              margin="normal"
            />
            <br/>
            <TextField
              id="co-prix_unitaire"
              label="Prix unitaire"
              placeholder="Prix unitaire"
              margin="normal"
            />
            <br/>
            <TextField
              id="co-montant"
              label="Montant"
              type="number"
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
export default CertificatOrigine;