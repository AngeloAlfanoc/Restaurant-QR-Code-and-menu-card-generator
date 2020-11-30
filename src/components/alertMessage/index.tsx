import React from "react";
import { RootStateOrAny, useSelector } from "react-redux";

export default function AlertMessage() {
  const alert = useSelector((state: RootStateOrAny) => state.alertMessage);
  return <>{alert && alert}</>;
}
