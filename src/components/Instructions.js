import React, { useState, useEffect } from "react";
import Header from "./framework/Header";
import Footer from "./framework/Footer";
import ConnectApi from "../api/ConnectApi";
import Survey from "./Survey";

// MaterialUI
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
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

export const Instructions = ({startSurvey}) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Container
        component="main"
        maxWidth="lg"
      >
        <Typography
          component="h1"
          variant="h3"
          align="center"
          color="textPrimary"
          gutterBottom

        >
          Instrucciones
        </Typography>
        <Typography
          variant="h6"
          align="justify"
          component="p"
          className={classes.p}>
          A continuación hay dos imágenes representando una zona de Santiago (puede ser una comuna, varias, o toda la región). 
          En ellas se encuentran repartidos puntos de colores que agrupados representan a un “barrio” en particular. 
          Los colores distinguen entre diferentes barrios: no tienen un significado en sí. Deberás hacer click en la imagen 
          que consideres representa mejor los barrios existentes en la zona. Esto es según tu experiencia y <b>no hay respuestas incorrectas</b>.
        </Typography>
        <Typography
          variant="h6"
          align="justify"
          component="p"
          className={classes.p}>
          Ejemplo:
        </Typography>
        <Typography
          variant="h6"
          align="justify"
          component="p"
          className={classes.p}>
          Una vez que hayas seleccionado una de las imágenes y veas un borde verde en ella, puedes avanzar a la siguiente pregunta. 
          Además encontrarás una caja de comentarios donde -opcionalmente- podrás dejar comentarios.
        </Typography>
        <Typography
          variant="h6"
          align="justify"
          component="p"
          className={classes.p}>
          Al finalizar la encuesta te preguntaremos en una escala del 1 al 10 cuán segur@ te sentiste con tus respuestas.
        </Typography>
        <Button 
          fullWidth
          variant="outlined"
          color="primary"
          onClick={startSurvey}>
          SEGUIR
        </Button>
      </Container>
    </React.Fragment>
  )
}

export default Instructions;