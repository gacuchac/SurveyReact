import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ConnectApi from "../api/ConnectApi";
import Header from "./framework/Header";
import Footer from "./framework/Footer";
import axios from 'axios';

// MaterialUI
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Alert, AlertTitle } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import ButtonBase from '@material-ui/core/ButtonBase';
import TextField from '@material-ui/core/TextField';
import { Grid, LinearProgress } from "@material-ui/core";


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
    alignItems: 'center',
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
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  imageList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
}));

export const Survey = () => {
  const classes = useStyles();
  const { title } = useParams();
  const API_URL = "http://127.0.0.1:8000/survey/" + title + "/";
  const API_URL_POST = "http://127.0.0.1:8000/survey/reply/";
  const [dataState] = ConnectApi(API_URL);
  const a = dataState.data.flatMap((q) => q.answer);
  const ac = a.length;
  const qty = dataState.data.length;
  const [surveyTitle, setSurveytitle] = useState("");
  const [colors, setColors] = useState({});
  let [answer, setAnswer] = useState({});
  const [comment, setComment] = useState("");
  const [currentquestion, setCurrentquestion] = useState();
  const [alert, setAlert] = useState();
  const [finalComment, setFinalcomment] = useState("");
  

  useEffect(() => {
    if (Object.keys(answer).length === 0) {
      setAnswer(createInitalAnswers());
      setColors(createInitalColors());
      setCurrentquestion(0);
      setAlert(createInitialAlert());
      setSurveytitle(createInitialSurveytitle());
    }
  }, [answer]);
  
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
    for (const i in dataState.data){
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
    for (var x = 0; x<qty; x++){
      object[x] = false;
    }
    return object
  };

  const handleSelection = (e, id,i) => {   
      let answercopy = {...answer};
      let colorscopy = {...colors}
      for (const ans in answercopy[i]){
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

  const handleComment = (e ,i) =>{
      setComment({ ...comment, [i]: e.target.value});
  };

  const handleFinalcomment = (e) =>{
    setFinalcomment(e.target.value);
};

  const nextQuestion = (i) => {
    setAlert(false);
      for (const ans in answer[i]){
          if(answer[i][ans]){
              setCurrentquestion(currentquestion+1);
          }
          else {
            console.log("else alert true")
              setAlert({...alert, [i]:true});
          }
      }
  };

  const submitAnswer = () => {
      let i = qty-1;
      let sub = false;
      for (const ans in answer[qty-1]){
        if(answer[i][ans]){
            console.log("ans: " + answer[i][ans])
            sub = true;
        }
        else {
          setAlert({...alert, [i]:true});
        }
    }
      let k = 0;
      if (sub) {
        for (const i in answer) {
          for ( const ans in answer[i]) {
              if (answer[i][ans]) {
                const body = {"answer": ans, "comment":comment[k]}
                console.log(body)
                k++;
                axios.post(API_URL_POST + "create/",body)
            }
          }
        }
        const finalBody = {"final_comment": finalComment, "survey":dataState.data[1]['survey']['id']}
        axios.post(API_URL_POST + 'finalcomment/', finalBody)

        setCurrentquestion(currentquestion + 1)

      }  
  };

  
  return (
    <React.Fragment>
      <Header />
      <Container component="main" maxWidth="sm">
        <div className={classes.paper}>
        <Typography component="h1" variant="h3" align="center">
          {surveyTitle}
        </Typography>
          {dataState.data.map(({ title, answer }, i) => (
            <Grid key={i}>
                { i===currentquestion &&
                <Container>
                  <LinearProgress variant="buffer" value={(i+1)/(qty+1)*100} />
                  <Typography component="h1" variant="h5" align="center">
                  Seleccione la imágen que mejor segmenta la región mostrada.
                </Typography>
                <Grid key={i} container spacing={2}>
                    { answer.map(({id, image_url, answer_text}) => (
                      <Grid item xs={6} key={id}>
                        {/* <Typography component="h1" variant="h5" align="center">
                        {answer_text}
                        </Typography> */}
                        <ButtonBase
                        focusRipple
                        key={id}
                        className={classes.image}
                        focusVisibleClassName={classes.focusVisible}
                        style={{
                            width: '100%',
                            borderColor: `${colors[id]}`
                        }}>
                        <span
                        className={classes.imageSrc}
                        style={{
                        backgroundImage: `url(${image_url})`,
                        }}
                        value={id}
                        onClick={(e) => handleSelection(e, id,i)}
                        />
                        </ButtonBase>
                      </Grid>
                        
                    ))} 

                    <TextField 
                    id="outlined-basic" 
                    label="Puede comentar acá." 
                    variant="outlined" 
                    fullWidth
                    multiline
                    rows={4}
                    value = {comment[i]}
                    onChange={(e) => handleComment(e,i)}
                    />
                    {alert[i] &&
                    <Alert severity="error" >
                    <AlertTitle>Error</AlertTitle>
                    Debe seleccionar 1 alternativa — <strong>Revisar!</strong>
                   </Alert> 
                    }
                    {currentquestion<qty &&
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
          {currentquestion===qty &&
                    <Container>
                      <TextField 
                      id="outlined-basic" 
                      label="¿Algún comentario final?" 
                      variant="outlined" 
                      fullWidth
                      multiline
                      rows={4}
                      value = {finalComment}
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
            {currentquestion === qty+1 &&
            <Typography component="h1" variant="h5" align="center">
            Muchas gracias por su participación
            </Typography>
            }
          </Container>
        </div>
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default Survey;