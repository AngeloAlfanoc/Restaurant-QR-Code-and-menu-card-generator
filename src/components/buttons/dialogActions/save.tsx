import Button from "@material-ui/core/Button";
import React, { useContext, useLayoutEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { uid } from "uid";
import { UserContext } from "../../../contexts/userContext";
import {
  addMenuCard,
  setError,
  setInput,
  setLoading,
  toggleQrDialog,
} from "../../../redux/actions";
import { addMenuCardToStore } from "../../../services/crud";

export default function Save() {
  const dispatch = useDispatch();
  const input = useSelector((state: RootStateOrAny) => state);
  const { user } = useContext(UserContext);
  const [disabled, setDisabled] = useState(true);
  const [urlMatchExpression] = useState(
    "(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})"
  );

  useLayoutEffect(() => {
    const regex = new RegExp(urlMatchExpression);

    if (input.ownLinkControl && input.menuName && input.menuLink) {
      if (input.menuLink.match(regex)) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    } else {
      setDisabled(false);
    }
  }, [input, urlMatchExpression]);

  async function handler(e) {
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
    }
    dispatch(addMenuCard(false));
    dispatch(toggleQrDialog(false));
    dispatch(setError(""));
    dispatch(
      setInput({
        buttonTracker: "save",
      })
    );
    dispatch(setLoading(false));
  }

  return (
    <Button disabled={disabled} onClick={handler} color="primary">
      Opslaan
    </Button>
  );
}
