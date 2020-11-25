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
} from "../../contexts/addDialogContext";
import { Alert } from "@material-ui/lab";
import { uid } from "uid";
import { addMenuCardToStore } from "../../services/crud";
import { UserContext } from "../../contexts/userContext";
import { useHistory } from "react-router-dom";
import QrDialog from "../qrDialog/index";

interface IMenuObject {
  menuName: string;
  href: string | undefined;
}

export default function AddDialog() {
  const { user } = useContext(UserContext);
  const dialog = useDialogState();
  const dispatch = useDialogDispatch();

  const [createUid, setCreateUid] = useState<string>();

  const [counter, setCounter] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [supplyOwnLinkCheck, setSupplyOwnLinkCheck] = useState<boolean>(false);
  const [checkGenQR, setCheckGenQR] = useState<boolean>(false);
  const [input, setInput] = useState<IMenuObject>();
  const [alert, setAlert] = useState<string>();

  const formHandler = () => {
    setCounter((prevCount) => prevCount + 1);
  };

  const handleInputChange = (e) => {
    setCreateUid(uid());
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });
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

  async function handleSave() {
    try {
      setError("");
      setLoading(true);
      await addMenuCardToStore(createUid, input.menuName, user.uid);
    } catch (e) {
      setError(e.message);
    } finally {
      dispatch({ type: "add" });
      setLoading(false);
      setCounter(0);
    }
  }

  const ActionButtons = () => {
    if (counter === 0) {
      return (
        <>
          {!checkGenQR ? (
            <Button onClick={handleSave} color="primary">
              Opslaan
            </Button>
          ) : (
            <Button onClick={formHandler} color="primary">
              Volgende
            </Button>
          )}
        </>
      );
    }
    if (counter > 0) {
      return (
        <>
          <Button onClick={handleBack} color="primary">
            Vorige
          </Button>
          <Button onClick={handleSave} color="primary">
            Opslaan
          </Button>
        </>
      );
    }
  };

  const SupplyOwnLink = () => {
    return (
      <>
        <FormControlLabel
          control={
            <>
              <Switch
                checked={supplyOwnLinkCheck}
                onChange={handleHrefSwitch}
                name="check"
                color="primary"
              />
            </>
          }
          label="Eigen menu link voorzien?"
        />
        <DialogContentText>
          <small>
            Hiermee kan je de knop "menu" bij het inchecken door verwijzen naar
            je eigen webpagina
          </small>
        </DialogContentText>
        {supplyOwnLinkCheck && (
          <TextField
            className="mb-5"
            margin="dense"
            id="menulink"
            label="Link naar je menu kaart bv. www.mijnfriet.be/menukaart"
            type="name"
            name="menulink"
            fullWidth
            onChange={handleInputChange}
          />
        )}
      </>
    );
  };
  const handleHrefSwitch = () => {
    setSupplyOwnLinkCheck(!supplyOwnLinkCheck);
  };
  const handleQrSwitch = () => {
    setCheckGenQR(!checkGenQR);
  };
  return (
    <>
      <Dialog
        open={dialog.add}
        onClose={() => dispatch({ type: "add" })}
        aria-labelledby="form-dialog-title"
      >
        {alert && (
          <Alert severity="warning" variant="filled">
            {alert}
          </Alert>
        )}
        {error && (
          <Alert severity="error" variant="filled">
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
                  name="menuName"
                  fullWidth
                  required
                  onChange={handleInputChange}
                />
                <SupplyOwnLink />
                <FormControlLabel
                  control={
                    <>
                      <Switch
                        checked={checkGenQR}
                        onChange={handleQrSwitch}
                        name="check"
                        color="primary"
                      />
                    </>
                  }
                  label="QR code genereren?"
                />
                <DialogContentText>
                  <small>Een QR code voor je menu aanmaken?</small>
                </DialogContentText>
              </FormGroup>
            </DialogContent>
          </>
        )}

        {counter === 1 && checkGenQR && (
          <QrDialog id={createUid} href={createUid} />
        )}

        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Afbreken
          </Button>
          <ActionButtons />
        </DialogActions>
      </Dialog>
    </>
  );
}
