import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
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
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openCompanies: false,
      openWorks: false,
      openOrigin: false
    }
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClickCompanies = () => {
    this.setState(state => ({ openCompanies: !state.openCompanies }));
    console.log('open', this.state.open);
    console.log('openCompanies', this.state.openCompanies);
  };

  handleClickWorks = () => {
    this.setState(state => ({ openWorks: !state.openWorks }));
  };

  handleClickOrigin = () => {
    this.setState(state => ({ openOrigin: !state.openOrigin }));
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <List component="nav">
        <ListItem button onClick={this.handleClickCompanies} divider>
            <ListItemText primary="Entreprises" />
        </ListItem>
        <Collapse in={this.state.openCompanies} timeout="auto">
            <List component="nav" disablePadding>
              <ListItem button className={classes.nested}>
                <Link to={`/entreprises`} onClick={this.handleClick}>
                  <ListItemText primary="Industries" />
                </Link>
              </ListItem>
              <ListItem button className={classes.nested}>
                <Link to={`/services`} onClick={this.handleClick}>
                  <ListItemText primary="Services" />
                </Link>
              </ListItem>
              <ListItem button className={classes.nested}>
                <Link to={`/commerces`} onClick={this.handleClick}>
                  <ListItemText primary="Commerces" />
                </Link>
              </ListItem>
            </List>
        </Collapse>
        <Divider />
        <ListItem button onClick={this.handleClickWorks} divider>
            <ListItemText primary="Ouvrages" />
        </ListItem>
        <Collapse in={this.state.openWorks} timeout="auto">
            <List component="nav" disablePadding>
              <ListItem button className={classes.nested}>
                <Link to={`/ouvrages`} onClick={this.handleClick}>
                  <ListItemText primary="Memoires" />
                </Link>
              </ListItem>
              <ListItem button className={classes.nested}>
                <Link to={`/manuel`} onClick={this.handleClick}>
                  <ListItemText primary="Manuels" />
                </Link>
              </ListItem>
              <ListItem button className={classes.nested}>
                <Link to={`/guide`} onClick={this.handleClick}>
                  <ListItemText primary="Guides" />
                </Link>
              </ListItem>
              <ListItem button className={classes.nested}>
                <Link to={`/revue`} onClick={this.handleClick}>
                  <ListItemText primary="Revues" />
                </Link>
              </ListItem>
              <ListItem button className={classes.nested}>
                <Link to={`/autres`} onClick={this.handleClick}>
                  <ListItemText primary="Autres" />
                </Link>
              </ListItem>
            </List>
        </Collapse>
        <Divider />
        <ListItem button>
          <Link to={`/fichier-consulaires`} onClick={this.handleClick} divider>
            <ListItemText primary="Fichier Consulaires" />
          </Link>
        </ListItem>
        <Divider light />
        <ListItem button onClick={this.handleClickOrigin} divider>
            <ListItemText primary="Certificat Origine" />
        </ListItem>
        <Collapse in={this.state.openOrigin} timeout="auto">
          <List component="nav" disablePadding>
            <ListItem button className={classes.nested}>
              <Link to={`/co2017`} onClick={this.handleClick}>
                <ListItemText primary="Co2017" />
              </Link>
            </ListItem>
            <ListItem button className={classes.nested}>
              <Link to={`/co2018`} onClick={this.handleClick}>
                <ListItemText primary="Co2018" />
              </Link>
            </ListItem>
            <ListItem button className={classes.nested}>
              <Link to={`/co2019`} onClick={this.handleClick}>
                <ListItemText primary="Co2019" />
              </Link>
            </ListItem>
            <ListItem button className={classes.nested}>
              <Link to={`/co2020`} onClick={this.handleClick}>
                <ListItemText primary="Co2020" />
              </Link>
            </ListItem>
            <ListItem button className={classes.nested}>
              <Link to={`/co2021`} onClick={this.handleClick}>
                <ListItemText primary="Co2021" />
              </Link>
            </ListItem>
            <ListItem button className={classes.nested}>
              <Link to={`/co2022`} onClick={this.handleClick}>
                <ListItemText primary="Co2022" />
              </Link>
            </ListItem>
            <ListItem button className={classes.nested}>
              <Link to={`/co2023`} onClick={this.handleClick}>
                <ListItemText primary="Co2023" />
              </Link>
            </ListItem>
            <ListItem button className={classes.nested}>
              <Link to={`/certificat`} onClick={this.handleClick}>
                <ListItemText primary="Co2024" />
              </Link>
            </ListItem>
          </List>
        </Collapse>
      </List>
  );

    return (
      <div>
        <IconButton onClick={this.handleClick} className={classes.menuButton} color="inherit" aria-label="Open drawer">
          <MenuIcon/>
        </IconButton>
        <Drawer open={this.state.open}>
          <div
            tabIndex={0}
            role="button">
            <AppBar position="static" color="default">
              <Toolbar>
                <Typography variant="title" color="inherit">
                  Menu
                </Typography>
                <IconButton onClick={this.handleClick} className={classes.menuButton} color="inherit" aria-label="Open drawer">
                  <CloseIcon/>
                </IconButton>
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