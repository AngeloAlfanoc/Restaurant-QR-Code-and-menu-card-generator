import React, { useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { VerifyAccountInfoInStore } from "../../services/crud";
import InputAdornment from "@material-ui/core/InputAdornment";

type ClientRegistrationProps = { id: string };

const useStyles = makeStyles((theme) => ({
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
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function VerifyUser(props: ClientRegistrationProps) {
  const classes = useStyles();
  const companyRef = useRef(null);
  const vatRef = useRef(null);
  const locationRef = useRef(null);
  const phoneRef = useRef(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await VerifyAccountInfoInStore(
      companyRef.current.value,
      vatRef.current.value,
      locationRef.current.value,
      phoneRef.current.value,
      props.id
    );
  };

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Vul aan om verder te gaan.
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                ref={companyRef}
                autoComplete="companyName"
                name="companyName"
                variant="outlined"
                required
                fullWidth
                id="companyName"
                label="Naam bedrijf"
                autoFocus
                type="text"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                ref={vatRef}
                variant="outlined"
                required
                fullWidth
                id="VAT"
                label="BTW Nummer"
                name="VATNumber"
                autoComplete="VATNumber"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">BE</InputAdornment>
                  ),
                }}
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                ref={phoneRef}
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Telefoon Nummer"
                name="phone"
                autoComplete="phone"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+32</InputAdornment>
                  ),
                }}
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                ref={locationRef}
                variant="outlined"
                required
                fullWidth
                id="location"
                label="Locatie"
                name="location"
                autoComplete="location"
                type="text"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="acceptTOS" color="secondary" />}
                label="Door dit aan te vinken ga je akkoord met onze algemene voorwaarden"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Activeer mijn gratis account en ga verder
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
