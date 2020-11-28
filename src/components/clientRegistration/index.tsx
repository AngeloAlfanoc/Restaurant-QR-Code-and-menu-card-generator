import React, { useContext, useEffect, useRef, useState } from "react";
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
import {
  addPublicCompanyData,
  verifyAccountInfoInStore,
} from "../../services/crud";
import InputAdornment from "@material-ui/core/InputAdornment";
import csc from "country-state-city";

import { Autocomplete } from "@material-ui/lab";
import { uid } from "uid";
import { UserContext } from "../../contexts/userContext";

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
  const { user } = useContext(UserContext);
  const states = csc.getStatesOfCountry("21");
  const classes = useStyles();
  const [input, setInput] = useState<any>({});
  const [cities, setCities] = useState([]);
  const inputRef = useRef<HTMLInputElement>();
  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await verifyAccountInfoInStore(
      input.companyName,
      input.VATNumber,
      input.phone,
      input.location,
      input.checkTOS,
      props.id
    );
    await addPublicCompanyData(uid(), user.uid);
  };
  useEffect(() => {
    const tempArr = [];
    states.forEach((item) => {
      csc.getCitiesOfState(item.id).forEach((item) => {
        tempArr.push(item);
      });
    });
    setCities(tempArr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                onChange={handleInputChange}
                // ref={companyRef}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
              <Autocomplete
                options={cities}
                onChange={(event, option) => {
                  setInput({
                    ...input,
                    location: option.name,
                  });
                }}
                getOptionLabel={(option) => option.name}
                renderOption={(option) => <>{option.name}</>}
                renderInput={(params) => (
                  <TextField
                    inputRef={inputRef}
                    onChange={handleInputChange}
                    name="location"
                    {...params}
                    label="Locatie*"
                    variant="outlined"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleInputChange}
                    required
                    name="checkTOS"
                    value="acceptedTOS"
                    color="secondary"
                  />
                }
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
