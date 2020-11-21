import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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
import { UpdateAccountInfoInStore } from "../../services/crud";
import InputAdornment from "@material-ui/core/InputAdornment";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
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

export default function ClientSettings(props) {
  const classes = useStyles();
  const [input, setInput] = useState<any>({});

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  useLayoutEffect(() => {
    setInput({
      company: props.data.company,
      vat: props.data.vat,
      phone: props.data.phone,
      location: props.data.location,
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await UpdateAccountInfoInStore(
      input.company,
      input.vat,
      input.phone,
      input.location,
      props.id
    );
  };

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography className="mt-5" component="h1" variant="h4">
          Instellingen
        </Typography>
        <Typography className="mt-5" component="h1" variant="h5">
          Algemeen
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={handleInputChange}
                autoComplete="companyName"
                name="company"
                required
                fullWidth
                id="companyName"
                label="Naam bedrijf"
                autoFocus
                type="text"
                value={input.company}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={handleInputChange}
                required
                fullWidth
                id="VATNumber"
                label="BTW Nummer"
                name="vat"
                autoComplete="VATNumber"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">BE</InputAdornment>
                  ),
                }}
                type="number"
                value={input.vat}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={handleInputChange}
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
                value={input.phone}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={handleInputChange}
                fullWidth
                id="location"
                label="Locatie"
                name="location"
                autoComplete="location"
                type="text"
                value={input.location}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Opslaan
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
