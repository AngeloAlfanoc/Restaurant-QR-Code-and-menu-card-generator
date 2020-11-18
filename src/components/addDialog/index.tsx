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
} from "@material-ui/core";

import {
  useDialogState,
  useDialogDispatch,
} from "../../contexts/addDialogcontext";
import { Alert } from "@material-ui/lab";
import { uid } from "uid";
import { addMenuCardToStore } from "../../services/crud";
import { UserContext } from "../../contexts/usercontext";
import { Switch, useHistory } from "react-router-dom";
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
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Naam van menu kaart"
                  type="name"
                  fullWidth
                  onChange={handleFormName}
                />
              </FormGroup>
            </DialogContent>
          </>
        )}

        {counter === 1 && <QrDialog id={createUid} uid={createUid} />}

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
