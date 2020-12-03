import React from "react";
import Button from "@material-ui/core/Button";
import {
  addMenuCard,
  toggleQrDialog,
  setLoading,
  setInput,
} from "../../../redux/actions";
import { useDispatch } from "react-redux";
export default function Back() {
  const dispatch = useDispatch();
  const handler = (e) => {
    dispatch(setLoading(true));
    dispatch(addMenuCard(true));
    dispatch(toggleQrDialog(false));
    dispatch(setLoading(false));
    dispatch(
      setInput({
        buttonTracker: "back",
      })
    );
  };

  return (
    <Button onClick={handler} color="primary">
      Vorige
    </Button>
  );
}
