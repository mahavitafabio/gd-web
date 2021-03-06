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
class Manuel extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        valueList: [],
        isAddDrawerOpen: false,
        newManuel: {},
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
    this.getManuelList(this.props.searchString);
  }

  getManuelList(q) {
    if (typeof(q) == "undefined") {
      q = '';
    }
    fetch('http://localhost:8080/manuel?q=' + q)
    .then(result=>result.json())
    .then(items=>this.setState({valueList: items}));
  }

  handleOpenNew = () => {
    this.setState({ operation: 'POST' });
    this.setState({ isAddDrawerOpen: true });
    this.setState({newManuel:{}});
  };

  handleOpenEdit = () => {
    let newManuel = this.state.valueList.find(o => o.manuelsId === this.state.selected[0]);
    console.log(JSON.stringify(newManuel));
    this.setState({ newManuel });
    this.setState({ operation: 'PUT' });
    this.setState({ isAddDrawerOpen: true });
  };

  handleDelete = () => {
    let self = this;
    console.log(JSON.stringify(this.state.selected));
    fetch('http://localhost:8080/manuel', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.selected)
    }).then(function() {
      self.getManuelList();
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
  
  saveManuel = () => {
    let self = this;
    console.log(JSON.stringify(this.state.newManuel));
    fetch('http://localhost:8080/manuel', {
      method: this.state.operation,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.newManuel)
    }).then(function() {
      self.getManuelList();
    }).catch(function (error) {
      alert("Sauvegarde impossible! Veuiller verifier les informations introduitent et réessayer s'il vous plait.");
    });
    this.handleClose();
    this.setState({newManuel:{}});
  };

  exportManuel = () => {
    fetch('http://localhost:8080/manuel/export')
    .then(result=> { return result.blob() })
    .then(data=> {
      let timeStamp = moment(new Date()).format('DDMMYY');
      let blob = new Blob([data], { type: 'application/octet-stream' });
      FileSaver.saveAs(blob, "Manuels" + timeStamp + '.' + 'xlsx');
    });
  }

  handleChange(event) {
    let newManuel = Object.assign({}, this.state.newManuel);
    console.log(event.target);
    if (event.target.id === 'code-manuel') {
      newManuel.codeOuvrages = event.target.value;
    } else if (event.target.id === 'commentaire-manuel') {
      newManuel.commentaire = event.target.value;
    } else if (event.target.id === 'manuel-domaine') {
      newManuel.domaines = event.target.value;
    } else if (event.target.id === 'manuel-etage') {
      newManuel.etage = event.target.value;
    } else if (event.target.id === 'manuel-nombre-exemplaire') {
      newManuel.nombreExemplaire = event.target.value;
    } else if (event.target.id === 'manuel-ranger') {
      newManuel.ranger = event.target.value;
    } else if (event.target.id === 'titre-manuel') {
      newManuel.titreOuvrages = event.target.value;
    } 
    this.setState({newManuel});
  }

  handleChangeFile(event) {
    const self = this;
    const file = event.target.files[0];
    console.log(event.target.files[0]);
    var data = new FormData();
    data.append("data", file);
    fetch('http://localhost:8080/manuel/upload', { // Your POST endpoint
      method: 'POST',
      body: data // This is your file object
    }).then(function() {
      self.getManuelList();
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
        exportButtonHandler={this.exportManuel.bind(this)}
        openHandler={this.handleOpen.bind(this)}/>
        <Paper style={paperStyle}>
        <Table style={tableStyle}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
              </TableCell>
              <TableCell>Manuel Id</TableCell>
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
              const isSelected = this.isSelected(row.manuelsId);
              return (
                <TableRow key={row.manuelsId}
                      hover
                      onClick={event => this.handleClick(event, row.manuelsId)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox checked={isSelected} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.manuelsId}
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
          <DialogTitle id="simple-dialog-title">Ajouter un Manuel</DialogTitle>
          <DialogContent>
            <TextField
              id="code-manuel"
              label="Code ouvrage"
              type="number"
              margin="normal"
              value={this.state.newManuel.codeOuvrages}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="commentaire-manuel"
              label="Commentaire"
              placeholder="Commentaire"
              multiline
              margin="normal"
              value={this.state.newManuel.commentaire}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="manuel-domaine"
              label="Domaine"
              placeholder="Domaine"
              margin="normal"
              value={this.state.newManuel.domaines}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="manuel-etage"
              label="Etage"
              type="number"
              margin="normal"
              value={this.state.newManuel.etage}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="manuel-nombre-exemplaire"
              label="Nombre exemplaire"
              type="number"
              margin="normal"
              value={this.state.newManuel.nombreExemplaire}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="manuel-ranger"
              label="Rangé"
              type="number"
              margin="normal"
              value={this.state.newManuel.ranger}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="titre-manuel"
              label="Titre ouvrage"
              placeholder="titre ouvrage"
              multiline
              margin="normal"
              value={this.state.newManuel.titreOuvrages}
              onChange={this.handleChange.bind(this)}
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" onClick={this.saveManuel}>
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

Manuel.propTypes = {
  searchString: PropTypes.string
};
export default Manuel;