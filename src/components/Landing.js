import React, { useState, useEffect } from "react";
import Header from "./framework/Header";
import Footer from "./framework/Footer";
import ConnectApi from "../api/ConnectApi";
import Survey from "./Survey";

// MaterialUI
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Checkbox, FormControlLabel, FormGroup, Slider } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
  p: {
    padding: 10
  }
}));

export const Landing = () => {
  const classes = useStyles();
  const ROOT_API_URL = process.env.REACT_APP_ROOT_API_URL;
  const API_URL_SURVEY = "survey/";
  const [dataState] = ConnectApi(ROOT_API_URL + API_URL_SURVEY);
  const [surveys, setSurveys] = useState([]);
  const [chosenSurvey, setChosensurvey] = useState("");
  const [alert, setAlert] = useState(false);
  const [landing, setLanding] = useState(true);
  const [knowledge, setKnowledge] = useState(5);
  const [reason, setReason] = useState({});
  

  useEffect(() => {
    if (Object.keys(surveys).length === 0) {
      setSurveys(createInitialsurveys());
    }
  }, [surveys]);
  
  const createInitialsurveys = () => {
    var object = []
    dataState.data.map((q, i) => (object.push(q.title)))

    return object
  };

  const chooseSurvey = (val) => {
    setChosensurvey(val);
    //setRedirect("./respond/" + val);
  }; 

  const startSurvey = () => {
    setLanding(false)
    setAlert(false)
    /* if (chosenSurvey === '') {
      setAlert(true);
      setLanding(true)
     }*/
  };

  const handleKnowledge = (val) => {
    setKnowledge(val)
  }

  const handleReason = (val, text) => {
    setReason({...reason, [text]:val})
  }

  return (
    <React.Fragment>
      <Header />
      { landing &&
      <Container>
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom

        >
          Encuesta: "Barrios de Santiago"
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="textSecondary"
          component="p"
          className={classes.p}
        >
          Estamos buscando la mejor manera de identificar barrios. Ayúdanos respondiendo esta breve encuesta sobre la Región Metropolitana y comuna de Santiago.
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="textSecondary"
          component="p"
          className={classes.p}
        >
          Es fácil: te vamos a mostrar dos formas de mapear la ciudad y comuna, y tú tienes que elegir la que te haga más sentido. Los barrios se identifican con colores. Cualquier comentario, consulta o sugerencia,
          déjalos en el campo de comentarios.
        </Typography>
        
        <Typography
          variant="h6"
          align="center"
          color="textSecondary"
          component="p"
          className={classes.p}
        >
          Agradecemos tu participación, es de mucha ayuda. Si aún quieres seguir ayudándonos, puedes compartir la encuesta.
        </Typography>
      </Container>
     {/*  <Grid container spacing={3} >
        <Grid item xs={4}>
          <Autocomplete
          disablePortal
          id="comunas"
          options={surveys}
          sx={{ width: '30%' }}
          renderInput={(params) => <TextField {...params} label="¿En qué comuna desea participar?" />}
          onChange={(e, value) => chooseSurvey(value)}
          />
        </Grid>
        
        <Grid item xs={4}>
          <Typography id="discrete-slider" gutterBottom>
          En una escala de 0 a 10
          ¿Qué tanto conoces esa comuna?
          </Typography>
          <Slider
            defaultValue={5}
            aria-labelledby="discrete-slider"
            style={{width: "14px !important",}}
            valueLabelDisplay="on"
            step={1}
            marks={true}
            min={0}
            max={10}
            onChange={(e, value) => handleKnowledge(value)}
          />
        </Grid>
        <Grid item xs={4}>
        <Typography gutterBottom>
          ¿Por qué escogió esta comuna?
          </Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox onChange={(e, value) => handleReason(value,"Vivo actualmente en dicha comuna")}/>} label="Vivo actualmente en dicha comuna" />
            <FormControlLabel control={<Checkbox onChange={(e, value) => handleReason(value, "Viví en dicha comuna")}/>} label="Viví en dicha comuna" />
            <FormControlLabel control={<Checkbox onChange={(e, value) => handleReason(value, "Trabajo en dicha comuna")}/>} label="Trabajo en dicha comuna" />
            <FormControlLabel control={<Checkbox onChange={(e, value) => handleReason(value, "Otro")}/>} label="Otro" />
          </FormGroup>
        </Grid>
      </Grid> */}
      <Container>
        <CardActions>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            onClick={() => startSurvey()}
          >
            Comenzar Encuesta
          </Button>
        </CardActions>
        {alert &&
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Debe seleccionar 1 comuna — <strong>Revisar!</strong>
        </Alert>}
      </Container>
      </Container>
      }
      {/* {!landing && <Survey survey={chosenSurvey} knowledge={knowledge} reason={reason}/>} */
      !landing && <Survey survey={'Encuesta RM y Santiago'} reason={''}/>
      }
      
      <Footer />
    </React.Fragment>
  );
};

export default Landing;