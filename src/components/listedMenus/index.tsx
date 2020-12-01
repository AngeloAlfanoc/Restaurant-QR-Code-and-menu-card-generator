import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  MenuItem,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { UserContext } from "../../contexts/userContext";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Alert } from "@material-ui/lab";
import { CameraAlt } from "@material-ui/icons";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { rmDataStore } from "../../services/crud";
import { db } from "../../services/firebase";

import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import Skeleton from "@material-ui/lab/Skeleton";
import QrDialog from "../qrDialog";
import SetPublish from "../setPublish";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import ListIcon from "@material-ui/icons/List";
import { objects } from "./selectProps";
import { addMenuItemData } from "../../services/crud";
import { IAddMenuItem } from "../../types";
import CardMenuItems from "./cardMenuItems";
import {
  addMenuCard,
  toggleQrDialog,
  setLoading,
  setCurrentStep,
  setSelectedCardRef,
} from "../../redux/actions";
import { useDispatch } from "react-redux";

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
  const { user } = useContext(UserContext);

  const [error, setError] = useState<string>(null);
  const [rows, setRows] = useState<any>(null);
  const [itemDialog, setItemDialog] = useState<boolean>(false);
  const [menuCardItemSelect, setMenuCardItem] = useState<string>(null);
  const [cardId, setCardId] = useState<string>(null);

  const [addCardItem, setAddCardItem] = useState<boolean>(false);
  const [input, setInput] = useState<IAddMenuItem | null>(null);

  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = db
      .collection("menus")
      .where("menuOwner", "==", user.uid)
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
        dispatch(setLoading(false));
        setRows(tempLoad);
      });

    return () => {
      unsubscribe();
    };
  }, [setRows, user.uid]);

  const editMenuItems = async (id: string) => {
    setCardId(id);
    setItemDialog(true);
  };

  const handleEdit = (menuCardId: string) => {
    console.log("TODO Edit: " + menuCardId);
  };

  const handleDelete = (document: string) => {
    try {
      rmDataStore("menus", document);
    } catch (e) {
      setError(e);
    }
  };

  const handleChangeTypeSelect = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMenuCardItem(event.target.value);
  };

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleStoreMenuItemData = async (type: string) => {
    await addMenuItemData(
      cardId,
      type,
      input.title,
      input.itemTitle,
      input.itemPrice,
      undefined,
      0
    );
  };
  const handleClickQRDialog = (id: string) => {
    dispatch(setCurrentStep("viewMenuCard"));
    dispatch(setSelectedCardRef(id));
    // dispatch(setQrDialogId(id));
    dispatch(toggleQrDialog(true));
  };

  return (
    <>
      <TableContainer component={Paper}>
        {props.tools && (
          <Box className="w-100 d-flex align-items-center justify-content-between">
            <Tooltip title="Toevoegen">
              <IconButton
                onClick={() => dispatch(addMenuCard(true))}
                className="m-2"
                color="primary"
              >
                <AddCircleIcon />
              </IconButton>
            </Tooltip>
            <Tooltip
              title={`  Klik op het cirkel icoontje om te
          beginnen`}
            >
              <HelpOutlineIcon className="m-2" color="disabled" />
            </Tooltip>
          </Box>
        )}
        {error && <Alert severity="warning">{error}</Alert>}
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
                  <TableRow style={{ margin: 0 }} key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.menuCardName}
                    </TableCell>
                    {row.id && (
                      <>
                        <TableCell align="center" key={row.id}>
                          <Tooltip title="QR code bekijken">
                            <IconButton
                              onClick={() =>
                                row.qrcode && handleClickQRDialog(row.id)
                              }
                            >
                              <CameraAlt
                                color={row.qrcode ? "action" : "disabled"}
                              />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="Menu Kaart aanpassen">
                            <IconButton onClick={() => editMenuItems(row.id)}>
                              <ListIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                        <TableCell align="right">
                          <Tooltip title="Bewerken">
                            <IconButton onClick={() => handleEdit(row.id)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Verwijderen">
                            <IconButton
                              onClick={() => handleDelete(row.id)}
                              color="secondary"
                              size="medium"
                            >
                              <DeleteForeverIcon />
                            </IconButton>
                          </Tooltip>
                          <SetPublish
                            collection="menus"
                            published={row.published}
                            docid={row.id}
                          />
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

      <Dialog
        maxWidth={"md"}
        fullWidth
        open={itemDialog}
        onClose={() => setItemDialog(false)}
      >
        <DialogContent>
          <DialogTitle className="text-left">
            Klik op toevoegen om te beginnen
          </DialogTitle>
          <Box className="w-100 d-flex align-items-center justify-content-between">
            <Tooltip className="ml-3" title="Toevoegen">
              <Button onClick={() => setAddCardItem(true)}>Toevoegen</Button>
            </Tooltip>
            <Tooltip
              className="mr-3"
              title={"Klik op toevoegen om een nieuwe item toe te voegen."}
            >
              <HelpOutlineIcon className="m-2" color="disabled" />
            </Tooltip>
          </Box>
          <DialogContent>
            {addCardItem && (
              <Box className="d-flex justify-content-start">
                <TextField
                  id="standard-select-type"
                  select
                  label="Type van item"
                  value={menuCardItemSelect}
                  onChange={handleChangeTypeSelect}
                  helperText="Kies je type van object hier"
                >
                  {objects.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                {menuCardItemSelect === "titel" && (
                  <>
                    <TextField
                      onChange={handleInputChange}
                      name="title"
                      className="mx-2"
                      label="Titel Naam"
                    ></TextField>
                    <Box className="my-auto">
                      <IconButton
                        onClick={() =>
                          handleStoreMenuItemData(menuCardItemSelect)
                        }
                      >
                        <CheckIcon />
                      </IconButton>
                    </Box>
                  </>
                )}
                {menuCardItemSelect === "item" && (
                  <>
                    <TextField
                      name="itemTitle"
                      className="mx-2"
                      label="Benaming"
                      onChange={handleInputChange}
                    ></TextField>
                    <TextField
                      name="itemPrice"
                      className="mx-2"
                      label="Prijs"
                      onChange={handleInputChange}
                    ></TextField>
                    <Box className="my-auto">
                      <IconButton
                        onClick={() =>
                          handleStoreMenuItemData(menuCardItemSelect)
                        }
                      >
                        <CheckIcon />
                      </IconButton>
                    </Box>
                  </>
                )}
                {cardId && <CardMenuItems id={cardId} />}
              </Box>
            )}
          </DialogContent>
          <Box className="d-flex justify-content-end">
            <Button onClick={() => setItemDialog(false)} color="primary">
              Sluiten
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
      <QrDialog />
    </>
  );
}
