import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import React, { useState } from "react";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { editFieldInStoreObject } from "../../services/crud";
import { uid } from "uid";
const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: "5rem",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
}));
export default function ConsumerCheckIn(props: any) {
  const classes = useStyles();
  const [input, setInput] = useState<any>({});

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSetConsumer = async (e) => {
    e.preventDefault();
    setInput({
      ...input,
      createdAt: Date.now(),
    });
    const doc = await editFieldInStoreObject(props.docid, props.collection);
    if (input.createdAt) {
      doc.set(
        {
          items: {
            [uid()]: input,
          },
        },
        { merge: true }
      );
    }
  };

  return (
    <Container component="main" className={classes.container} maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <RestaurantIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Checkin Formulier
        </Typography>
        <form onSubmit={handleSetConsumer} className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={handleInputChange}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Naam"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={handleInputChange}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Familienaam"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleInputChange}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email adres"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleInputChange}
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Gsm-nummer"
                name="phone"
                autoComplete="phone"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Indienen
          </Button>
        </form>
      </div>
    </Container>
  );
}
