import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useContext,
} from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@material-ui/core";

import {
  useDialogState,
  useDialogDispatch,
} from "../../contexts/dialogcontext/";
import { Alert } from "@material-ui/lab";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import QRCode from "qrcode.react";
import { uid } from "uid";
import PrintIcon from "@material-ui/icons/Print";
import { addToStore } from "../../services/crud";
import { UserContext } from "../../contexts/usercontext";
export default function AddDialog() {
  const { user } = useContext(UserContext);
  const dialog = useDialogState();
  const dispatch = useDialogDispatch();
  const [formName, setFormName] = useState<string>();
  const [createUid, setCreateUid] = useState<any>();
  const [stepOne, setStepOne] = useState<boolean>(false);
  const [stepTwo, setStepTwo] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const qrRef = useRef<SVGPolygonElement | SVGEllipseElement | SVGRectElement>(
    null
  );

  const handleFormName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateUid(uid());
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

  async function formHandleSave() {
    try {
      setError("");
      setLoading(true);
      await addToStore(createUid, formName, user.uid);
    } catch (e) {
      setError(e.message);
    }
    dispatch({ type: "add" });
    setLoading(false);
  }

  const handleDownload = () => {}; // TODO Handle Download OF SVG

  const handlePrint = () => {};
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
                value={createUid}
                id="qrcode"
                renderAs="svg"
                fgColor="#000000"
                bgColor="#ffffff"
                size={100 + "%"}
              />
              <>
                <DialogContentText className="my-2">
                  Print of download je QR code door op de aangegeven knopjes te
                  klikken.
                </DialogContentText>
                <IconButton color="primary" onClick={handleDownload}>
                  <CloudDownloadIcon />
                </IconButton>
                <IconButton color="primary" onClick={handlePrint}>
                  <PrintIcon />
                </IconButton>
              </>
            </DialogContent>
          </>
        )}

        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Afbreken
          </Button>

          {counter > 0 && (
            <Button onClick={handleBack} color="primary">
              Vorige
            </Button>
          )}
          {counter === 0 && (
            <Button onClick={formHandler} color="primary">
              Volgende
            </Button>
          )}
          {counter === 1 && (
            <Button onClick={formHandleSave} color="primary">
              Opslaan
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
