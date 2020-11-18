import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import StarIcon from "@material-ui/icons/StarBorder";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
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
}));

const tiers = [
  {
    title: "Gratis",
    subheader: "Bij aanmaken van account reeds actief",
    price: "0",
    description: [
      "Beschikbaar op tablet of smartphone",
      "Volledige interactive menu",
      "Veelzijdige administration tool",
      "Foto's van gerechten / andere nuttigingen",
      "Overzicht van consumenten die ingecheckt hebben",
    ],
    buttonText: "Maak een account",
    buttonDemo: "Bekijk Demo",
    buttonVariant: "outlined",
  },
  {
    title: "Pro",
    subheader: "Populair",
    price: "29,99",
    description: [
      "Beschikbaar op tablet of smartphone",
      "Volledige interactive menu",
      "Overzicht van consumenten die ingecheckt hebben",
      "keuze uit verschillende menu layouts",
      "Veelzijdige administration tool",
      "Foto's in 3D weergave voor een realistische weergave!",
      "Overzicht van consumenten die ingecheckt hebben",
    ],
    buttonText: "Nu starten",
    buttonDemo: "Bekijk Demo",
    buttonVariant: "contained",
  },
];

export default function Pricing() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth="sm"
        component="main"
        className={classes.heroContent}
        id="solutions"
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Oplossingen
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          Een oplossing op maat, een complete overzicht van uw consumenten, uw
          menu digitaal!
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-start">
          {tiers.map((tier) => (
            <Grid item key={tier.title} xs={12} md={6}>
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{ align: "center" }}
                  action={tier.title === "Pro" ? <StarIcon /> : null}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      €{tier.price}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      /p.m
                    </Typography>
                  </div>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth color="primary">
                    {tier.buttonText}
                  </Button>
                  <Button fullWidth color="primary">
                    {tier.buttonDemo}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
