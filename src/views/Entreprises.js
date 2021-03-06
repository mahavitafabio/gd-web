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
class Entreprises extends React.Component {


  constructor(props) {
      super(props);
      this.state = {
        valueList: [],
        isAddDrawerOpen: false,
        newEntreprise: {},
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
    this.getEntrepriseList(this.props.searchString);
  }

  getEntrepriseList(q) {
    if (typeof(q) == "undefined") {
      q = '';
    }
    fetch('http://localhost:8080/enterprise?q=' + q)
    .then(result=>result.json())
    .then(items=>this.setState({valueList: items}));
  }

  handleOpenNew = () => {
    this.setState({ operation: 'POST' });
    this.setState({ isAddDrawerOpen: true });
    this.setState({newEntreprise:{}});
  };

  handleOpenEdit = () => {
    let newEntreprise = this.state.valueList.find(o => o.entreprisesId === this.state.selected[0]);
    console.log(JSON.stringify(newEntreprise));
    this.setState({ newEntreprise });
    this.setState({ operation: 'PUT' });
    this.setState({ isAddDrawerOpen: true });
  };

  handleDelete = () => {
    let self = this;
    console.log(JSON.stringify(this.state.selected));
    fetch('http://localhost:8080/enterprise', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.selected)
    }).then(function() {
      self.getEntrepriseList();
    }).catch(function (error) {
      alert("Suppression impossible! Veuiller verifier les informations et réessayer s'il vous plait.");
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

  saveEntreprise = () => {
    let self = this;
    console.log(JSON.stringify(this.state.newEntreprise));
    fetch('http://localhost:8080/enterprise', {
      method: this.state.operation,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.newEntreprise)
    }).then(function() {
      self.getEntrepriseList();
    }).catch(function (error) {
      alert("Sauvegarde impossible! Veuiller verifier les informations introduitent et réessayer s'il vous plait.");
    });
    this.handleClose();
    this.setState({newEntreprise:{}});
  };

  exportEntreprise = () => {
    fetch('http://localhost:8080/enterprise/export')
    .then(result=> { return result.blob() })
    .then(data=> {
      let timeStamp = moment(new Date()).format('DDMMYY');
      let blob = new Blob([data], { type: 'application/octet-stream' });
      FileSaver.saveAs(blob, "Industries" + timeStamp + '.' + 'xlsx');
    });
  }

  handleChange(event) {
    let newEntreprise = Object.assign({}, this.state.newEntreprise);
    console.log(event.target);
    if (event.target.id === 'nom-entreprise') {
      newEntreprise.nomEntreprise = event.target.value;
    } else if (event.target.id === 'enterprise-adresse') {
      newEntreprise.adresseEntreprise = event.target.value;
    } else if (event.target.id === 'activite-principale') {
      newEntreprise.activitePrincipale = event.target.value;
    } else if (event.target.id === 'entreprise-contact') {
      newEntreprise.contact = event.target.value;
    } else if (event.target.id === 'nom-responsable') {
      newEntreprise.nomResponsable = event.target.value;
    }
    this.setState({newEntreprise});
  }

  handleChangeFile(event) {
    const self = this;
    const file = event.target.files[0];
    console.log(event.target.files[0]);
    var data = new FormData();
    data.append("data", file);
    fetch('http://localhost:8080/enterprise/upload', { // Your POST endpoint
      method: 'POST',
      body: data // This is your file object
    }).then(function() {
      self.getEntrepriseList();
    }).catch(function (error) {
      alert("Erreur! Veuiller verifier le fichier et réessayer, s'il vous plait!");
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
          exportButtonHandler={this.exportEntreprise.bind(this)}
          openHandler={this.handleOpen.bind(this)}/>
        <Paper style={paperStyle}>
        <Table style={tableStyle}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
              </TableCell>
              <TableCell>Entreprise Id</TableCell>
              <TableCell>Nom Entreprise</TableCell>
              <TableCell>Adresse Enterprise</TableCell>
              <TableCell>Activité Principale</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Nom Responsable</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.valueList.map(row => {
              const isSelected = this.isSelected(row.entreprisesId);
              return (
                <TableRow key={row.entreprisesId}
                      hover
                      onClick={event => this.handleClick(event, row.entreprisesId)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox checked={isSelected} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.entreprisesId}
                  </TableCell>
                  <TableCell>{row.nomEntreprise}</TableCell>
                  <TableCell>{row.adresseEntreprise}</TableCell>
                  <TableCell>{row.activitePrincipale}</TableCell>
                  <TableCell>{row.contact}</TableCell>
                  <TableCell>{row.nomResponsable}</TableCell>
                  
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        </Paper>
        <Dialog open={this.state.isAddDrawerOpen} aria-labelledby="simple-dialog-title">
          <DialogTitle id="simple-dialog-title">Ajouter un Industrie</DialogTitle>
          <DialogContent>
            <TextField
              id="nom-entreprise"
              label="Nom entreprise"
              placeholder="Nom entreprise"
              margin="normal"
              value={this.state.newEntreprise.nomEntreprise}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="enterprise-adresse"
              label="Adresse"
              placeholder="Adresse"
              multiline
              margin="normal"
              value={this.state.newEntreprise.adresseEntreprise}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="activite-principale"
              label="Activite principale"
              placeholder="Activite principale"
              multiline
              margin="normal"
              value={this.state.newEntreprise.activitePrincipale}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="entreprise-contact"
              label="Contact"
              margin="normal"
              value={this.state.newEntreprise.contact}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="nom-responsable"
              label="Nom responsable"
              placeholder="Nom responsable"
              margin="normal"
              value={this.state.newEntreprise.nomResponsable}
              onChange={this.handleChange.bind(this)}
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" onClick={this.saveEntreprise}>
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

Entreprises.propTypes = {
  searchString: PropTypes.string
};
export default Entreprises;