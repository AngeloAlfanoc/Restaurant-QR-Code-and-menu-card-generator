import { Redirect, Route } from "react-router-dom";
import { UserContext, UserInfoContext } from "../../contexts/userContext";
import React, { useContext } from "react";
import Drawer from "../menus/drawer";
import { Container } from "@material-ui/core";
import Loading from "../loading";

import QrDialog from "../dialogs/qrDialog";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/actions";
const PrivateRoute = ({ component: Component, ...otherProps }) => {
  const { user } = useContext(UserContext);
  const { userInfo } = useContext(UserInfoContext);
  const dispatch = useDispatch();
  dispatch(setUserInfo(userInfo));
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
      <QrDialog />
    </Container>
  );
};

export default PrivateRoute;
