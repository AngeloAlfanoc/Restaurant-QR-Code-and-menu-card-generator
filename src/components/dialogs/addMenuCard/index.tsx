import React, { useLayoutEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormGroup,
} from "@material-ui/core";

import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { addMenuCard } from "../../../redux/actions";
import Cancel from "../../buttons/dialogActions/cancel";
import Next from "../../buttons/dialogActions/next";
import InputGlobal from "../../inputs/global";
import SupplyOwnLink from "../../switches/supplyOwnLink";
import GenQrCode from "../../switches/genQrCode";
import Save from "../../buttons/dialogActions/save";
import Warning from "../../alerts/warning";
import ErrorMessage from "../../alerts/error";
export default function AddMenuCard() {
  const dispatch = useDispatch();
  const [name, setName] = useState<string | null>();
  const [link, setlink] = useState<string | null>();
  const {
    toggleAddMenuDialog,
    qrCodeControl,
    menuName,
    menuLink,
    buttonTracker,
  } = useSelector((state: RootStateOrAny) => state);

  useLayoutEffect(() => {
    if (buttonTracker === "back") {
      setName(menuName);
      setlink(menuLink);
    } else {
      setName(null);
      setlink(null);
    }
  }, [buttonTracker, menuName, menuLink]);

  return (
    <>
      <Dialog
        open={toggleAddMenuDialog}
        onClose={() => dispatch(addMenuCard(false))}
        aria-labelledby="form-dialog-title"
      >
        <ErrorMessage/>
        <Warning />
        <DialogTitle id="form-dialog-title">
          Een nieuwe menu kaart toevoegen...
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Gelieve een naam te kiezen voor je menu kaart.
          </DialogContentText>
          <FormGroup>
            <InputGlobal
              value={name}
              className="mb-5"
              autoFocus
              margin="dense"
              id="name"
              label="Naam van menu kaart"
              type="name"
              name="menuName"
            />
            <SupplyOwnLink value={link} />
            <GenQrCode />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Cancel />
          {qrCodeControl ? <Next /> : <Save />}
        </DialogActions>
      </Dialog>
    </>
  );
}
