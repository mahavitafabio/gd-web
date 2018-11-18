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
class Services extends React.Component {


  constructor(props) {
      super(props);
      this.state = {
        valueList: [],
        isAddDrawerOpen: false,
        newService: {},
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
    this.getCherviceList(this.props.searchString);
  }

  getCherviceList(q) {
    if (typeof(q) == "undefined") {
      q = '';
    }
    fetch('http://localhost:8080/chervice?q=' + q)
    .then(result=>result.json())
    .then(items=>this.setState({valueList: items}));
  }

  handleOpenNew = () => {
    this.setState({ operation: 'POST' });
    this.setState({ isAddDrawerOpen: true });
    this.setState({newEntreprise:{}});
  };

  handleOpenEdit = () => {
    let newService = this.state.valueList.find(o => o.servicesId === this.state.selected[0]);
    console.log(JSON.stringify(newService));
    this.setState({ newService });
    this.setState({ operation: 'PUT' });
    this.setState({ isAddDrawerOpen: true });
  };

  handleDelete = () => {
    let self = this;
    console.log(JSON.stringify(this.state.selected));
    fetch('http://localhost:8080/chervice', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.selected)
    }).then(function() {
      self.getCherviceList();
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

  saveService = () => {
    let self = this;
    console.log(JSON.stringify(this.state.newService));
    fetch('http://localhost:8080/chervice', {
      method: this.state.operation,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.newService)
    }).then(function() {
      self.getCherviceList();
    }).catch(function (error) {
      alert("Sauvegarde impossible! Veuiller verifier les informations introduitent et réessayer s'il vous plait.");
    });
    this.handleClose();
    this.setState({newService:{}});
  };

  exportService = () => {
    fetch('http://localhost:8080/chervice/export')
    .then(result=> { return result.blob() })
    .then(data=> {
      let timeStamp = moment(new Date()).format('DDMMYY');
      let blob = new Blob([data], { type: 'application/octet-stream' });
      FileSaver.saveAs(blob, "Services" + timeStamp + '.' + 'xlsx');
    });
  }

  handleChange(event) {
    let newService = Object.assign({}, this.state.newService);
    console.log(event.target);
    if (event.target.id === 'nom-service') {
      newService.nomEntreprise = event.target.value;
    } else if (event.target.id === 'service-adresse') {
      newService.adresseEntreprise = event.target.value;
    } else if (event.target.id === 'service-activite-principale') {
      newService.activitePrincipale = event.target.value;
    } else if (event.target.id === 'service-contact') {
      newService.contact = event.target.value;
    } else if (event.target.id === 'service-nom-responsable') {
      newService.nomResponsable = event.target.value;
    }
    this.setState({newService});
  }

  handleChangeFile(event) {
    const self = this;
    const file = event.target.files[0];
    console.log(event.target.files[0]);
    var data = new FormData();
    data.append("data", file);
    fetch('http://localhost:8080/chervice/upload', { // Your POST endpoint
      method: 'POST',
      body: data // This is your file object
    }).then(function() {
      self.getCherviceList();
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
          exportButtonHandler={this.exportService.bind(this)}
          openHandler={this.handleOpen.bind(this)}/>
        <Paper style={paperStyle}>
        <Table style={tableStyle}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
              </TableCell>
              <TableCell>Service Id</TableCell>
              <TableCell>Nom Entreprise</TableCell>
              <TableCell>Adresse Enterprise</TableCell>
              <TableCell>Activité Principale</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Nom Responsable</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.valueList.map(row => {
              const isSelected = this.isSelected(row.servicesId);
              return (
                <TableRow key={row.servicesId}
                      hover
                      onClick={event => this.handleClick(event, row.servicesId)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox checked={isSelected} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.servicesId}
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
          <DialogTitle id="simple-dialog-title">Ajouter un Service</DialogTitle>
          <DialogContent>
            <TextField
              id="nom-service"
              label="Nom entreprise"
              placeholder="Nom entreprise"
              margin="normal"
              value={this.state.newService.nomEntreprise}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="service-adresse"
              label="Adresse"
              placeholder="Adresse"
              multiline
              margin="normal"
              value={this.state.newService.adresseEntreprise}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="service-activite-principale"
              label="Activite principale"
              placeholder="Activite principale"
              multiline
              margin="normal"
              value={this.state.newService.activitePrincipale}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="service-contact"
              label="Contact"
              margin="normal"
              value={this.state.newService.contact}
              onChange={this.handleChange.bind(this)}
            />
            <br/>
            <TextField
              id="service-nom-responsable"
              label="Nom responsable"
              placeholder="Nom responsable"
              margin="normal"
              value={this.state.newService.nomResponsable}
              onChange={this.handleChange.bind(this)}
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" onClick={this.saveService}>
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

Services.propTypes = {
  searchString: PropTypes.string
};
export default Services;