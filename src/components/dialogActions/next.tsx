import React from "react";
import Button from "@material-ui/core/Button";
import { addMenuCard, toggleQrDialog, setLoading } from "../../redux/actions";
import { useDispatch } from "react-redux";
export default function Next() {
  const dispatch = useDispatch();
  const handler = () => {
    dispatch(setLoading(true));
    dispatch(addMenuCard(false));
    dispatch(toggleQrDialog(true));
    dispatch(setLoading(false));
  };

  return (
    <Button onClick={handler} color="primary">
      Volgende
    </Button>
  );
}
