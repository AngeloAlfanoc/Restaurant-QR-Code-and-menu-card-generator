import React, { useRef, useState } from "react";
import {
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Box,
  Tooltip,
} from "@material-ui/core";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import PrintIcon from "@material-ui/icons/Print";
import QRCode from "qrcode.react";
import { saveSvgAsPng, svgAsPngUri } from "save-svg-as-png";
import LanguageIcon from "@material-ui/icons/Language";
import { FileCopyOutlined } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import "./index.scss";
import { Alert } from "@material-ui/lab";
interface QRProps {
  id: string | null;
  href: string | null;
}

export default function QrDialog(props: QRProps) {
  const history = useHistory();
  const [alert, setAlert] = useState<string>();
  // const [base64String, setBase64String] = useState();

  const handleDownload = () => {
    saveSvgAsPng(document.getElementById("qrcode"), `qrcode-${props.id}`, {
      scale: 25,
    });
  };

  /// TODO ADD PRINT FUNCTIONALITY
  // const handleConvertToBase64 = () => {
  //   svgAsPngUri(document.getElementById("qrcode"), {
  //     scale: 25,
  //   }).then((res) => {
  //     setBase64String(res);
  //   });
  //   base64String &&
  //     React.createElement("image", {
  //       src: base64String,
  //       ref: printRef,
  //     });
  // };

  const handlePush = () => {
    history.push(props.href);
  };

  const handleClickCopy = (e) => {
    if (props.href) {
      navigator.clipboard.writeText(props.href);
      setAlert("Link gekopieerd!");
    }
  };

  return (
    <>
      <DialogTitle id="form-dialog-title">Uw QR Code</DialogTitle>
      <DialogContent >
        {alert && <Alert severity="info" className="mb-3">{alert}</Alert>}

          <QRCode
            value={props.href}
            id="qrcode"
            renderAs="svg"
            fgColor="#000000"
            bgColor="#ffffff"
            size={350}
          />

        <Box>
          <DialogContentText className="my-2">
            Via deze QR code verwijs je je consument door naar uw checkin
            pagina.
          </DialogContentText>
          <Tooltip title="QR code downloaden">
            <IconButton color="primary" onClick={handleDownload}>
              <CloudDownloadIcon />
            </IconButton>
          </Tooltip>

          {/* <IconButton color="primary" onClick={handleConvertToBase64}>
            <PrintIcon />
          </IconButton> */}
          <Tooltip title="Naar webpagina surfen">
            <IconButton color="primary" onClick={handlePush}>
              <LanguageIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Tooltip title="Kopieer link naar clipboard" className="hover_curse">
          <Box onClick={handleClickCopy} className="d-flex align-items-center">
            <DialogContentText className="my-2">{props.href}</DialogContentText>
            <IconButton className="ml-1">
              <FileCopyOutlined />
            </IconButton>
          </Box>
        </Tooltip>
      </DialogContent>
    </>
  );
}
