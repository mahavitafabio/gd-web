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
class Co2019 extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        valueList: [],
        isAddDrawerOpen: false,
        newCo2019: {},
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
    this.getCo2019List(this.props.searchString);
  }

  getCo2019List(q) {
    if (typeof(q) == "undefined") {
      q = '';
    }
    fetch('http://localhost:8080/certificat19?q=' + q)
    .then(result=>result.json())
    .then(items=>this.setState({valueList: items}));
  }
  
  handleOpenNew = () => {
    this.setState({ operation: 'POST' });
    this.setState({ isAddDrawerOpen: true });
    this.setState({newCo2019:{}});
  };

  handleOpenEdit = () => {
    let newCo2019 = this.state.valueList.find(o => o.co2019Id === this.state.selected[0]);
    console.log(JSON.stringify(newCo2019));
    this.setState({ newCo2019 });
    this.setState({ operation: 'PUT' });
    this.setState({ isAddDrawerOpen: true });
  };

  handleDelete = () => {
    let self = this;
    console.log(JSON.stringify(this.state.selected));
    fetch('http://localhost:8080/certificat19', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.selected)
    }).then(function() {
      self.getCo2019List();
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

  saveCo2019 = () => {
    let self = this;
    console.log(JSON.stringify(this.state.newCo2019));
    fetch('http://localhost:8080/certificat19', {
      method: this.state.operation,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.newCo2019)
    }).then(function() {
      self.getCo2019List();
    }).catch(function (error) {
      alert("Sauvegarde impossible! Veuiller verifier les informations introduitent et réessayer s'il vous plait.");
    });
    this.handleClose();
    this.setState({newCo2019:{}});
  };

  exportCo2019 = () => {
    fetch('http://localhost:8080/certificat19/export')
    .then(result=> { return result.blob() })
    .then(data=> {
      let timeStamp = moment(new Date()).format('DDMMYY');
      let blob = new Blob([data], { type: 'application/octet-stream' });
      FileSaver.saveAs(blob, "Co2019" + timeStamp + '.' + 'xlsx');
    });
  }

  handleChange(event) {
    let newCo2019 = Object.assign({}, this.state.newCo2019);
    console.log(event.target);
    if (event.target.id === 'co2019-numero') {
      newCo2019.numero = event.target.value;
    } else if (event.target.id === 'co2019-date') {
      newCo2019.date = event.target.value;
    } else if (event.target.id === 'co2019-nom-entreprise') {
      newCo2019.nomEntreprise = event.target.value;
    } else if (event.target.id === 'co2019-adresse') {
      newCo2019.adresse = event.target.value;
    } else if (event.target.id === 'co2019-destination') {
      newCo2019.destination = event.target.value;
    } else if (event.target.id === 'co2019-produit') {
      newCo2019.produit = event.target.value;
    } else if (event.target.id === 'co2019-quatite-export') {
      newCo2019.quantiteExporte = event.target.value;
    } else if (event.target.id === 'co2019-unite') {
      newCo2019.unite = event.target.value;
    } else if (event.target.id === 'co2019-nombre-conteneur') {
      newCo2019.nombreConteneur = event.target.value;
    } else if (event.target.id === 'co2019-prix_unitaire') {
      newCo2019.prixUnitaire = event.target.value;
    } else if (event.target.id === 'co2019-montant') {
      newCo2019.montant = event.target.value;
    }
    this.setState({newCo2019});
  }

  handleChangeFile(event) {
    const self = this;
    const file = event.target.files[0];
    console.log(event.target.files[0]);
    var data = new FormData();
    data.append("data", file);
    fetch('http://localhost:8080/certificat19/upload', { // Your POST endpoint
      method: 'POST',
      body: data // This is your file object
    }).then(function() {
      self.getCo2019List();
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
        exportButtonHandler={this.exportCo2019.bind(this)}
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
              const isSelected = this.isSelected(row.co2019Id);
              return (
                <TableRow key={row.co2019Id}
                      hover
                      onClick={event => this.handleClick(event, row.co2019Id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox checked={isSelected} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.co2019Id}
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
              id="co2019-numero"
              label="Numéro"
              type="number"
              margin="normal"
              value={this.state.newCo2019.numero}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="co2019-date"
              label="Date"
              type="date"
              margin="normal"
              value={this.state.newCo2019.date}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="co2019-nom-entreprise"
              label="Nom entreprise"
              placeholder="Nom entreprise"
              margin="normal"
              value={this.state.newCo2019.nomEntreprise}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="co2019-adresse"
              label="Adresse"
              placeholder="Adresse"
              multiline
              margin="normal"
              value={this.state.newCo2019.adresse}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="co2019-destination"
              label="Destination"
              placeholder="Destination"
              multiline
              margin="normal"
              value={this.state.newCo2019.destination}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="co2019-produit"
              label="Produit"
              placeholder="Produit"
              margin="normal"
              value={this.state.newCo2019.produit}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="co2019-quatite-export"
              label="Quantité exporté"
              type="number"
              margin="normal"
              value={this.state.newCo2019.quantiteExporte}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="co2019-unite"
              label="Unité"
              placeholder="Unité"
              margin="normal"
              value={this.state.newCo2019.unite}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="co2019-nombre-conteneur"
              label="Nombre de conteneur"
              type="number"
              margin="normal"
              value={this.state.newCo2019.nombreConteneur}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="co2019-prix_unitaire"
              label="Prix unitaire"
              placeholder="Prix unitaire"
              margin="normal"
              value={this.state.newCo2019.prixUnitaire}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="co2019-montant"
              label="Montant"
              margin="normal"
              value={this.state.newCo2019.montant}
              onChange={this.handleChange.bind(this)}
            />


          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" onClick={this.saveCo2019}>
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

Co2019.propTypes = {
  searchString: PropTypes.string
};
export default Co2019;