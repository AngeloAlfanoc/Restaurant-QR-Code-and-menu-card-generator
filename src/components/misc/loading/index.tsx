import React from "react";
import { CircularProgress } from "@material-ui/core";
import "./index.scss";
import { RootStateOrAny, useSelector } from "react-redux";
export default function Loading() {
  const loading = useSelector((state: RootStateOrAny) => state.isLoading);
  console.log("loading is:" + loading);
  return (
    <div className="main__loader">
      {loading && <CircularProgress color="primary" />}
    </div>
  );
}
