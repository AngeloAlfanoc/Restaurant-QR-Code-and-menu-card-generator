import React from "react";
import SwitchGlobal from "../switchGlobal";
import { RootStateOrAny, useSelector } from "react-redux";
import { DialogContentText } from "@material-ui/core";

export default function GenQrCode() {
  const qrCodeControl = useSelector(
    (state: RootStateOrAny) => state.qrCodeControl
  );
  return (
    <>
      <SwitchGlobal
        check={qrCodeControl}
        name="qrCodeControl"
        color="primary"
        label="Een QR code genereren?"
      />
      <DialogContentText>
        <small>Een QR code voor je menu aanmaken?</small>
      </DialogContentText>
    </>
  );
}
