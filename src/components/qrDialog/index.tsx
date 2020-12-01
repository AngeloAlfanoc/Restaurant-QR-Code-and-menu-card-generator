import React, { useEffect, useState } from "react";
import {
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Box,
  Tooltip,
  Dialog,
  DialogActions,
} from "@material-ui/core";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import QRCode from "qrcode.react";
import { saveSvgAsPng } from "save-svg-as-png";
import LanguageIcon from "@material-ui/icons/Language";
import { FileCopyOutlined } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import "./index.scss";
import { Alert } from "@material-ui/lab";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { toggleQrDialog } from "../../redux/actions";
import Cancel from "../dialogActions/cancel";
import Back from "../dialogActions/back";
import Save from "../dialogActions/save";
import { currentStep } from "../../redux/initialState";

export default function QrDialog() {
  const history = useHistory();
  const [alert, setAlert] = useState<string>();
  const dispatch = useDispatch();
  const toggleDialog = useSelector(
    (state: RootStateOrAny) => state.toggleQrDialog
  );
  const checkin = useSelector((state: RootStateOrAny) => state.checkinRef);
  const menuCard = useSelector(
    (state: RootStateOrAny) => state.selectedCardMenuRef
  );
  const step = useSelector((state: RootStateOrAny) => state.currentStep);
  const [location] = useState(window.location.hostname);
  const [id, setId] = useState<string>();
  const [linkFactory, setLinkFactory] = useState<string>();
  const [removeAltActions, setRemoveAltActions] = useState<boolean>(false);

  useEffect(() => {
    if (step === "dialogMenuCard") {
      setId(menuCard);
      setLinkFactory("http://" + location + "/menu/" + id);
    }
    if (step === "viewMenuCard") {
      setId(menuCard);
      setLinkFactory("http://" + location + "/menu/" + id);
      setRemoveAltActions(true);
    }
    if (step === "viewCheckin") {
      setId(checkin);
      setLinkFactory("http://" + location + "/checkin/" + id);
      setRemoveAltActions(true);
    }
  }, [checkin, menuCard, step, location, id]);

  const handleDownload = () => {
    saveSvgAsPng(document.getElementById("qrcode"), `qrcode-${id}`, {
      scale: 25,
    });
  };

  const handlePush = () => {
    history.push(linkFactory);
  };

  const handleClickCopy = (e) => {
    if (id) {
      navigator.clipboard.writeText(linkFactory);
      setAlert("Link gekopieerd!");
    }
  };

  return (
    <>
      <Dialog
        open={toggleDialog}
        onClose={() => dispatch(toggleQrDialog(false))}
      >
        <DialogTitle id="form-dialog-title">Uw QR Code</DialogTitle>
        <DialogContent>
          {alert && (
            <Alert severity="info" className="mb-3">
              {alert}
            </Alert>
          )}

          {id && (
            <QRCode
              value={linkFactory}
              id="qrcode"
              renderAs="svg"
              fgColor="#000000"
              bgColor="#ffffff"
              size={350}
            />
          )}
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
            <Tooltip title="Naar webpagina surfen">
              <IconButton color="primary" onClick={handlePush}>
                <LanguageIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Tooltip title="Kopieer link naar clipboard" className="hover_curse">
            <Box
              onClick={handleClickCopy}
              className="d-flex align-items-center"
            >
              <DialogContentText className="my-2">
                <small>{linkFactory}</small>
              </DialogContentText>
              <IconButton className="ml-1">
                <FileCopyOutlined />
              </IconButton>
            </Box>
          </Tooltip>
        </DialogContent>
        <DialogActions>
          <Cancel />

          {step === "dialogMenuCard" && (
            <>
              <Back />
              <Save />
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
