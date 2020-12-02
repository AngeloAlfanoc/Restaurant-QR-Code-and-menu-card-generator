import Alert from "@material-ui/lab/Alert/Alert";
import React from "react";
import { RootStateOrAny, useSelector } from "react-redux";

export default function ErrorMessage() {
  const error = useSelector((state: RootStateOrAny) => state.errorMessage);

  return <>{error && <Alert severity="warning">{error}</Alert>}</>;
}
