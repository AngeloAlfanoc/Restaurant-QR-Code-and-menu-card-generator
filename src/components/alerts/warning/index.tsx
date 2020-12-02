import { Alert } from "@material-ui/lab";
import React from "react";
import { RootStateOrAny, useSelector } from "react-redux";

export default function Warning() {
  const alert = useSelector((state: RootStateOrAny) => state.alertMessage);
  return <>{alert && <Alert severity="warning">{alert}</Alert>}</>;
}
