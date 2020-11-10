import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../../contexts/usercontext";
import React, { useContext, useEffect } from "react";
import Drawer from "../drawer";
import { Container } from "@material-ui/core";
import { DialogProvider } from "../../contexts/dialogcontext";

const PrivateRoute = ({ component: Component, ...otherProps }) => {
  const { user } = useContext(UserContext);

  return (
    <DialogProvider>
      <Container>
        <Drawer />
        <Route
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
