import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import React, { useContext } from "react";
import Drawer from "../drawer";
import { Container } from "@material-ui/core";
import Loading from "../loading";
import AlertMessage from "../alertMessage";
import ErrorMessage from "../errorMessage";
import QrDialog from "../qrDialog";
const PrivateRoute = ({ component: Component, ...otherProps }) => {
  const { user } = useContext(UserContext);

  return (
    <Container>
      <Drawer />
      <Route
        exact
        {...otherProps}
        render={(props) =>
          user ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={otherProps.redirectTo ? otherProps.redirectTo : "/login"}
            />
          )
        }
      />
      <Loading />
      <AlertMessage />
      <ErrorMessage />
      <QrDialog/>
    </Container>
  );
};

export default PrivateRoute;
