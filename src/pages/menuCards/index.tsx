import "./index.scss";

import React from "react";
import ListedCodes from "../../components/listedCodes";
import { Alert } from "@material-ui/lab";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { IconButton, Typography } from "@material-ui/core";
import { useDialogDispatch } from "../../contexts/dialogcontext/index";
import AddDialog from "../../components/addDialog";
export default function MenuCards() {
  const dispatch = useDialogDispatch();

  return (
    <main className="admin">
      <Typography className="my-3" variant="h5">
        Menu kaarten
      </Typography>
      <Alert className="d-flex align-items-center" severity="info">
        Klik op het <AddCircleIcon className="m-auto" /> icoontje om te beginnen
      </Alert>
      <IconButton
        onClick={() => dispatch({ type: "add" })}
        className="my-2"
        color="secondary"
        size="medium"
      >
        <AddCircleIcon />
      </IconButton>
      <ListedCodes />
      <AddDialog />
    </main>
  );
}
