import React, { useContext } from 'react'
import { UserContext } from '../../contexts/usercontext'
import { Redirect } from "react-router-dom";
import RegistrationForm from '../../components/registrationForm'

const Register = () => {
  const { user } = useContext(UserContext)

  return (user ? <Redirect to={"/account/dashboard"} /> : <RegistrationForm />)
}

export default Register;
