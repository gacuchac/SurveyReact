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
import TextField from '@material-ui/core/TextField';
// import { Checkbox, FormControlLabel, FormGroup, Slider } from "@material-ui/core";
import { Alert, AlertTitle, Autocomplete } from "@material-ui/lab";

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
    dataState.data.map((q, i) => (object.push(q.title=='Providencia-Nunoa'? 'Providencia-??u??oa' : q.title )))
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
          Te damos la bienvenida a la encuesta ???<b>Barrios de Santiago</b>??? del Instituto Milenio Fundamentos de los Datos.
          Este es un estudio acad??mico que busca entender la forma en que se diferencian los barrios de Santiago de Chile y
          sus comunas, y qu?? t??cnicas computacionales las predicen de mejor manera.
        </Typography>
        <Typography
          variant="h6"
          align="justify"
          color="textSecondary"
          component="p"
          className={classes.p}
        >
          El siguiente cuestionario tiene <b>30</b> preguntas, sin embargo, puedes terminar de responder cuando t?? quieras
          (haciendo click en ???Finalizar encuesta???). Toda la informaci??n que nos puedas aportar ser?? de gran ayuda.
        </Typography>
        <Typography
          variant="h6"
          align="justify"
          color="textSecondary"
          component="p"
          className={classes.p}
        >
          Tus respuestas ser??n absolutamente an??nimas, y los resultados podr??s conocerlos m??s adelante a trav??s de las 
          redes del <a href="https://imfd.cl/en/">Instituto Milenio Fundamentos de los Datos</a>. 
        </Typography>
        <Button onClick={handleOpen} color="secondary">Leer Consentimiento Informado</Button>
        <Typography
          variant="h6"
          align="justify"
          color="textSecondary"
          component="p"
          className={classes.p}
        >
          Selecciona el bot??n ???<b>Comenzar encuesta</b>??? si autorizas el uso de tus respuestas para nuestro an??lisis.
        </Typography>
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
              <Typography  sx={{ mt: 2 }} component="p" className={classes.p} align='justify'>
              Usted ha sido invitado(a) a participar en la encuesta ???<b>Barrios de Santiago</b>??? del <b>Instituto Milenio Fundamentos de los Datos</b>. 
              El objetivo es comparar algoritmos de detecci??n de barrios en la ciudad. Para participar en esta estudio, es importante que considere la siguiente informaci??n:
              </Typography>
              <Typography sx={{ mt: 2 }} component="p" className={classes.p} align='justify'>
              <b>Participaci??n</b>: Su participaci??n consistir?? en responder un cuestionario web a trav??s de la plataforma <a href="http://ciudades.imfd.cl">ciudades.imfd.cl</a>, 
              hospedada en servidores del instituto.
              La encuesta contempla que el informante identifique y seleccione entre pares de mapas aquel que piensa se ajusta de mejor modo a los barrios presentes en la zona.
              </Typography>
              <Typography sx={{ mt: 2 }} component="p" className={classes.p} align='justify'>
              <b>Riesgos</b>: Las respuestas de los informantes, adem??s de ser an??nimas, no contienen datos privados o sensibles. 
              Por tanto, se considera que no existen riesgos asociados.
              </Typography>
              <Typography sx={{ mt: 2 }} component="p" className={classes.p} align='justify'>
              <b>Beneficios</b>: Usted no recibir?? ning??n beneficio directo por participar en este estudio. 
              No obstante, su participaci??n permitir?? generar informaci??n valiosa para el desarrollo de tecnolog??as 
              de informaci??n geogr??fica, ??tiles para el desarrollo de pol??ticas p??blicas territoriales.
              </Typography>
              <Typography sx={{ mt: 2 }} component="p" className={classes.p} align='justify'>
              <b>Voluntariedad</b>: Su participaci??n es absolutamente voluntaria. Usted tendr?? la libertad de contestar las preguntas que desee, 
              como tambi??n de detener su participaci??n en cualquier momento que lo desee. Esto no implicar?? ning??n perjuicio para usted.
              </Typography>
              <Typography sx={{ mt: 2 }} component="p" className={classes.p} align='justify'>
              <b>Confidencialidad</b>: Todas sus respuestas ser??n an??nimas. Las presentaciones y publicaciones de este estudio, 
              no contendr??n datos confidenciales de sus informantes.
              </Typography>
              <Typography sx={{ mt: 2 }} component="p" className={classes.p} align='justify'>
              <b>Conocimiento de los resultados</b>: Usted tiene derecho a conocer los resultados de esta investigaci??n. 
              Para ello, una vez est??n listos podr?? conocerlos directamente a trav??s del sitio web <a href="http://ciudades.imfd.cl">ciudades.imfd.cl</a>.
              </Typography>
              <Typography sx={{ mt: 2 }} component="p" className={classes.p} align='justify'>
              Si requiere mayor informaci??n, o comunicarse por cualquier motivo relacionado con este estudio, puede contactar a Naim Bro en el correo naim.bro@imfd.cl.
              </Typography>
            </Container>
            
          </Box>
        </Modal>
      </Container>
        <Container item xs={4}>
          <Autocomplete
          disablePortal
          id="comunas"
          options={surveys}
          sx={{ width: '30%' }}
          renderInput={(params) => <TextField {...params} label="??En qu?? comuna desea participar?" />}
          onChange={(e, value) => chooseSurvey(value)}
          />
        
        {/**<Grid item xs={4}>
          <Typography id="discrete-slider" gutterBottom>
          En una escala de 0 a 10
          ??Qu?? tanto conoces esa comuna?
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
          ??Por qu?? escogi?? esta comuna?
          </Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox onChange={(e, value) => handleReason(value,"Vivo actualmente en dicha comuna")}/>} label="Vivo actualmente en dicha comuna" />
            <FormControlLabel control={<Checkbox onChange={(e, value) => handleReason(value, "Viv?? en dicha comuna")}/>} label="Viv?? en dicha comuna" />
            <FormControlLabel control={<Checkbox onChange={(e, value) => handleReason(value, "Trabajo en dicha comuna")}/>} label="Trabajo en dicha comuna" />
            <FormControlLabel control={<Checkbox onChange={(e, value) => handleReason(value, "Otro")}/>} label="Otro" />
          </FormGroup>
        </Grid> */}
      </Container>
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
          Debe seleccionar 1 comuna ??? <strong>Revisar!</strong>
        </Alert>}
      </Container>
      </Container>
      }
      { instructions &&
        <Instructions startSurvey={startSurvey}></Instructions>
      }
      {/* {!landing && <Survey survey={chosenSurvey} knowledge={knowledge} reason={reason}/>} */
      !landing && !instructions && <Survey survey={chosenSurvey=='Providencia-??u??oa'? 'Providencia-Nunoa' : chosenSurvey} reason={''}/>
      }
      
      <Footer />
    </React.Fragment>
  );
};

export default Landing;