import { BrowserRouter, Route, Switch } from "react-router-dom";

import React, { Suspense } from "react";
import Scanner from "../pages/scanner";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import PrivateRoute from "../components/misc/privateRoute";
import Dashboard from "../pages/dashboard";
import Subscription from "../pages/subscriptions";
import Codes from "../pages/menuCards";
import Checkout from "../pages/checkout";
import CheckIn from "../pages/checkin";
import Footer from "../components/misc/footer";
import { Container } from "@material-ui/core";
import CheckIns from "../pages/checkins";
import Settings from "../pages/settings";
import ScrollRestoration from "react-scroll-restoration";
import {
  HOME,
  DASHBOARD,
  CHECKIN,
  LOGIN,
  REGISTER,
  CARDS,
  SUBSCRIPTION,
  SCANNER,
  CHECKOUT,
  CHECKINS,
  SETTINGS,
  TEAM,
  CONTACT,
  INFO,
  PRICES,
  POLICY,
  TOS,
  GDPR,
  MENUCARD,
} from "../constants/routes";
import PageNotFound from "../pages/404Error";
import MenuDetail from "../pages/menuDetail";
const Router = () => {
  return (
    <>
      <BrowserRouter>
        <ScrollRestoration />
        <Suspense fallback={<div>Loading ...</div>}>
          <Switch>
            <Route exact path={HOME} render={() => <Home />} />
            <Route exact path={SCANNER} render={() => <Scanner />} />
            <Route exact path={LOGIN} render={() => <Login />} />
            <Route exact path={REGISTER} render={() => <Register />} />
            <Route path={CHECKIN} render={({ match }) => <CheckIn match={match} />} />
            <Route path={MENUCARD} render={({ match }) => <MenuDetail match={match} />} />
            <PrivateRoute path={SETTINGS} component={Settings} />
            <PrivateRoute path={CHECKINS} component={CheckIns} />
            <PrivateRoute path={DASHBOARD} component={Dashboard} />
            <PrivateRoute path={CARDS} component={Codes} />
            <PrivateRoute path={SUBSCRIPTION} component={Subscription} />
            <PrivateRoute path={CHECKOUT} component={Checkout} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default Router;
