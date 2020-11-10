import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  useDialogState,
  useDialogDispatch,
} from "../../contexts/dialogcontext/";
import { Alert } from "@material-ui/lab";
import { IconButton } from "@material-ui/core";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import QRCode from "qrcode.react";

export default function AddDialog() {
  const dialog = useDialogState();
  const dispatch = useDialogDispatch();
  const [formName, setFormName] = useState<string>();
  const [stepOne, setStepOne] = useState<boolean>(false);
  const [stepTwo, setStepTwo] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const qrRef = useRef<SVGPolygonElement | SVGEllipseElement | SVGRectElement>(
    null
  );
  const handleFormName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormName(e.target.value);
  };

  useLayoutEffect(() => {
    dialog && setStepOne(true);
    console.log("Currently Tracking step :" + counter);
  }, [dialog, counter]);

  const formHandler = () => {
    setError("");
    if (formName) {
      setCounter((prevCount) => prevCount + 1);
    } else {
      setError("Gelieve een naam in te vullen.");
    }
    switch (counter) {
      case 1: {
        setStepOne(true);
        break;
      }
      case 2: {
        setStepTwo(true);
        break;
      }
      default: {
        setStepOne(false);
        setStepTwo(false);
      }
    }
  };

  const handleBack = () => {
    setCounter((prevCounter) => prevCounter - 1);
    setError("");
  };

  const handleCancel = () => {
    dispatch({ type: "add" });
    setCounter(0);
    setError("");
  };

  const handleDownload = () => {
    const qrCode = document.getElementById("qrcode");
  };

  return (
    <>
      <Dialog
        open={dialog.add}
        onClose={() => dispatch({ type: "add" })}
        aria-labelledby="form-dialog-title"
      >
        {error && (
          <Alert severity="info" variant="filled">
            {error}
          </Alert>
        )}
        {counter === 0 && (
          <>
            <DialogTitle id="form-dialog-title">Van start gaan.. </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Gelieve een naam te kiezen voor je menu kaart.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Naam van menu kaart"
                type="name"
                fullWidth
                onChange={handleFormName}
              />
            </DialogContent>
          </>
        )}

        {counter === 1 && (
          <>
            <DialogTitle id="form-dialog-title">Uw QR Code</DialogTitle>
            <DialogContent>
              <QRCode
                ref={qrRef}
                value={formName}
                id="qrcode"
                renderAs="svg"
                fgColor="#000000"
                bgColor="#ffffff"
                size={100 + "%"}
              />
              <IconButton color="primary" onClick={handleDownload}>
                <CloudDownloadIcon />
              </IconButton>
            </DialogContent>
          </>
        )}

        <DialogActions>
          <Button onClick={() => handleCancel()} color="primary">
            Afbreken
          </Button>

          {counter > 0 && (
            <Button onClick={() => handleBack()} color="primary">
              Vorige
            </Button>
          )}

          <Button onClick={() => formHandler()} color="primary">
            Volgende
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
