import React, { useRef, useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Box,
  Typography,
} from "@material-ui/core";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import PrintIcon from "@material-ui/icons/Print";
import QRCode from "qrcode.react";
import { saveSvgAsPng, svgAsPngUri } from "save-svg-as-png";
import ReactToPrint from "react-to-print";
import { FileCopyOutlined } from "@material-ui/icons";

interface QRProps {
  id: string | null;
  uid: string | null;
}

export default function QrDialog(props: QRProps) {
  const printRef = useRef(null);
  const [base64String, setBase64String] = useState();

  const handleDownload = () => {
    saveSvgAsPng(document.getElementById("qrcode"), `qrcode-${props.id}`, {
      scale: 25,
    });
  };

  const handleConvertToBase64 = () => {
    svgAsPngUri(document.getElementById("qrcode"), {
      scale: 25,
    }).then((res) => {
      setBase64String(res);
    });
    base64String &&
      React.createElement("image", {
        src: base64String,
        ref: printRef,
      });
    console.log(printRef.current);
  };

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

        <Box>
          <DialogContentText className="my-2">
            Download of print je QR code door op de aangegeven knopjes te
            klikken.
          </DialogContentText>
          <IconButton color="primary" onClick={handleDownload}>
            <CloudDownloadIcon />
          </IconButton>
          <IconButton color="primary" onClick={handleConvertToBase64}>
            <PrintIcon />
          </IconButton>
        </Box>
        <Box className="d-flex align-items-center">
          <DialogContentText className="my-2">{props.uid}</DialogContentText>
          <IconButton className="ml-1">
            <FileCopyOutlined />
          </IconButton>
        </Box>
      </DialogContent>
    </>
  );
}
