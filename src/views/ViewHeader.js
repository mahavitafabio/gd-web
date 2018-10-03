import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Ionicon from 'react-ionicons';
import PropTypes, { instanceOf } from 'prop-types';

const buttonStyle= {
    marginLeft: '40px'
};

class ViewHeader extends React.Component {

  	constructor(props) {
    	super(props);
    }

	render() {
		return (
	        <div>
		        <Button variant="contained" color="primary" style={buttonStyle} onClick={this.props.addButtonHandler}>
		        	<Ionicon icon="md-add" fontSize="15px" color="white"/>  
		        	Ajouter
		        </Button>
		        <Button variant="contained" color="primary" style={buttonStyle}>
		        	<Ionicon icon="md-brush" fontSize="15px" color="white"/>  
		        	Modifier
		        </Button>
		        <Button variant="contained" color="primary" style={buttonStyle}>
		        	<Ionicon icon="md-cloud-upload" fontSize="15px" color="white"/>  
		        	Importer
		        </Button>
		        <Button variant="contained" color="primary" style={buttonStyle}>
		        	<Ionicon icon="md-cloud-download" fontSize="15px" color="white"/>  
		        	Exporter
		        </Button>
		        <Button variant="contained" color="primary" style={buttonStyle}>  
		        	<Ionicon icon="md-print" fontSize="15px" color="white"/>
		        	Imprimer
		      	</Button>
	       </div>
	    );
	}
}

ViewHeader.propTypes = {
	addButtonHandler: PropTypes.func
};
export default ViewHeader;