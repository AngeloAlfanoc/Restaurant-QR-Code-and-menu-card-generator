import React from "react";
import Button from "@material-ui/core/Button";
import { addMenuCard, toggleQrDialog, setLoading } from "../../redux/actions";
import { useDispatch } from "react-redux";
export default function Back() {
  const dispatch = useDispatch();
  const handler = () => {
    dispatch(setLoading(true));
    dispatch(addMenuCard(true));
    dispatch(toggleQrDialog(false));
    dispatch(setLoading(false));
  };

  return (
    <Button onClick={handler} color="primary">
      Vorige
    </Button>
  );
}
