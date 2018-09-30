import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Ionicon from 'react-ionicons';

const buttonStyle= {
    marginLeft: '40px'
};

class ViewHeader extends React.Component {
	render() {
		return (
	        <div>
		        <Button variant="contained" color="primary" style={buttonStyle}>
		        	<Ionicon icon="md-add" fontSize="35px" color="white"/>
		        	Ajouter
		        </Button>
		        <Button variant="contained" color="primary" style={buttonStyle}>
		        	<Ionicon icon="md-cloud-upload" fontSize="35px" color="white"/>
		        	Importer
		        </Button>
		        <Button variant="contained" color="primary" style={buttonStyle}>
		        	<Ionicon icon="md-cloud-download" fontSize="35px" color="white"/>
		        	Exporter
		        </Button>
		        <Button variant="contained" color="primary" style={buttonStyle}>
		        	<Ionicon icon="md-print" fontSize="35px" color="white"/>
		        	Imprimer
		      	</Button>
	       </div>
	    );
	}
}

export default ViewHeader;