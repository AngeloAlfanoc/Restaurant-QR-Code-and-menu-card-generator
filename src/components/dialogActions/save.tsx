import Button from "@material-ui/core/Button";
import React, { useContext, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { uid } from "uid";
import { UserContext } from "../../contexts/userContext";
import {
  addMenuCard,
  setError,
  setInput,
  setLoading,
  toggleQrDialog,
} from "../../redux/actions";
import { addMenuCardToStore } from "../../services/crud";

export default function Save() {
  const dispatch = useDispatch();
  const input = useSelector((state: RootStateOrAny) => state);
  const { user } = useContext(UserContext);
  async function handler() {
    dispatch(setLoading(true));
    try {
      dispatch(setError(""));
      await addMenuCardToStore(
        input.selectedCardMenuRef,
        input.menuName,
        user.uid,
        input.menuLink,
        input.ownLinkControl,
        input.qrCodeControl
      );
    } catch (e) {
      dispatch(setError(e.message));
    } finally {
      dispatch(addMenuCard(false));
      dispatch(setInput(null));
    }

    dispatch(addMenuCard(false));
    dispatch(toggleQrDialog(false));
    dispatch(setError(""));
    dispatch(setLoading(false));
  }
  return (
    <Button onClick={handler} color="primary">
      Opslaan
    </Button>
  );
}
