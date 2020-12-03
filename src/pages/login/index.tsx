import { Redirect } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import { DASHBOARD } from "../../constants/routes";
import React, { useContext } from "react";
import LoginForm from "../../components/forms/login";

const Login = () => {
  const { user } = useContext(UserContext);
  return user ? <Redirect to={DASHBOARD} /> : <LoginForm />;
};

export default Login;
