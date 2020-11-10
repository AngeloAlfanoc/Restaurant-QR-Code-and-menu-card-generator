import { Redirect } from "react-router-dom";
import { UserContext } from "../../contexts/usercontext";
import { DASHBOARD } from "../../constants/routes";
import React, { useContext } from "react";
import LoginForm from "../../components/loginForm";

const Login = () => {
  const { user } = useContext(UserContext);
  return user ? <Redirect to={DASHBOARD} /> : <LoginForm />;
};

export default Login;
