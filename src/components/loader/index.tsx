import { CircularProgress } from "@material-ui/core";
import React from "react";

export default function Loader() {
  return (
    <div className="d-flex justify-content-center mt-5">
      <CircularProgress color="primary" />
    </div>
  );
}
