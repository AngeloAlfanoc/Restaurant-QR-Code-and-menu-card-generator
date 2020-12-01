import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormGroup,
} from "@material-ui/core";

import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { addMenuCard } from "../../redux/actions";
import Cancel from "../dialogActions/cancel";
import Next from "../dialogActions/next";
import InputGlobal from "../inputGlobal";
import SupplyOwnLink from "../switches/supplyOwnLink";
import GenQrCode from "../switches/genQrCode";
import Save from "../dialogActions/save";
export default function AddMenuCard() {
  const dispatch = useDispatch();
  const toggleDialog = useSelector(
    (state: RootStateOrAny) => state.toggleAddMenuDialog
  );
  const qrCodeControl = useSelector(
    (state: RootStateOrAny) => state.qrCodeControl
  );
  return (
    <>
      <Dialog
        open={toggleDialog}
        onClose={() => dispatch(addMenuCard(false))}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Van start gaan.. </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Gelieve een naam te kiezen voor je menu kaart.
          </DialogContentText>
          <FormGroup>
            <InputGlobal
              className="mb-5"
              autoFocus
              margin="dense"
              id="name"
              label="Naam van menu kaart"
              type="name"
              name="menuName"
            />
            <SupplyOwnLink />
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
