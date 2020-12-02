import Button from "@material-ui/core/Button";
import React from "react";
import { useDispatch } from "react-redux";
import {
  addMenuCard,
  setError,
  toggleQrDialog,
  setLoading,
  setInput,
} from "../../redux/actions";

export default function Cancel() {
  const dispatch = useDispatch();
  const handler = (e) => {
    dispatch(setLoading(true));
    dispatch(addMenuCard(false));
    dispatch(toggleQrDialog(false));
    dispatch(setError(""));
    dispatch(setLoading(false));
    dispatch(
      setInput({
        buttonTracker: "cancel",
      })
    );
  };
  return (
    <Button name="cancel" onClick={handler} color="primary">
      Sluiten
    </Button>
  );
}
