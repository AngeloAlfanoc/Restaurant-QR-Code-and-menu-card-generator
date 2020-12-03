import React, { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import { Redirect } from "react-router-dom";
import RegistrationForm from "../../components/forms/registration";
import { DASHBOARD } from "../../constants/routes";
const Register = () => {
  const { user } = useContext(UserContext);

  return user ? <Redirect to={DASHBOARD} /> : <RegistrationForm />;
};

export default Register;
