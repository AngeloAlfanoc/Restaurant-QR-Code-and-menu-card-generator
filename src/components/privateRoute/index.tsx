import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import React, { useContext } from "react";
import Drawer from "../drawer";
import { Container } from "@material-ui/core";
import { DialogProvider } from "../../contexts/addDialogContext";

const PrivateRoute = ({ component: Component, ...otherProps }) => {
  const { user } = useContext(UserContext);

  return (
    <DialogProvider>
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
      </Container>
    </DialogProvider>
  );
};

export default PrivateRoute;
