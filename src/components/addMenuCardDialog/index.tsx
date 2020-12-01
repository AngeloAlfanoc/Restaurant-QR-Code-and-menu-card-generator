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

import { Alert } from "@material-ui/lab";
import { uid } from "uid";
import { addMenuCardToStore } from "../../services/crud";
import { UserContext } from "../../contexts/userContext";
import { IMenuObject } from "../../types";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  addMenuCard,
  // setQrDialogId,
  toggleQrDialog,
  setLoading,
  setError,
  setAlert,
  setSelectedCardRef,
} from "../../redux/actions";
import Cancel from "../dialogActions/cancel";
import Next from "../dialogActions/next";
import InputGlobal from "../inputGlobal";
import SwitchGlobal from "../switchGlobal";
export default function AddMenuCard() {
  const dispatch = useDispatch();

  const toggleDialog = useSelector(
    (state: RootStateOrAny) => state.toggleAddMenuDialog
  );

  const { user } = useContext(UserContext);
  const [menuId] = useState<string>(uid());
  const [supplyOwnLinkCheck, setSupplyOwnLinkCheck] = useState<boolean>(false);
  const [checkGenQR, setCheckGenQR] = useState<boolean>(false);
  const [input, setInput] = useState<IMenuObject | null>(null);

  // const formHandler = () => {
  //   dispatch(toggleQrDialog(true));
  //   dispatch(addMenuCard(false));
  //   dispatch(setAlert(""));
  // };

  // async function handleSave() {
  //   dispatch(setLoading(true));
  //   try {
  //     setError(null);
  //     await addMenuCardToStore(
  //       menuId,
  //       input.menuName,
  //       user.uid,
  //       input.menuLink,
  //       supplyOwnLinkCheck,
  //       checkGenQR
  //     );
  //   } catch (e) {
  //     setError(e.message);
  //   } finally {
  //     dispatch(setSelectedCardRef(menuId));
  //     dispatch(addMenuCard(false));
  //     // setCounter(0);
  //     setInput(null);
  //   }
  //   dispatch(setLoading(false));
  // }

  const SupplyOwnLink = () => {
    return (
      <>
        <SwitchGlobal
          name="ownLinkControl"
          color="primary"
          label="Eigen menu link voorzien?"
        />
        <DialogContentText>
          <small>
            Hiermee kan je de knop "menu" bij het inchecken door verwijzen naar
            je eigen webpagina
          </small>
        </DialogContentText>
        {supplyOwnLinkCheck && (
          <InputGlobal
            className="mb-5"
            margin="dense"
            id="menulink"
            label="Link naar je menu kaart bv. www.mijnfriet.be/menukaart"
            type="name"
            name="menuLink"
          />
        )}
      </>
    );
  };

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
            <SwitchGlobal
              name="qrCodeControl"
              color="primary"
              label="Een QR code genereren?"
            />
            <DialogContentText>
              <small>Een QR code voor je menu aanmaken?</small>
            </DialogContentText>
          </FormGroup>
        </DialogContent>

        <DialogActions>
          <Cancel />
          <Next />
        </DialogActions>
      </Dialog>
    </>
  );
}
