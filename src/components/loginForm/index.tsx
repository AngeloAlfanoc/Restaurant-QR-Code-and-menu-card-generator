import {
  Button,
  Container,
  CssBaseline,
  FormGroup,
  Grid,
  TextField,
  Typography,
  Link,
} from "@material-ui/core";
import React, { useRef, useState } from "react";

import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { login } from "../../services/auth";
import { DASHBOARD } from "../../constants/routes";
import { Box } from "@material-ui/core";
import { REGISTER } from "../../constants/routes";
export default function LoginForm() {
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(emailRef.current.value, passwordRef.current.value);
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
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
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      marginTop: theme.spacing(8),
    },

    avatar: {
      backgroundColor: theme.palette.secondary.main,
      margin: theme.spacing(1),
    },

    form: {
      marginTop: theme.spacing(3),
      width: "100%", // Fix IE 11 issue.
    },

    submit: {
      margin: theme.spacing(2, 0, 2),
      width: "100%",
    },
  }));
  const classes = useStyles();
  return (
    <>
      <Container component="main" className={classes.container} maxWidth="xs">
        <CssBaseline />
        <Typography component="h2" variant="h3">
          Login
        </Typography>
        {error && (
          <Alert className="my-2" color="error" variant="filled">
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
            <Button
              variant="contained"
              disabled={loading}
              type="submit"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
          </Grid>
        </form>
        <Box>
          <p className="text-center">
            Nog geen account? klik dan{" "}
            <Link href={REGISTER} underline={"hover"}>
              hier.
            </Link>
          </p>
        </Box>
      </Container>
    </>
  );
}
