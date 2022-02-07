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
import { Grid, LinearProgress, Modal, Box } from "@material-ui/core";


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
    right: '3%',
    bottom: '3%',
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
}));

export const Survey = ({ survey, knowledge, reason }) => {
  const classes = useStyles();
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
    }
  });

  const createInitialSurveytitle = () => {
    var object = "";
    try {
      object = dataState.data[1]['survey']['title']
    }
    catch {
      object = ""
    }
    return object
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

  const handleSelection = (e, id, i) => {
    let answercopy = { ...answer };
    let colorscopy = { ...colors }
    for (const ans in answercopy[i]) {
      answercopy[i][ans] = false;
      colorscopy[ans] = 'white'
      if (ans == id) {
        colorscopy[ans] = 'blue'
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
        let comment_text = comment[i] != null ? comment[i] : ""
        let reasons_text = reasons != null && reasons != "" ? reasons : "sin razón"
        const body = {
          "answer": ans,
          "comment": comment_text,
          "reason": reasons_text,
          "knowledge_scale": knowledge,
        }
        console.log(body)
        axios.post(API_URL_POST + "create/", body)
      }
      else {
        setAlert({ ...alert, [i]: true });
      }
    }
  };

  const submitAnswer = () => {
    const finalBody = {
      "final_comment": finalComment, "survey": dataState.data[1]['survey']['id'],
    }
    axios.post(API_URL_POST + 'finalcomment/', finalBody)

    setCurrentquestion(currentquestion + 1)
  };

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
                    {dataState.data[i]['survey']['title']}
                  </Typography>
                  <LinearProgress variant="determinate" value={(i + 1) / (qty + 1) * 100} />
                  <Typography component="h1" variant="h5" align="center">
                    Seleccione la imagen que mejor segmenta la región mostrada.
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
                      label="Puede comentar acá."
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                      value={comment[i]}
                      onChange={(e) => handleComment(e, i)}
                    />
                    {alert[i] &&
                      <Alert severity="error" >
                        <AlertTitle>Error</AlertTitle>
                        Debe seleccionar 1 alternativa — <strong>Revisar!</strong>
                      </Alert>
                    }
                    {currentquestion < qty &&
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => nextQuestion(i)}
                      >
                        Siguiente Pregunta
                      </Button>
                    }
                  </Grid>
                </Container>
              }
            </Grid>
          ))}
          <Container>
            {currentquestion === qty &&
              <Container>
                <TextField
                  id="outlined-basic"
                  label="¿Algún comentario final?"
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
                  Registrar Respuestas
                </Button>
              </Container>
            }
          </Container>
          <Container>
            {currentquestion === qty + 1 &&
              <Typography component="h1" variant="h5" align="center">
                Muchas gracias por su participación
              </Typography>
            }
          </Container>
        </div>
      </Container>
      {/* <Footer /> */}
    </React.Fragment>
  );
};

export default Survey;