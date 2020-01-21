import React from 'react';
import {
  createStyles,
  makeStyles,
  createMuiTheme,
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const theme = createMuiTheme ({});

const useStyles = makeStyles (() =>
  createStyles ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing (2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

export default function ButtonAppBar (props) {
  const classes = useStyles ();
  let isContextEmpty = props.categories.length === 0;
  let toolbar = null;
  if (!isContextEmpty) {
    toolbar = (
      <div>
        <Button color="inherit" onClick={props.addCategory}>
          Add Category
        </Button>
        <Button color="inherit" onClick={props.viewAll}>
          View All Categories
        </Button>
        <Button color="inherit" onClick={props.viewDetails}>
          View Details
        </Button>
        <Button color="inherit" onClick={props.editCategory}>
          Edit Category
        </Button>
        <Button color="inherit" onClick={props.deleteCategory}>
          Delete Category
        </Button>
      </div>
    );
  }
  if (props.title === 'New Category' && isContextEmpty) {
    toolbar = (
      <div>
        <Button color="inherit" onClick={props.addCategory}>
          Add Category
        </Button>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {props.title}
          </Typography>
          {toolbar}

        </Toolbar>
      </AppBar>
    </div>
  );
}
