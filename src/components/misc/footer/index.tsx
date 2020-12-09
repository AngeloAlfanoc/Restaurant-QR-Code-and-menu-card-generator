import React from "react";
import { Typography } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import { Grid, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import mollie from "../../../assets/png/mollie.png";
import "./index.scss";
const footers = [
  {
    title: "Over Ons",
    description: ["Mogelijkheden", "Contact", "Meer informatie", "Prijzen"],
  },
  {
    title: "Meer",
    description: ["Promoties", "Registreer", "Login"],
  },
  {
    title: "Volg",
    description: ["Facebook", "Linkedin", "Instagram"],
  },
  {
    title: "Legaal",
    description: ["Privacy Beleid", "Algemene voorwaarden", "GDPR"],
  },
];

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

export default function Footer() {
  const classes = useStyles();
  function Copyright(props: any) {
    return (
      <div className={props.className}>
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="https://www.methods.digital">
            methods
          </Link>
          {new Date().getFullYear()}
        </Typography>
      </div>
    );
  }
  return (
    <div>
      <Grid className={classes.footer} container spacing={4} justify="space-evenly">
        {footers.map((footer) => (
          <Grid item xs={6} sm={3} key={footer.title}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              {footer.title}
            </Typography>
            <ul>
              {footer.description.map((item) => (
                <li key={item}>
                  <Link href="#" variant="subtitle1" color="textSecondary">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </Grid>
        ))}
      </Grid>

      <Box className="d-flex justify-content-center">
        <img width="25%" alt="banner payment options mollie" src={mollie}></img>
      </Box>
      <Copyright className="my-2" />
    </div>
  );
}
