import React, { useState, useEffect } from "react";
import ConnectApi from "../api/ConnectApi";
import axios from 'axios';

// MaterialUI
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Alert, AlertTitle } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import ButtonBase from '@material-ui/core/ButtonBase';
import TextField from '@material-ui/core/TextField';
import { Grid, LinearProgress, Modal, Box, Slider } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  correct: {
    color: "blue",
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
  },
  image: {
    border: '4px solid white',
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',

  },
  imageIcon: {
    position: 'absolute',
    right: '1%',
    bottom: '6%',
    height: 50,
    width: 50,
  },
  imageModal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
  imageList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  comment_block: {
    margin: 20
  },
  p: {
    padding: 10
  },
  progressBar: {
    height: 50
  },

  slider: {
    height:24,
    width:"100% !important",
    borderRadius: 24,
    opacity:1,
  }
}));

export const Survey = ({ survey, reason }) => {
  const classes = useStyles();
  const [session, setSession] = useState(0)
  const ROOT_API_URL = process.env.REACT_APP_ROOT_API_URL;
  const API_URL = ROOT_API_URL + "survey/" + survey + "/";
  const API_URL_POST = ROOT_API_URL + "survey/reply/";
  const [dataState] = ConnectApi(API_URL);
  const a = dataState.data.flatMap((q) => q.answer);
  const ac = a.length;
  const qty = dataState.data.length;
  const [surveyTitle, setSurveytitle] = useState("");
  const [colors, setColors] = useState({});
  let [answer, setAnswer] = useState({});
  const [knowledge, setKnowledge] = useState(5);
  const [comment, setComment] = useState("");
  const [currentquestion, setCurrentquestion] = useState(0);
  const [alert, setAlert] = useState();
  const [finalComment, setFinalcomment] = useState("");
  const [open, setOpen] = useState(false);
  const [enlarge, setEnlarge] = useState("");
  const icon_src = "https://cdn0.iconfinder.com/data/icons/arrows-4-7/128/Fullscreen-Arrows-Enlarge-Maximize-Zoom-Area-512.png";

  useEffect(() => {
    if (Object.keys(answer).length === 0) {
      setAnswer(createInitalAnswers());
      setColors(createInitalColors());
      setAlert(createInitialAlert());
      setSurveytitle(createInitialSurveytitle());
      setSession(createSession());
    }
  });

  const createInitialSurveytitle = () => {
    // var object = "";
    // try {
    //   object = dataState.data[1]['survey']['title']
    // }
    // catch {
    //   object = ""
    // }
    return ""
  }

  const createInitalAnswers = () => {

    var object = {};
    for (const i in dataState.data) {
      let z = dataState.data[i]['answer'].flatMap((obj) => obj.id);
      object[i] = {}
      for (var x = 0; x < z.length; x++) {
        object[i][z[x]] = false;
      }
    }
    return object;
  };

  const createInitalColors = () => {
    let z = a.flatMap((obj) => obj.id);
    var object = {};
    for (var x = 0; x < ac; x++) {
      object[z[x]] = 'white';
    }
    return object;
  };

  const createInitialAlert = () => {
    var object = {};
    for (var x = 0; x < qty; x++) {
      object[x] = false;
    }
    return object
  };

  const createSession = () => {
    const text = Date.now().toString(36);
    var hash = 0
    for (let i = 0; i < text.length; i++) {
      let ch = text.charCodeAt(i);
      hash = ((hash << 5) - hash) + ch;
      hash = hash & hash;
    }

    return hash
  }

  const handleSelection = (e, id, i) => {
    let answercopy = { ...answer };
    let colorscopy = { ...colors }
    for (const ans in answercopy[i]) {
      answercopy[i][ans] = false;
      colorscopy[ans] = 'white'
      if (ans == id) {
        colorscopy[ans] = 'green'
      }
    }
    answercopy[i][id] = true;
    setAnswer(answercopy)
    setColors(colorscopy)
  };

  const handleComment = (e, i) => {
    setComment({ ...comment, [i]: e.target.value });
  };

  const handleFinalcomment = (e) => {
    setFinalcomment(e.target.value);
  };

  const handleOpen = (e, image_url) => { setOpen(true); setEnlarge(image_url) };
  const handleClose = () => setOpen(false);

  const nextQuestion = (i) => {
    setAlert(false);

    for (const ans in answer[i]) {
      if (answer[i][ans]) {
        setCurrentquestion(currentquestion + 1);
        let reasons = "";
        for (const r in reason) {
          reasons += reason[r] ? "," + r : ""
        }
        let comment_text = comment[i] != null && comment[i] != "" ? comment[i] : "sin comentario"
        let reasons_text = reasons != null && reasons != "" ? reasons : "sin raz??n"
        const body = {
          "answer": ans,
          "comment": comment_text,
          "reason": reasons_text,
          "knowledge_scale": knowledge,
          "session": session
        }
        axios.post(API_URL_POST + "create/", body)
      }
      else {
        setAlert({ ...alert, [i]: true });
      }
    }
  };

  const submitAnswer = (i) => {
    let comment_text = finalComment != null && finalComment != "" ? finalComment : "sin comentario final"
    const finalBody = {
      "final_comment": comment_text,
      "survey": dataState.data[1]['survey']['id'],
      "certainty_sense": knowledge,
      "session": session
    }
    axios.post(API_URL_POST + 'finalcomment/', finalBody)

    setCurrentquestion(currentquestion + 1)
  };

  const finishSurvey = (i) => {
    setAlert(false);

    for (const ans in answer[i]) {
      if (answer[i][ans]) {
        let reasons = "";
        for (const r in reason) {
          reasons += reason[r] ? "," + r : ""
        }
        let comment_text = comment[i] != null && comment[i] != "" ? comment[i] : "sin comentario"
        let reasons_text = reasons != null && reasons != "" ? reasons : "sin raz??n"
        const body = {
          "answer": ans,
          "comment": comment_text,
          "reason": reasons_text,
          "session": session,
        }
        axios.post(API_URL_POST + "create/", body)
        window.location.reload()
      }
      else {
        setAlert({ ...alert, [i]: true });
      }
    }
  }

  const handleKnowledge = (val) => {
    setKnowledge(val)
  }

  const getRegionName = (title) => {
    // const zone = title.split(" - ")[0]; 
    let zone_text = ""
    console.log(title)
    
    if (title.includes("RM")) {
      zone_text = "del Gran Santiago"
    }
    else if (title.includes("SANTIAGO")) {
      zone_text = "la comuna de Santiago"
    } 
    else if (title.includes("PROVIDENCIA-??U??OA")) {
      zone_text = "las comunas de  Providencia y ??u??oa"
    } 
    else {
      zone_text = "estos mapas"
    }
    return zone_text
  }

  return (
    <React.Fragment>
      <Container
        component="main"
        maxWidth="lg"
      >
        <div className={classes.paper}>
          {dataState.data.map(({ title, answer }, i) => (
            <Grid key={i}>
              {i === currentquestion &&
                <Container>
                  <Typography component="h1" variant="h3" align="center">
                  Encuesta: "Barrios de Santiago"
                  </Typography>
                  <LinearProgress variant="determinate" value={(i + 1) / (qty + 1) * 100} className={classes.progressBar} />
                  <Typography component="h1" variant="h5" align="center">
                    Selecciona la imagen que mejor representa los barrios de {getRegionName(title)}.
                  </Typography>
                  <Grid key={i} container spacing={0}
                  >
                    {answer.map(({ id, image_url, answer_text }) => (
                      <Grid
                        item xs={12} md={6}
                        key={id}
                      >
                        <ButtonBase
                          focusRipple
                          key={id}
                          className={classes.image}
                          focusVisibleClassName={classes.focusVisible}
                          style={{
                            width: '100%',
                            height: '50vh',
                            borderColor: `${colors[id]}`
                          }}>
                          <span
                            className={classes.imageSrc}
                            style={{
                              backgroundImage: `url(${image_url})`,
                            }}
                            value={id}
                            onClick={(e) => handleSelection(e, id, i)}
                          >
                            <img
                              alt=""
                              src={icon_src}
                              className={classes.imageIcon}
                              onClick={(e) => handleOpen(e, image_url)}
                            />
                          </span>
                        </ButtonBase>
                        <Modal
                          open={open}
                          onClose={handleClose}
                        >
                          <Box>
                            <img
                              alt=""
                              src={enlarge}
                              className={classes.imageModal}
                              onClick={handleClose}
                            />
                          </Box>
                        </Modal>
                      </Grid>

                    ))}

                    <TextField
                      id="outlined-basic"
                      label="Puedes comentar ac??."
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                      value={comment[i]}
                      onChange={(e) => handleComment(e, i)}
                      className={classes.comment_block}
                    />
                    {alert[i] &&
                      <Alert severity="error" >
                        <AlertTitle>Error</AlertTitle>
                        Debes seleccionar 1 alternativa.
                      </Alert>
                    }
                    {currentquestion < qty &&
                      <Container>
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          className={classes.submit}
                          onClick={() => nextQuestion(i)}
                        >
                          Siguiente Pregunta
                        </Button>
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          className={classes.submit}
                          onClick={() => setCurrentquestion(currentquestion + 1)}
                        >
                          Omitir Pregunta
                        </Button>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          className={classes.submit}
                          onClick={() => {
                            setCurrentquestion(qty)
                            finishSurvey(i)
                          }}
                        >
                          Finalizar Encuesta
                        </Button>
                      </Container>
                    }
                  </Grid>
                </Container>
              }
            </Grid>
          ))}
          <Container>
            {currentquestion === qty &&
              <Container>
                <Typography id="discrete-slider" gutterBottom>
                  En una escala de 0 a 10
                  ??Qu?? tan segur@ te sientes con tus respuestas?
                </Typography>
                <Box m={2} pt={3}>
                  <Slider
                    defaultValue={5}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="on"
                    step={1}
                    marks={true}
                    min={1}
                    max={10}
                    className={classes.slider}
                    lineHeight= {1000}
                    onChange={(e, value) => handleKnowledge(value)}
                  />
                </Box>
                <TextField
                  id="outlined-basic"
                  label="??Alg??n comentario final?"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={finalComment}
                  onChange={(e) => handleFinalcomment(e)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => submitAnswer()}
                >
                  Finalizar Encuesta
                </Button>
              </Container>
            }
          </Container>
          <Container>
            {currentquestion === qty + 1 &&
              <Container>
                <Typography
                  variant="h6"
                  align="justify"
                  component="p"
                  className={classes.p}
                >
                  Muchas gracias por tu participaci??n en el estudio ???Barrios de Santiago??? del Instituto Milenio Fundamento de los datos. ??Tu participaci??n ser?? de mucha ayuda!
                </Typography>
                <Typography 
                  component="h1" 
                  variant="h6" 
                  align="justify"
                  component="p"
                  className={classes.p}
                >
                  Si quieres colaborar m??s, puedes ayudarnos a difundir la encuesta en tus redes sociales o invitar a tus cercanos a participar.
                  Te invitamos a seguir nuestras redes en <a href="https://www.facebook.com/Fundamentosdelosdatos">Facebook</a> y <a href="https://twitter.com/IMFDChile">Twitter</a>, 
                  donde podr??s conocer los resultados de esta y otros  estudios.
                </Typography>
                <Typography component="h1" variant="h5" align="center">
                  ??Un saludo!
                </Typography>
              </Container>
            }
          </Container>
        </div>
      </Container>
      {/* <Footer /> */}
    </React.Fragment>
  );
};

export default Survey;