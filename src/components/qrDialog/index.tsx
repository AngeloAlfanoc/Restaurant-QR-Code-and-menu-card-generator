import React, { useRef } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import PrintIcon from "@material-ui/icons/Print";
import QRCode from "qrcode.react";

export default function QrDialog(props) {
  const handleDownload = () => {}; // TODO Handle Download OF SVG

  const handlePrint = () => {};
  return (
    <>
      <DialogTitle id="form-dialog-title">Uw QR Code</DialogTitle>
      <DialogContent>
        <QRCode
          value={props.uid}
          id="qrcode"
          renderAs="svg"
          fgColor="#000000"
          bgColor="#ffffff"
          size={100 + "%"}
        />
        <>
          <DialogContentText className="my-2">
            Download of print je QR code door op de aangegeven knopjes te
            klikken.
          </DialogContentText>
          <IconButton color="primary" onClick={handleDownload}>
            <CloudDownloadIcon />
          </IconButton>
          <IconButton color="primary" onClick={handlePrint}>
            <PrintIcon />
          </IconButton>
        </>
      </DialogContent>
    </>
  );
}
