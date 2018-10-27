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
class Revue extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        valueList: [],
        isAddDrawerOpen: false,
        newRevue: {},
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
    this.getRevueList(this.props.searchString);
  }

  getRevueList(q) {
    if (typeof(q) == "undefined") {
      q = '';
    }
    fetch('http://localhost:8080/revue?q=' + q)
    .then(result=>result.json())
    .then(items=>this.setState({valueList: items}));
  }

  handleOpenNew = () => {
    this.setState({ operation: 'POST' });
    this.setState({ isAddDrawerOpen: true });
    this.setState({newRevue:{}});
  };

  handleOpenEdit = () => {
    let newRevue = this.state.valueList.find(o => o.revuId === this.state.selected[0]);
    console.log(JSON.stringify(newRevue));
    this.setState({ newRevue });
    this.setState({ operation: 'PUT' });
    this.setState({ isAddDrawerOpen: true });
  };

  handleDelete = () => {
    let self = this;
    console.log(JSON.stringify(this.state.selected));
    fetch('http://localhost:8080/revue', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.selected)
    }).then(function() {
      self.getRevueList();
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
  
  saveRevue = () => {
    let self = this;
    console.log(JSON.stringify(this.state.newRevue));
    fetch('http://localhost:8080/revue', {
      method: this.state.operation,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.newRevue)
    }).then(function() {
      self.getRevueList();
    }).catch(function (error) {
      alert("Sauvegarde impossible! Veuiller verifier les informations introduitent et réessayer s'il vous plait.");
    });
    this.handleClose();
    this.setState({newRevue:{}});
  };

  exportRevue = () => {
    fetch('http://localhost:8080/revue/export')
    .then(result=> { return result.blob() })
    .then(data=> {
      let timeStamp = moment(new Date()).format('DDMMYY');
      let blob = new Blob([data], { type: 'application/octet-stream' });
      FileSaver.saveAs(blob, "Revues" + timeStamp + '.' + 'xlsx');
    });
  }

  handleChange(event) {
    let newRevue = Object.assign({}, this.state.newRevue);
    console.log(event.target);
    if (event.target.id === 'code-revue') {
      newRevue.codeOuvrages = event.target.value;
    } else if (event.target.id === 'commentaire-revue') {
      newRevue.commentaire = event.target.value;
    } else if (event.target.id === 'revue-domaine') {
      newRevue.domaines = event.target.value;
    } else if (event.target.id === 'revue-etage') {
      newRevue.etage = event.target.value;
    } else if (event.target.id === 'revue-nombre-exemplaire') {
      newRevue.nombreExemplaire = event.target.value;
    } else if (event.target.id === 'revue-ranger') {
      newRevue.ranger = event.target.value;
    } else if (event.target.id === 'titre-revue') {
      newRevue.titreOuvrages = event.target.value;
    } 
    this.setState({newRevue});
  }

  handleChangeFile(event) {
    const self = this;
    const file = event.target.files[0];
    console.log(event.target.files[0]);
    var data = new FormData();
    data.append("data", file);
    fetch('http://localhost:8080/revue/upload', { // Your POST endpoint
      method: 'POST',
      body: data // This is your file object
    }).then(function() {
      self.getRevueList();
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
        exportButtonHandler={this.exportRevue.bind(this)}
        openHandler={this.handleOpen.bind(this)}/>
        <Paper style={paperStyle}>
        <Table style={tableStyle}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
              </TableCell>
              <TableCell>Revue Id</TableCell>
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
              const isSelected = this.isSelected(row.revuId);
              return (
                <TableRow key={row.revuId}
                      hover
                      onClick={event => this.handleClick(event, row.revuId)}
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
          <DialogTitle id="simple-dialog-title">Ajouter un Revue</DialogTitle>
          <DialogContent>
            <TextField
              id="code-revue"
              label="Code ouvrage"
              type="number"
              margin="normal"
              value={this.state.newRevue.codeOuvrages}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="commentaire-revue"
              label="Commentaire"
              placeholder="Commentaire"
              multiline
              margin="normal"
              value={this.state.newRevue.commentaire}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="revue-domaine"
              label="Domaine"
              placeholder="Domaine"
              margin="normal"
              value={this.state.newRevue.domaines}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="revue-etage"
              label="Etage"
              type="number"
              margin="normal"
              value={this.state.newRevue.etage}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="revue-nombre-exemplaire"
              label="Nombre exemplaire"
              type="number"
              margin="normal"
              value={this.state.newRevue.nombreExemplaire}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="revue-ranger"
              label="Rangé"
              type="number"
              margin="normal"
              value={this.state.newRevue.ranger}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="titre-revue"
              label="Titre ouvrage"
              placeholder="titre ouvrage"
              multiline
              margin="normal"
              value={this.state.newRevue.titreOuvrages}
              onChange={this.handleChange.bind(this)}
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" onClick={this.saveRevue}>
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

Revue.propTypes = {
  searchString: PropTypes.string
};
export default Revue;