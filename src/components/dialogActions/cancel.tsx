import Button from "@material-ui/core/Button";
import React from "react";
import { useDispatch } from "react-redux";
import {
  addMenuCard,
  setError,
  toggleQrDialog,
  setLoading,
} from "../../redux/actions";

export default function Cancel() {
  const dispatch = useDispatch();
  const handler = () => {
    dispatch(setLoading(true));
    dispatch(addMenuCard(false));
    dispatch(toggleQrDialog(false));
    dispatch(setError(""));
    dispatch(setLoading(false));
  };
  return (
    <Button onClick={handler} color="primary">
      Sluiten
    </Button>
  );
}
