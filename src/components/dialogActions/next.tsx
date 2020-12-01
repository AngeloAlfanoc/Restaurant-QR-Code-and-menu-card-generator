import React from "react";
import Button from "@material-ui/core/Button";
import {
  addMenuCard,
  toggleQrDialog,
  setLoading,
  setSelectedCardRef,
  setCurrentStep,
} from "../../redux/actions";
import { useDispatch } from "react-redux";
import { uid } from "uid";

export default function Next() {
  const dispatch = useDispatch();
  const handler = () => {
    dispatch(setLoading(true));
    dispatch(addMenuCard(false));
    dispatch(setSelectedCardRef(uid()));
    dispatch(toggleQrDialog(true));
    dispatch(setLoading(false));
    dispatch(setCurrentStep("dialogMenuCard"));
  };

  return (
    <Button onClick={handler} color="primary">
      Volgende
    </Button>
  );
}
