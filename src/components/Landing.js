import React, { useState, useEffect } from "react";
import Header from "./framework/Header";
import Footer from "./framework/Footer";
import ConnectApi from "../api/ConnectApi";
import Instructions from "./Instructions";
import Survey from "./Survey";

// MaterialUI
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import Modal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box"
// import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
// import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import { Checkbox, FormControlLabel, FormGroup, Slider } from "@material-ui/core";
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

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  overflow:'scroll',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  maxHeight: '70%',
  maxWidth: '75%',
  boxShadow: 24,
  p: 4,
};

export const Landing = () => {
  const classes = useStyles();
  const ROOT_API_URL = process.env.REACT_APP_ROOT_API_URL;
  const API_URL_SURVEY = "survey/";
  const [dataState] = ConnectApi(ROOT_API_URL + API_URL_SURVEY);
  const [surveys, setSurveys] = useState([]);
  const [chosenSurvey, setChosensurvey] = useState("");
  const [alert, setAlert] = useState(false);
  const [landing, setLanding] = useState(true);
  const [instructions, setInstructions] = useState(false);
  const [knowledge, setKnowledge] = useState(5);
  const [reason, setReason] = useState({});
  // Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  

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

  const showInstructions = () => {
    setLanding(false)
    setInstructions(true)
    setAlert(false)
    /* if (chosenSurvey === '') {
      setAlert(true);
      setLanding(true)
     }*/
  };

  const startSurvey = () => {
    setLanding(false)
    setInstructions(false)
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
          align="justify"
          color="textSecondary"
          component="p"
          className={classes.p}
        >
          Te damos la bienvenida a la encuesta “<b>Barrios de Santiago</b>” del Instituto Milenio Fundamentos de los Datos.
          Este es un estudio académico que busca entender la forma en que se diferencian los barrios de Santiago de Chile y
          sus comunas, y qué técnicas computacionales las predicen de mejor manera.
        </Typography>
        <Typography
          variant="h6"
          align="justify"
          color="textSecondary"
          component="p"
          className={classes.p}
        >
          El siguiente cuestionario tiene <b>X</b> preguntas, sin embargo, puedes terminar de responder cuando tú quieras
          (haciendo click en “Finalizar encuesta”). Toda la información que nos puedas aportar será de gran ayuda.
        </Typography>
        <Typography
          variant="h6"
          align="justify"
          color="textSecondary"
          component="p"
          className={classes.p}
        >
          Tus respuestas serán absolutamente anónimas, y los resultados podrás conocerlos más adelante a través de las 
          redes del <a href="https://imfd.cl/en/">Instituto Milenio Fundamentos de los Datos</a>. 
        </Typography>
        <Typography
          variant="h6"
          align="justify"
          color="textSecondary"
          component="p"
          className={classes.p}
        >
          Selecciona el botón “<b>Comenzar encuesta</b>” si autorizas el uso de tus respuestas para nuestro análisis.
        </Typography>
        <Button onClick={handleOpen} color="secondary">Leer Consentimiento Informado</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h4" component="h2" className={classes.p}>
              Consentimiento Informado
            </Typography>
            <Container id="modal-modal-description">
              <Typography  sx={{ mt: 2 }} component="p" className={classes.p}>
              Usted ha sido invitado(a) a participar en la encuesta “<b>Barrios de Santiago</b>” del <b>Instituto Milenio Fundamento de los Datos</b>. 
              El objetivo es comparar algoritmos de detección de barrios en la ciudad. Para participar en esta estudio, es importante que considere la siguiente información:
              </Typography>
              <Typography sx={{ mt: 2 }} component="p" className={classes.p}>
              <b>Participación</b>: Su participación consistirá en responder un cuestionario web a través de la plataforma <a href="http://ciudades.imfd.cl">ciudades.imfd.cl</a>, 
              hospedada en servidores del instituto.
              La encuesta contempla que el informante identifique y seleccione entre pares de mapas aquel que piensa se ajusta de mejor modo a los barrios presentes en la zona.
              </Typography>
              <Typography sx={{ mt: 2 }} component="p" className={classes.p}>
              <b>Riesgos</b>: Las respuestas de los informantes, además de ser anónimas, no contienen datos privados o sensibles. 
              Por tanto, se considera que no existen riesgos asociados.
              </Typography>
              <Typography sx={{ mt: 2 }} component="p" className={classes.p}>
              <b>Beneficios</b>: Usted no recibirá ningún beneficio directo por participar en este estudio. 
              No obstante, su participación permitirá generar información valiosa para el desarrollo de tecnologías 
              de información geográfica, útiles para el desarrollo de políticas públicas territoriales.
              </Typography>
              <Typography sx={{ mt: 2 }} component="p" className={classes.p}>
              <b>Voluntariedad</b>: Su participación es absolutamente voluntaria. Usted tendrá la libertad de contestar las preguntas que desee, 
              como también de detener su participación en cualquier momento que lo desee. Esto no implicará ningún perjuicio para usted.
              </Typography>
              <Typography sx={{ mt: 2 }} component="p" className={classes.p}>
              <b>Confidencialidad</b>: Todas sus respuestas serán anónimas. Las presentaciones y publicaciones de este estudio, 
              no contendrán datos confidenciales de sus informantes.
              </Typography>
              <Typography sx={{ mt: 2 }} component="p" className={classes.p}>
              <b>Conocimiento de los resultados</b>: Usted tiene derecho a conocer los resultados de esta investigación. 
              Para ello, una vez estén listos podrá conocerlos directamente a través del sitio web <a href="http://ciudades.imfd.cl">ciudades.imfd.cl</a>.
              </Typography>
              <Typography sx={{ mt: 2 }} component="p" className={classes.p}>
              Si requiere mayor información, o comunicarse por cualquier motivo relacionado con este estudio, puede contactar a Naim Bro en el correo naim.bro@imfd.cl.
              </Typography>
            </Container>
            
          </Box>
        </Modal>
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
            onClick={() => showInstructions()}
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
      { instructions &&
        <Instructions startSurvey={startSurvey}></Instructions>
      }
      {/* {!landing && <Survey survey={chosenSurvey} knowledge={knowledge} reason={reason}/>} */
      !landing && !instructions && <Survey survey={'Encuesta RM y Santiago'} reason={''}/>
      }
      
      <Footer />
    </React.Fragment>
  );
};

export default Landing;