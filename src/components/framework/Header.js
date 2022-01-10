import { AppBar, Toolbar, Typography, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbarTitle: {
    flexGrow: 1,
  }
}));

export default function Header() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
        <Link to="/" className="btn btn-primary">
          <img
          src={'https://imfd.cl/wp-content/themes/understrap-child/images/header-logo-es.png'}
          style={{
            width: '20%',
            cursor: 'pointer'
          }}
          />

          </Link>
          
          
        </Toolbar>
      </AppBar>
    </div>
  );
}