import React, { useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";

import { Box, IconButton } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import { CameraAlt } from "@material-ui/icons";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { rmDataStore } from "../../../services/crud";
import { db } from "../../../services/firebase";

import Tooltip from "@material-ui/core/Tooltip";

import Skeleton from "@material-ui/lab/Skeleton";
import QrDialog from "../../dialogs/qrDialog";
import SetPublish from "../../buttons/publish";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import ListIcon from "@material-ui/icons/List";

import {
  addMenuCard,
  toggleQrDialog,
  setLoading,
  setCurrentStep,
  setSelectedCardRef,
  setMenuCards,
  toggleSwitchQrCode,
  toggleSwitchLink,
  setError,
  setMenuName,
  setMenuLink,
  addMenuItem,
} from "../../../redux/actions";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import AddMenuItem from "../../dialogs/addMenuItem";
const useStyles = makeStyles({
  table: {
    minWidth: 100 + "%",
  },
  menuButton: {
    width: 250 + "px",
  },
  button: {
    padding: 0,
  },
});

export default function ListedMenus(props: any) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const publicInfo = useSelector((state: RootStateOrAny) => state.publicInfo);
  const rows = useSelector((state: RootStateOrAny) => state.menuCards);

  useEffect(() => {
    dispatch(setLoading(true));
    if (publicInfo) {
      if (publicInfo.owner) {
        db.collection("menus")
          .where("menuOwner", "==", publicInfo.owner)
          .onSnapshot((snapshot) => {
            const tempLoad = [];
            if (snapshot.size) {
              try {
                snapshot.forEach((doc) => {
                  tempLoad.push({ ...doc.data(), id: doc.id });
                });
              } catch {
                setError("Probleem bij het opvragen van menu kaarten");
              }
            }
            if (snapshot.size === 0) {
              tempLoad.push({
                menuCardName: "U heeft nog geen menu kaarten toegevoegd...",
              });
            }
            dispatch(setMenuCards(tempLoad));
            dispatch(setLoading(false));
          });
      }
    }
  }, [dispatch, publicInfo.owner, publicInfo]);

  const editMenuItems = (id: string) => {
    dispatch(setSelectedCardRef(id));
    dispatch(addMenuItem(true));
  };

  const handleEdit = (menuCardId: string) => {
    console.log("TODO Edit: " + menuCardId);
  };

  //Delete the given menucard
  const handleDelete = (document: string) => {
    try {
      rmDataStore("menus", document);
    } catch (e) {
      setError(e);
    }
  };

  //View the QR code IF a QR code was selected upon creation
  const handleClickQRDialog = (id: string) => {
    dispatch(setLoading(true));
    dispatch(setCurrentStep("viewMenuCard"));
    dispatch(setSelectedCardRef(id));
    dispatch(toggleQrDialog(true));
    dispatch(setLoading(false));
  };

  const handleMenuCard = () => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    dispatch(toggleQrDialog(false));
    dispatch(toggleSwitchLink(false));
    dispatch(toggleSwitchQrCode(false));
    dispatch(setMenuName(null));
    dispatch(setMenuLink(null));
    dispatch(toggleSwitchQrCode(false));
    dispatch(addMenuCard(true));
    dispatch(setLoading(false));
  };

  return (
    <>
      <TableContainer component={Paper}>
        {props.tools && (
          <Box className="w-100 d-flex align-items-center justify-content-between">
            <Tooltip title="Toevoegen">
              <IconButton onClick={handleMenuCard} className="m-2" color="primary">
                <AddCircleIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={`Klik op het cirkel icoontje om te beginnen`}>
              <HelpOutlineIcon className="m-2" color="disabled" />
            </Tooltip>
          </Box>
        )}
        <Table className={classes.table} aria-label="simple table">
          <TableHead className="my-0">
            <TableRow className="my-0">
              <Tooltip title="Naam Menu Kaart">
                <TableCell>Menu Naam</TableCell>
              </Tooltip>
              <Tooltip title="Qr code weergeven">
                <TableCell align="center">QR Code</TableCell>
              </Tooltip>
              <Tooltip title="Menu kaart aanpassen">
                <TableCell align="center">Menu kaart onderdelen</TableCell>
              </Tooltip>
              <Tooltip title="Mogelijke acties">
                <TableCell align="right">Acties</TableCell>
              </Tooltip>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows ? (
              rows.map((row: any, i: number) => {
                return (
                  <TableRow style={{ margin: 0 }} key={i}>
                    <TableCell component="th" scope="row">
                      <a href={`www.localhost:3000/menu/${row.menuCardId}`} target="_blank" rel="noreferrer">
                        {row.menuCardName}
                      </a>
                    </TableCell>
                    {row.id && (
                      <>
                        <TableCell align="center" key={row.id}>
                          <Tooltip title="QR code bekijken">
                            <IconButton onClick={() => row.qrcode && handleClickQRDialog(row.id)}>
                              <CameraAlt color={row.qrcode ? "action" : "disabled"} />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="Menu Kaart aanpassen">
                            <IconButton onClick={() => !row.ref && editMenuItems(row.id)}>
                              <ListIcon color={!row.ref ? "action" : "disabled"} />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                        <TableCell align="right">
                          {/* <Tooltip title="Bewerken">
                            <IconButton onClick={() => handleEdit(row.id)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip> */}
                          <Tooltip title="Verwijderen">
                            <IconButton onClick={() => handleDelete(row.id)} color="secondary" size="medium">
                              <DeleteForeverIcon />
                            </IconButton>
                          </Tooltip>
                          <SetPublish collection="menus" published={row.published} docid={row.id} />
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                );
              })
            ) : (
              <>
                <TableRow>
                  <TableCell align="left">
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton animation="wave" />
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <AddMenuItem />
      <QrDialog />
    </>
  );
}
