import React, { useState, useLayoutEffect, useContext } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  FormControl,
  Switch,
} from "@material-ui/core";

import {
  useDialogState,
  useDialogDispatch,
} from "../../contexts/addDialogcontext";
import { Alert } from "@material-ui/lab";
import { uid } from "uid";
import { addMenuCardToStore } from "../../services/crud";
import { UserContext } from "../../contexts/usercontext";
import { useHistory } from "react-router-dom";
import QrDialog from "../qrDialog/index";

export default function AddDialog() {
  const { user } = useContext(UserContext);
  const dialog = useDialogState();
  const dispatch = useDialogDispatch();
  const [formName, setFormName] = useState<string>();
  const [createUid, setCreateUid] = useState<string>();
  const [stepOne, setStepOne] = useState<boolean>(false);
  const [stepTwo, setStepTwo] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [checkSelfRef, setCheckSelfRef] = useState(false);
  const [checkGenQR, setCheckGenQR] = useState(false);
  const history = useHistory();
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
  const handleChangeSwitchRef = (event: React.FormEvent<HTMLInputElement>) => {
    setCheckSelfRef(!checkSelfRef);
  };
  const handleChangeSwitchQr = (event: React.FormEvent<HTMLInputElement>) => {
    setCheckGenQR(!checkGenQR);
  };

  async function formHandleSave() {
    try {
      setError("");
      setLoading(true);
      await addMenuCardToStore(createUid, formName, user.uid);
    } catch (e) {
      setError(e.message);
    } finally {
      dispatch({ type: "add" });
      setLoading(false);
      setCounter(0);
    }
  }

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
              <FormGroup>
                <TextField
                  className="mb-5"
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Naam van menu kaart"
                  type="name"
                  fullWidth
                  onChange={handleFormName}
                />
                <FormControlLabel
                  control={
                    <>
                      <Switch
                        checked={checkSelfRef}
                        onChange={handleChangeSwitchRef}
                        name="check"
                        color="primary"
                      />
                    </>
                  }
                  label="Eigen menu link voorzien?"
                />
                <DialogContentText>
                  Hiermee kan je het knopje "menu" bij het inchecken door
                  verwijzen naar je eigen webpagina
                </DialogContentText>
                {checkSelfRef && (
                  <TextField
                    className="mb-5"
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Link naar je menu kaart bv. www.mijnfriet.be/menukaart"
                    type="name"
                    fullWidth
                    onChange={handleFormName}
                  />
                )}
                <FormControlLabel
                  control={
                    <>
                      <Switch
                        checked={checkGenQR}
                        onChange={handleChangeSwitchQr}
                        name="check"
                        color="primary"
                      />
                    </>
                  }
                  label="QR code genereren?"
                />
                <DialogContentText>
                  Een apparte QR code voor je menu aanmaken?
                </DialogContentText>
              </FormGroup>
            </DialogContent>
          </>
        )}

        {counter === 1 && checkGenQR ? (
          <QrDialog id={createUid} href={createUid} />
        ) : (
          <TextField></TextField>
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
