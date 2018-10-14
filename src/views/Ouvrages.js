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
class Ouvrages extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        valueList: [],
        isAddDrawerOpen: false,
        newOuvrage: {},
        selected: [],
        operation: 'POST',
        enableEdit: false,
        enableDelete: false
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

  handleOpenNew = () => {
    this.setState({ operation: 'POST' });
    this.setState({ isAddDrawerOpen: true });
    this.setState({newOuvrage:{}});
  };

  handleOpenEdit = () => {
    let newOuvrage = this.state.valueList.find(o => o.ouvrageId === this.state.selected[0]);
    console.log(JSON.stringify(newOuvrage));
    this.setState({ newOuvrage });
    this.setState({ operation: 'PUT' });
    this.setState({ isAddDrawerOpen: true });
  };

  handleDelete = () => {
    let self = this;
    console.log(JSON.stringify(this.state.selected));
    fetch('http://localhost:8080/ouvrage', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.selected)
    }).then(function() {
      self.getOuvrageList();
    }).catch(function (error) {
      alert("Erreur! Veuiller verifier et réessayer s'il vous plait.");
    });
    this.setState({selected:[]});
  }

  handleClose = () => {
    this.setState({ isAddDrawerOpen: false });
  };
  
  saveOuvrage = () => {
    let self = this;
    console.log(JSON.stringify(this.state.newOuvrage));
    fetch('http://localhost:8080/ouvrage', {
      method: this.state.operation,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.newOuvrage)
    }).then(function() {
      self.getOuvrageList();
    }).catch(function (error) {
      alert("Sauvegarde impossible! Veuiller verifier les informations introduitent et réessayer s'il vous plait.");
    });
    this.handleClose();
    this.setState({newOuvrage:{}});
  };

  exportOuvrage = () => {
    fetch('http://localhost:8080/ouvrage/export')
    .then(result=> { return result.blob() })
    .then(data=> {
      let timeStamp = moment(new Date()).format('DDMMYY');
      let blob = new Blob([data], { type: 'application/octet-stream' });
      FileSaver.saveAs(blob, "Ouvrages" + timeStamp + '.' + 'xlsx');
    });
  }

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

  handleChangeFile(event) {
    const self = this;
    const file = event.target.files[0];
    console.log(event.target.files[0]);
    var data = new FormData();
    data.append("data", file);
    fetch('http://localhost:8080/ouvrage/upload', { // Your POST endpoint
      method: 'POST',
      body: data // This is your file object
    }).then(function() {
      self.getOuvrageList();
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
        exportButtonHandler={this.exportOuvrage.bind(this)}
        changeFileHandler={this.handleChangeFile.bind(this)}/>
        <Paper style={paperStyle}>
        <Table style={tableStyle}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
              </TableCell>
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
              const isSelected = this.isSelected(row.ouvrageId);
              return (
                <TableRow key={row.ouvrageId}
                      hover
                      onClick={event => this.handleClick(event, row.ouvrageId)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox checked={isSelected} />
                  </TableCell>
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
              id="code-ouvrages"
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