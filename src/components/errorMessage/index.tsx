import React from "react";
import { RootStateOrAny, useSelector } from "react-redux";

export default function ErrorMessage() {
  const error = useSelector((state: RootStateOrAny) => state.errorMessage);
  return <>{error && error}</>;
}
