import React from 'react';
import { Link } from "react-router-dom";
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
import Collapse from '@material-ui/core/Collapse';

const styles = theme => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  nested: {
    paddingLeft: theme.spacing.unit * 8,
  },
});

class AppMenuNew extends React.Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClickO = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClickC = () => {
    this.setState(state => ({ open: !state.open }));
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
        <ListItem button onClick={this.handleClick} divider>
            <ListItemText primary="Entreprises" />
            </ListItem>
              <Collapse in={this.state.open} timeout="auto">
                  <List component="nav" disablePadding>
                    <ListItem button className={classes.nested}>
                      <Link to={`/entreprises`} >
                        <ListItemText primary="Industries" />
                      </Link>
                    </ListItem>
                    <ListItem button className={classes.nested}>
                      <Link to={`/services`} >
                        <ListItemText primary="Services" />
                      </Link>
                    </ListItem>
                    <ListItem button className={classes.nested}>
                      <Link to={`/commerces`} >
                        <ListItemText primary="Commerces" />
                      </Link>
                    </ListItem>
                  </List>
              </Collapse>
        <Divider />
        <ListItem button onClick={this.handleClickO} divider>
            <ListItemText primary="Ouvrages" />
        </ListItem>
              <Collapse in={this.state.open} timeout="auto">
                  <List component="nav" disablePadding>
                    <ListItem button className={classes.nested}>
                      <Link to={`/ouvrages`} >
                        <ListItemText primary="Memoires" />
                      </Link>
                    </ListItem>
                    <ListItem button className={classes.nested}>
                      <Link to={`/manuel`} >
                        <ListItemText primary="Manuels" />
                      </Link>
                    </ListItem>
                    <ListItem button className={classes.nested}>
                      <Link to={`/guide`} >
                        <ListItemText primary="Guides" />
                      </Link>
                    </ListItem>
                    <ListItem button className={classes.nested}>
                      <Link to={`/revue`} >
                        <ListItemText primary="Revues" />
                      </Link>
                    </ListItem>
                    <ListItem button className={classes.nested}>
                      <Link to={`/autres`} >
                        <ListItemText primary="Autres" />
                      </Link>
                    </ListItem>
                  </List>
              </Collapse>
        <ListItem button>
          <Link to={`/fichier-consulaires`} >
            <ListItemText primary="Fichier Consulaires" />
          </Link>
        </ListItem>
        <Divider light />
        <ListItem button onClick={this.handleClickC} divider>
            <ListItemText primary="Certificat Origine" />
        </ListItem>
                <Collapse in={this.state.open} timeout="auto">
                  <List component="nav" disablePadding>
                    <ListItem button className={classes.nested}>
                      <Link to={`/co2017`} >
                        <ListItemText primary="Co2017" />
                      </Link>
                    </ListItem>
                    <ListItem button className={classes.nested}>
                      <Link to={`/co2018`} >
                        <ListItemText primary="Co2018" />
                      </Link>
                    </ListItem>
                    <ListItem button className={classes.nested}>
                      <Link to={`/co2019`} >
                        <ListItemText primary="Co2019" />
                      </Link>
                    </ListItem>
                    <ListItem button className={classes.nested}>
                      <Link to={`/co2020`} >
                        <ListItemText primary="Co2020" />
                      </Link>
                    </ListItem>
                    <ListItem button className={classes.nested}>
                      <Link to={`/co2021`} >
                        <ListItemText primary="Co2021" />
                      </Link>
                    </ListItem>
                    <ListItem button className={classes.nested}>
                      <Link to={`/co2022`} >
                        <ListItemText primary="Co2022" />
                      </Link>
                    </ListItem>
                    <ListItem button className={classes.nested}>
                      <Link to={`/co2023`} >
                        <ListItemText primary="Co2023" />
                      </Link>
                    </ListItem>
                    <ListItem button className={classes.nested}>
                      <Link to={`/certificat`} >
                        <ListItemText primary="Co2024" />
                      </Link>
                    </ListItem>
                  </List>
              </Collapse>
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