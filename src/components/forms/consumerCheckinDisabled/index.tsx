import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
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
}));
export default function ConsumerCheckIn(props: any) {
  const classes = useStyles();

  return (
    <Container component="main" className={classes.container} maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography className="text-center" component="h1" variant="h5">
          Checkin formulier staat nog niet actief!
        </Typography>
        <span>
          Als u deze wilt activeren doet u dat via het{" "}
          <Link to={"/account/dashboard"}>admin paneel.</Link>
        </span>
      </div>
    </Container>
  );
}
