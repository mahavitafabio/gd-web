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
class FichierConsulaires extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        valueList: [],
        isAddDrawerOpen: false,
        newFichierConsulaire: {},
        selected: [],
        operation: 'POST',
        enableEdit: false,
        enableDelete: false
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
  
  handleOpenNew = () => {
    this.setState({ operation: 'POST' });
    this.setState({ isAddDrawerOpen: true });
    this.setState({newFichierConsulaire:{}});
  };

  handleOpenEdit = () => {
    let newFichierConsulaire = this.state.valueList.find(o => o.consulaireId === this.state.selected[0]);
    console.log(JSON.stringify(newFichierConsulaire));
    this.setState({ newFichierConsulaire });
    this.setState({ operation: 'PUT' });
    this.setState({ isAddDrawerOpen: true });
  };

  handleDelete = () => {
    let self = this;
    console.log(JSON.stringify(this.state.selected));
    fetch('http://localhost:8080/fichier-consulaire', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.selected)
    }).then(function() {
      self.getFichierConsulaireList();
    }).catch(function (error) {
      alert("Erreur! Veuiller verifier et réessayer s'il vous plait.");
    });
    this.setState({selected:[]});
  }

  handleClose = () => {
    this.setState({ isAddDrawerOpen: false });
  };
  
  saveFichierConsulaire = () => {
    let self = this;
    console.log(JSON.stringify(this.state.newFichierConsulaire));
    fetch('http://localhost:8080/fichier-consulaire', {
      method: this.state.operation,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.newFichierConsulaire)
    }).then(function() {
      self.getFichierConsulaireList();
    }).catch(function (error) {
      alert("Sauvegarde impossible! Veuiller verifier les informations introduitent et réessayer s'il vous plait.");
    });
    this.handleClose();
    this.setState({newFichierConsulaire:{}});
  };

  exportFichierConsulaire = () => {
    fetch('http://localhost:8080/fichier-consulaire/export')
    .then(result=> { return result.blob() })
    .then(data=> {
      let timeStamp = moment(new Date()).format('DDMMYY');
      let blob = new Blob([data], { type: 'application/octet-stream' });
      FileSaver.saveAs(blob, "FichierConsulaires" + timeStamp + '.' + 'xlsx');
    });
  }
  
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
        exportButtonHandler={this.exportFichierConsulaire.bind(this)}/>
        <Paper style={paperStyle}>
        <Table style={tableStyle}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
              </TableCell>
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
              const isSelected = this.isSelected(row.consulaireId);
              return (
                <TableRow key={row.consulaireId}
                      hover
                      onClick={event => this.handleClick(event, row.consulaireId)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox checked={isSelected} />
                  </TableCell>
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