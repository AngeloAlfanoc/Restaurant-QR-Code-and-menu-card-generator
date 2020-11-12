import React, { useRef, useState, useContext } from "react";
import {
  Button,
  Container,
  CssBaseline,
  FormGroup,
  Grid,
  TextField,
  Typography,
  Box,
  Link,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { signup } from "../../services/auth";
import { DASHBOARD } from "../../constants/routes";
import { LOGIN } from "../../constants/routes";

const RegistrationForm = () => {
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const passwordRepeat = useRef<HTMLInputElement>();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (passwordRef.current.value !== passwordRepeat.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);

      // Get user payload
      await signup(emailRef.current.value, passwordRef.current.value);

      // Refer user to dashboard landing screen
      history.push(DASHBOARD);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }

  const useStyles = makeStyles((theme) => ({
    container: {
      marginBottom: "5rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignContent: "center",
      height: "100vh",
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
      width: "100%",
      margin: theme.spacing(2, 0, 2),
    },
  }));

  const classes = useStyles();
  return (
    <Container component="main" className={classes.container} maxWidth="xs">
      <CssBaseline />
      <Typography component="h2" variant="h3">
        Registreer
      </Typography>
      {error && (
        <Alert className="my-2" color="error">
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit} className={classes.form}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <FormGroup id="email">
              <TextField
                type="email"
                inputRef={emailRef}
                required
                autoComplete="email"
                name="Email"
                variant="outlined"
                fullWidth
                id="email"
                label="E-mail"
                autoFocus
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormGroup id="password">
              <TextField
                type="password"
                inputRef={passwordRef}
                required
                autoComplete="password"
                name="Password"
                variant="outlined"
                fullWidth
                id="password"
                label="Wachtwoord"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormGroup id="password-repeat">
              <TextField
                type="password"
                inputRef={passwordRepeat}
                required
                autoComplete="password"
                name="Password"
                variant="outlined"
                fullWidth
                id="password-repeat-input"
                label="Herhaal Wachtwoord"
              />
            </FormGroup>
          </Grid>
          <Button
            variant="contained"
            disabled={loading}
            type="submit"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </Grid>
      </form>
      <Box>
        <p className="text-center">
          Heeft u al een account? klik dan{" "}
          <Link href={LOGIN} underline={"hover"}>
            hier.
          </Link>
        </p>
      </Box>
    </Container>
  );
};

export default RegistrationForm;
