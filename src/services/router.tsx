import { BrowserRouter, Route, Switch } from "react-router-dom";

import React, { Suspense } from "react";
import Scanner from "../pages/scanner";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import PrivateRoute from "../components/privateRoute";
import Dashboard from "../pages/dashboard";
import Subscription from "../pages/subscriptions";
import Codes from "../pages/menuCards";
import Checkout from "../pages/checkout";
import CheckIn from "../pages/checkin";
import Footer from "../components/footer";
import { Container } from "@material-ui/core";
import CheckIns from "../pages/checkins";
import {
  HOME,
  DASHBOARD,
  CHECK_IN,
  MENU_CARD,
  LOGIN,
  REGISTER,
  CARDS,
  SUBSCRIPTION,
  RESTAURANT,
  SCANNER,
  CHECKOUT,
  CHECKINS,
} from "../constants/routes";

const Router = () => {
  return (
    <Container>
      <BrowserRouter>
        <Suspense fallback={<div>Loading ...</div>}>
          <Switch>
            <Route exact path={HOME} render={() => <Home />} />
            <Route exact path={SCANNER} render={() => <Scanner />} />
            <Route exact path={LOGIN} render={() => <Login />} />
            <Route exact path={REGISTER} render={() => <Register />} />
            <Route
              path={CHECK_IN}
              render={({ match }) => <CheckIn match={match} />}
            />
            <PrivateRoute path={CHECKINS} component={CheckIns} />
            <PrivateRoute path={DASHBOARD} component={Dashboard} />
            <PrivateRoute path={CARDS} component={Codes} />
            <PrivateRoute path={SUBSCRIPTION} component={Subscription} />
            <PrivateRoute path={CHECKOUT} component={Checkout} />
          </Switch>
        </Suspense>
      </BrowserRouter>
      <Footer />
    </Container>
  );
};

export default Router;
