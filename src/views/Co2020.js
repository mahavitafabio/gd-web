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
import FileSaver from 'file-saver';
import moment from 'moment';
import PropTypes, { instanceOf } from 'prop-types';

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
class Co2020 extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        valueList: [],
        isAddDrawerOpen: false,
        newCo2020: {},
        selected: [],
        operation: 'POST',
        enableEdit: false,
        enableDelete: false,
        isDrawerOpen: false
      };
      if (props.searchString) {
        console.log(props.searchString);
        }
  }


  componentDidMount() {
    this.getCo2020List(this.props.searchString);
  }

  getCo2020List(q) {
    if (typeof(q) == "undefined") {
      q = '';
    }
    fetch('http://localhost:8080/certificat20?q=' + q)
    .then(result=>result.json())
    .then(items=>this.setState({valueList: items}));
  }
  
  handleOpenNew = () => {
    this.setState({ operation: 'POST' });
    this.setState({ isAddDrawerOpen: true });
    this.setState({newCo2020:{}});
  };

  handleOpenEdit = () => {
    let newCo2020 = this.state.valueList.find(o => o.co2020Id === this.state.selected[0]);
    console.log(JSON.stringify(newCo2020));
    this.setState({ newCo2020 });
    this.setState({ operation: 'PUT' });
    this.setState({ isAddDrawerOpen: true });
  };

  handleDelete = () => {
    let self = this;
    console.log(JSON.stringify(this.state.selected));
    fetch('http://localhost:8080/certificat20', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.selected)
    }).then(function() {
      self.getCo2020List();
    }).catch(function (error) {
      alert("Erreur! Veuiller verifier et réessayer s'il vous plait.");
    });
    this.setState({selected:[]});
  }

  handleClose = () => {
    this.setState({ isAddDrawerOpen: false });
  };

  handleOpen = () => {
    let self = this;
    this.setState({ isDrawerOpen: true });
    this.handleClose();
  };

  handleCloseNew = () => {
    this.setState({ isDrawerOpen: false });
  };

  saveCo2020 = () => {
    let self = this;
    console.log(JSON.stringify(this.state.newCo2020));
    fetch('http://localhost:8080/certificat20', {
      method: this.state.operation,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.newCo2020)
    }).then(function() {
      self.getCo2020List();
    }).catch(function (error) {
      alert("Sauvegarde impossible! Veuiller verifier les informations introduitent et réessayer s'il vous plait.");
    });
    this.handleClose();
    this.setState({newCo2020:{}});
  };

  exportCo2020 = () => {
    fetch('http://localhost:8080/certificat20/export')
    .then(result=> { return result.blob() })
    .then(data=> {
      let timeStamp = moment(new Date()).format('DDMMYY');
      let blob = new Blob([data], { type: 'application/octet-stream' });
      FileSaver.saveAs(blob, "Co2020" + timeStamp + '.' + 'xlsx');
    });
  }

  handleChange(event) {
    let newCo2020 = Object.assign({}, this.state.newCo2020);
    console.log(event.target);
    if (event.target.id === 'co2020-numero') {
      newCo2020.numero = event.target.value;
    } else if (event.target.id === 'co2020-date') {
      newCo2020.date = event.target.value;
    } else if (event.target.id === 'co2020-nom-entreprise') {
      newCo2020.nomEntreprise = event.target.value;
    } else if (event.target.id === 'co2020-adresse') {
      newCo2020.adresse = event.target.value;
    } else if (event.target.id === 'co2020-destination') {
      newCo2020.destination = event.target.value;
    } else if (event.target.id === 'co2020-produit') {
      newCo2020.produit = event.target.value;
    } else if (event.target.id === 'co2020-quatite-export') {
      newCo2020.quantiteExporte = event.target.value;
    } else if (event.target.id === 'co2020-unite') {
      newCo2020.unite = event.target.value;
    } else if (event.target.id === 'co2020-nombre-conteneur') {
      newCo2020.nombreConteneur = event.target.value;
    } else if (event.target.id === 'co2020-prix_unitaire') {
      newCo2020.prixUnitaire = event.target.value;
    } else if (event.target.id === 'co2020-montant') {
      newCo2020.montant = event.target.value;
    }
    this.setState({newCo2020});
  }

  handleChangeFile(event) {
    const self = this;
    const file = event.target.files[0];
    console.log(event.target.files[0]);
    var data = new FormData();
    data.append("data", file);
    fetch('http://localhost:8080/certificat20/upload', { // Your POST endpoint
      method: 'POST',
      body: data // This is your file object
    }).then(function() {
      self.getCo2020List();
    }).catch(function (error) {
      alert("Erreur! Veuiller réessayer s'il vous plait.");
    });
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

    if (newSelected && newSelected.length === 1) {
      this.setState({ enableDelete: true });
    } else if (newSelected && newSelected.length === 0) {
      this.setState({ enableDelete: false });
    } else {
      this.setState({ enableDelete: true });
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
        editButtonHandler={this.handleOpenEdit.bind(this)} 
        enableEdit={this.state.enableEdit}
        deleteButtonHandler={this.handleDelete.bind(this)}
        enableDelete={this.state.enableDelete}
        exportButtonHandler={this.exportCo2020.bind(this)}
        openHandler={this.handleOpen.bind(this)}/>
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
              const isSelected = this.isSelected(row.co2020Id);
              return (
                <TableRow key={row.co2020Id}
                      hover
                      onClick={event => this.handleClick(event, row.co2020Id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox checked={isSelected} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.co2020Id}
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
              id="co2020-numero"
              label="Numéro"
              type="number"
              margin="normal"
              value={this.state.newCo2020.numero}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="co2020-date"
              label="Date"
              type="date"
              margin="normal"
              value={this.state.newCo2020.date}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="co2020-nom-entreprise"
              label="Nom entreprise"
              placeholder="Nom entreprise"
              margin="normal"
              value={this.state.newCo2020.nomEntreprise}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="co2020-adresse"
              label="Adresse"
              placeholder="Adresse"
              multiline
              margin="normal"
              value={this.state.newCo2020.adresse}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="co2020-destination"
              label="Destination"
              placeholder="Destination"
              multiline
              margin="normal"
              value={this.state.newCo2020.destination}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="co2020-produit"
              label="Produit"
              placeholder="Produit"
              margin="normal"
              value={this.state.newCo2020.produit}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="co2020-quatite-export"
              label="Quantité exporté"
              type="number"
              margin="normal"
              value={this.state.newCo2020.quantiteExporte}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="co2020-unite"
              label="Unité"
              placeholder="Unité"
              margin="normal"
              value={this.state.newCo2020.unite}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="co2020-nombre-conteneur"
              label="Nombre de conteneur"
              type="number"
              margin="normal"
              value={this.state.newCo2020.nombreConteneur}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="co2020-prix_unitaire"
              label="Prix unitaire"
              placeholder="Prix unitaire"
              margin="normal"
              value={this.state.newCo2020.prixUnitaire}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="co2020-montant"
              label="Montant"
              margin="normal"
              value={this.state.newCo2020.montant}
              onChange={this.handleChange.bind(this)}
            />


          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" onClick={this.saveCo2020}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={this.state.isDrawerOpen} aria-labelledby="simple-dialog-title">
          <DialogContent>
             <input type="file" onChange={this.handleChangeFile.bind(this)}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseNew} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Co2020.propTypes = {
  searchString: PropTypes.string
};
export default Co2020;