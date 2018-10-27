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
class Autres extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        valueList: [],
        isAddDrawerOpen: false,
        newAutre: {},
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
    this.getAutresList(this.props.searchString);
  }

  getAutresList(q) {
    if (typeof(q) == "undefined") {
      q = '';
    }
    fetch('http://localhost:8080/autres?q=' + q)
    .then(result=>result.json())
    .then(items=>this.setState({valueList: items}));
  }

  handleOpenNew = () => {
    this.setState({ operation: 'POST' });
    this.setState({ isAddDrawerOpen: true });
    this.setState({newAutre:{}});
  };

  handleOpenEdit = () => {
    let newAutre = this.state.valueList.find(o => o.autresId === this.state.selected[0]);
    console.log(JSON.stringify(newAutre));
    this.setState({ newAutre });
    this.setState({ operation: 'PUT' });
    this.setState({ isAddDrawerOpen: true });
  };

  handleDelete = () => {
    let self = this;
    console.log(JSON.stringify(this.state.selected));
    fetch('http://localhost:8080/autres', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.selected)
    }).then(function() {
      self.getAutresList();
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
  
  saveAutre = () => {
    let self = this;
    console.log(JSON.stringify(this.state.newAutre));
    fetch('http://localhost:8080/autres', {
      method: this.state.operation,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.newAutre)
    }).then(function() {
      self.getAutresList();
    }).catch(function (error) {
      alert("Sauvegarde impossible! Veuiller verifier les informations introduitent et réessayer s'il vous plait.");
    });
    this.handleClose();
    this.setState({newAutre:{}});
  };

  exportAutre = () => {
    fetch('http://localhost:8080/autres/export')
    .then(result=> { return result.blob() })
    .then(data=> {
      let timeStamp = moment(new Date()).format('DDMMYY');
      let blob = new Blob([data], { type: 'application/octet-stream' });
      FileSaver.saveAs(blob, "Autres" + timeStamp + '.' + 'xlsx');
    });
  }

  handleChange(event) {
    let newAutre = Object.assign({}, this.state.newAutre);
    console.log(event.target);
    if (event.target.id === 'code-autre') {
      newAutre.codeOuvrages = event.target.value;
    } else if (event.target.id === 'commentaire-autre') {
      newAutre.commentaire = event.target.value;
    } else if (event.target.id === 'autre-domaine') {
      newAutre.domaines = event.target.value;
    } else if (event.target.id === 'autre-etage') {
      newAutre.etage = event.target.value;
    } else if (event.target.id === 'autre-nombre-exemplaire') {
      newAutre.nombreExemplaire = event.target.value;
    } else if (event.target.id === 'autre-ranger') {
      newAutre.ranger = event.target.value;
    } else if (event.target.id === 'titre-autre') {
      newAutre.titreOuvrages = event.target.value;
    } 
    this.setState({newAutre});
  }

  handleChangeFile(event) {
    const self = this;
    const file = event.target.files[0];
    console.log(event.target.files[0]);
    var data = new FormData();
    data.append("data", file);
    fetch('http://localhost:8080/autres/upload', { // Your POST endpoint
      method: 'POST',
      body: data // This is your file object
    }).then(function() {
      self.getAutresList();
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
        exportButtonHandler={this.exportAutre.bind(this)}
        openHandler={this.handleOpen.bind(this)}/>
        <Paper style={paperStyle}>
        <Table style={tableStyle}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
              </TableCell>
              <TableCell>Autre Id</TableCell>
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
              const isSelected = this.isSelected(row.autresId);
              return (
                <TableRow key={row.autresId}
                      hover
                      onClick={event => this.handleClick(event, row.autresId)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox checked={isSelected} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.autresId}
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
          <DialogTitle id="simple-dialog-title">Ajouter un Autre</DialogTitle>
          <DialogContent>
            <TextField
              id="code-autre"
              label="Code ouvrage"
              type="number"
              margin="normal"
              value={this.state.newAutre.codeOuvrages}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="commentaire-autre"
              label="Commentaire"
              placeholder="Commentaire"
              multiline
              margin="normal"
              value={this.state.newAutre.commentaire}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="autre-domaine"
              label="Domaine"
              placeholder="Domaine"
              margin="normal"
              value={this.state.newAutre.domaines}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="autre-etage"
              label="Etage"
              type="number"
              margin="normal"
              value={this.state.newAutre.etage}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="autre-nombre-exemplaire"
              label="Nombre exemplaire"
              type="number"
              margin="normal"
              value={this.state.newOuvrage.nombreExemplaire}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="autre-ranger"
              label="Rangé"
              type="number"
              margin="normal"
              value={this.state.newAutre.ranger}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="titre-autre"
              label="Titre ouvrage"
              placeholder="titre ouvrage"
              multiline
              margin="normal"
              value={this.state.newAutre.titreOuvrages}
              onChange={this.handleChange.bind(this)}
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" onClick={this.saveAutre}>
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

Autres.propTypes = {
  searchString: PropTypes.string
};
export default Autres;