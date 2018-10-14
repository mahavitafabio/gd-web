import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import AppMenuNew from './AppMenuNew';


const classes = {
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'block',
  },
  search: {
    position: 'relative',
    borderRadius: '3px',
    backgroundColor: fade('#FFF', 0.15),
    '&:hover': {
      backgroundColor: fade('#FFF', 0.25),
    },
    marginLeft: 0,
    width: '20%'
  },
  searchIcon: {
    width: '30px',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputInput: {
    paddingTop: '1px',
    paddingRight: '1px',
    paddingBottom: '1px',
    paddingLeft: '10px',
    width: '80%',
    color: 'inherit'
  },
};

class SearchAppBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <AppMenuNew>
            </AppMenuNew>
            <Typography style={classes.title} variant="title" color="inherit" noWrap>
              {this.props.header}
            </Typography>
            <div style={classes.grow} />
            <div style={classes.search}>
              <div style={classes.searchIcon}>
                <SearchIcon />
              </div>
              <Input
                placeholder="Search…"
                disableUnderline
                style={classes.inputInput}
                onChange={this.props.onSearch}
                value={this.props.searchString}
                autoFocus
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

SearchAppBar.propTypes = {
  header: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  searchString: PropTypes.string
};

export default SearchAppBar;