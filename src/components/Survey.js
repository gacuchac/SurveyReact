import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ConnectApi from "../api/ConnectApi";
import Header from "./framework/Header";
import Footer from "./framework/Footer";

// MaterialUI
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Alert, AlertTitle } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import ButtonBase from '@material-ui/core/ButtonBase';
import TextField from '@material-ui/core/TextField';


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
  const [dataState] = ConnectApi(API_URL);
  const a = dataState.data.flatMap((q) => q.answer);
  const ac = a.length;
  const [colors, setColors] = useState({});
  const [answer, setAnswer] = useState({});
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (Object.keys(answer).length === 0) {
      setAnswer(createInitalAnswers());
      setColors(createInitalColors());
    }
  }, [answer]);

  const handleSelection = (e, id) => {
      if (answer[id].ans){
        setAnswer({ ...answer, [id]: {ans:!answer[id].ans, colr:'white'} });
        setColors({...colors, [id]:'white'})
      }
      else {
        setAnswer({ ...answer, [id]: {ans:!answer[id].ans, colr:'red'} });
        setColors({...colors, [id]:'red'})
      }
      
    
  };
  console.log(answer, colors, comment)

  const handleComment = (e) =>{
      setComment(e.target.value)
  };


  const createInitalAnswers = () => {
    let z = a.flatMap((obj) => obj.id);
    var object = {};
    for (var x = 0; x < ac; x++) {
      object[z[x]] = {ans:false, colr:'white'};
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

  function refreshPage() {
    window.location.reload(false);
  }

  const submitAnswer = () => {

  }

  
  return (
    <React.Fragment>
      <Header />
      <Container component="main" maxWidth="sm">
        <div className={classes.paper}>
          {dataState.data.map(({ title, answer }, i) => (
            <div key={i}>
              <Typography component="h1" variant="h5">
                {title}
              </Typography>

              { answer.map(({id, image_url}) => (
                    <ButtonBase
                    focusRipple
                    key={id}
                    className={classes.image}
                    focusVisibleClassName={classes.focusVisible}
                    style={{
                        width: '50%',
                        borderColor: `${colors[id]}`
                      }}
                      
                    >
                    <span
                        className={classes.imageSrc}
                        style={{
                        backgroundImage: `url(${image_url})`,
                        }}
                        value={id}
                        onClick={(e) => handleSelection(e, id, answer[id])}

                    />
                    </ButtonBase>
                
                ))} 

              <TextField 
              id="outlined-basic" 
              label="Comments" 
              variant="outlined" 
              fullWidth
              multiline
              rows={4}
              value = {comment}
              onChange={handleComment}
              />
            </div>
          ))}
        </div>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitAnswer}
            >
            Submit Answer
        </Button>
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default Survey;