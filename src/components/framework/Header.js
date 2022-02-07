import { AppBar, Toolbar, } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
        <Toolbar  
        className={classes.toolbarTitle}
        >
          <img
          alt="IMFD"
          src={'https://imfd.cl/wp-content/themes/understrap-child/images/header-logo-es.png'}
          style={{
            width: '20%',
            cursor: 'pointer'
          }}
          onClick={() => (window.location.reload())}
          />          
        </Toolbar>
      </AppBar>
    </div>
  );
}