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
import { uid } from "uid";
import {addCheckinData} from "../../services/crud"
import { InputAdornment } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
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
  const [loading, setLoading] = useState<boolean>(false)
  const [succes, setSucces] = useState<boolean>(false)
  const [alert, setAlert] = useState<string>()
  const [error, setError] = useState<string>()
 
  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSetConsumer = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      await addCheckinData(props.docid, input.firstName, input.lastName, input.email, input.phone,  Date.now())
    }
    catch (e) {
      setError(e)
    }
    finally {
      setAlert("Uw checkin werd verstuurd!")
      setSucces(true)
    }
    setLoading(false)
    
  };

  return (
    <Container component="main" className={classes.container} maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <RestaurantIcon />
        </Avatar>
        {alert && <Alert severity="success">{alert}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
{   !succes &&    <><Typography component="h1" variant="h5">
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
                type="text"
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
                type="text"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleInputChange}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleInputChange}
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="gsm/telefoon"
                name="phone"
                autoComplete="phone"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+32</InputAdornment>
                  ),
                }}
                type="phone"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            className={classes.submit}
          >
            Indienen
          </Button>
        </form></>}
      </div>
    </Container>
  );
}
