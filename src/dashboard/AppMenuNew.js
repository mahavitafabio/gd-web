import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class AppMenuNew extends React.Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <List component="nav">
        <ListItem button>
          <ListItemText primary="Entreprises" />
        </ListItem>
        <Divider />
        <ListItem button divider>
          <ListItemText primary="Ouvrages" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Fichier consulaires" />
        </ListItem>
        <Divider light />
        <ListItem button>
          <ListItemText primary="C.O" />
        </ListItem>
      </List>
    );

    return (
      <div>
        <IconButton onClick={this.toggleDrawer('left', true)} className={classes.menuButton} color="inherit" aria-label="Open drawer">
            <MenuIcon />
          </IconButton>
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
          
          <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="title" color="inherit">
            Menu
          </Typography>
        </Toolbar>
      </AppBar>
          
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

AppMenuNew.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppMenuNew);