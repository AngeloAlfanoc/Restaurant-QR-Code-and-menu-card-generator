import React, { useState, useContext } from "react";
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
import QrDialog from "../qrDialog/index";
import { IMenuObject } from "../../types";

export default function AddMenuCard() {
  const { user } = useContext(UserContext);
  const dialog = useDialogState();
  const dispatch = useDialogDispatch();

  const [menuId, setMenuId] = useState<string>(uid());

  const [counter, setCounter] = useState<number>(0);
  const [error, setError] = useState<string>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [supplyOwnLinkCheck, setSupplyOwnLinkCheck] = useState<boolean>(false);
  const [checkGenQR, setCheckGenQR] = useState<boolean>(false);
  const [input, setInput] = useState<IMenuObject | null>(null);
  const [alert, setAlert] = useState<string>(null);
  const [location] = useState(window.location.hostname);

  const formHandler = () => {
    setCounter((prevCount) => prevCount + 1);
    setAlert(null);
    console.log(input);
  };

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleBack = () => {
    setCounter((prevCounter) => prevCounter - 1);
    setError(null);
    setInput(null);
  };

  const handleCancel = () => {
    dispatch({ type: "ADD_MENU_CARD" });
    setCounter(0);
    setError(null);
    setInput(null);
  };

  async function handleSave() {
    setLoading(true);
    try {
      setError(null);
      await addMenuCardToStore(
        menuId,
        input.menuName,
        user.uid,
        input.menuLink,
        supplyOwnLinkCheck,
        checkGenQR
      );
    } catch (e) {
      setError(e.message);
    } finally {
      dispatch({ type: "ADD_MENU_CARD" });
      setLoading(false);
      setCounter(0);
      setInput(null);
      setMenuId(uid());
    }
  }

  const ActionButtons = () => {
    if (counter === 0) {
      return (
        <>
          {!checkGenQR ? (
            <Button
              onClick={
                input
                  ? handleSave
                  : () => setAlert("Gelieve alle velden juist in te vullen.")
              }
              color="primary"
            >
              {loading ? "Bezig met laden.." : "Opslaan"}
            </Button>
          ) : (
            <Button
              onClick={
                input
                  ? formHandler
                  : () => setAlert("Gelieve alle velden juist in te vullen.")
              }
              color="primary"
            >
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
                onChange={() => setSupplyOwnLinkCheck(!supplyOwnLinkCheck)}
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
            name="menuLink"
            fullWidth
            onChange={handleInputChange}
          />
        )}
      </>
    );
  };

  return (
    <>
      <Dialog
        open={dialog.addMenuCard}
        onClose={() => dispatch({ type: "ADD_MENU_CARD" })}
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
                        onChange={() => setCheckGenQR(!checkGenQR)}
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
          <QrDialog id={menuId} href={location + "/menu/" + menuId} />
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
