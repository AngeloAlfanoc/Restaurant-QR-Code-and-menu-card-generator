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
import { Box, Dialog, IconButton } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { UserContext } from "../../contexts/userContext";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Alert } from "@material-ui/lab";
import { CameraAlt } from "@material-ui/icons";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useDialogDispatch } from "../../contexts/addDialogContext/index";
import { rmDataStore } from "../../services/crud";
import { db } from "../../services/firebase";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import Skeleton from "@material-ui/lab/Skeleton";
import QrDialog from "../qrDialog";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import SetPublish from "../setPublish";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

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
  const dispatch = useDialogDispatch();
  const { user } = useContext(UserContext);
  const [qrCode, setQrCode] = useState(false);
  const [qrCodeId, setQrCodeId] = useState<string>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>(null);
  const [rows, setRows] = useState<any>(null);
  const [location] = useState(window.location.hostname);

  const toggleQrDialog = (qrId: string) => {
    setQrCode(!qrCode);
    setQrCodeId(qrId);
  };

  useEffect(() => {
    setLoading(true);
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
        setRows(tempLoad);
        setLoading(false);
      });

    return () => {
      unsubscribe();
    };
  }, [setRows, user.uid]);

  const editMenuItems = () => {};

  const handleEdit = (menuCardId: string) => {
    console.log("TODO Edit: " + menuCardId);
  };

  const handleDelete = (document: string, index: number) => {
    try {
      rmDataStore("menus", document);
    } catch (e) {
      setError(e);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        {props.tools && (
          <Box className="w-100 d-flex align-items-center justify-content-between">
            <Tooltip title="Toevoegen">
              <IconButton
                onClick={() => dispatch({ type: "add" })}
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
              <Tooltip title="Menu kaart weergeven">
                <TableCell align="right">Menu kaart</TableCell>
              </Tooltip>
              <Tooltip title="Mogelijke acties">
                <TableCell align="right">Acties</TableCell>
              </Tooltip>
            </TableRow>
          </TableHead>
          <TableBody className="my-0"></TableBody>

          <TableBody>
            {rows ? (
              rows.map((row: any, i: number) => {
                return (
                  <TableRow style={{ margin: 0 }} key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.menuCardName}
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="QR code bekijken">
                        <IconButton
                          onClick={() => toggleQrDialog(row.menuCardId)}
                        >
                          <CameraAlt />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    {row.id && (
                      <>
                        <TableCell align="right">
                          <Tooltip title="Menu Kaart bekijken">
                            <IconButton onClick={editMenuItems}>
                              <MenuBookIcon />
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
                              onClick={() => handleDelete(row.id, i)}
                              color="secondary"
                              size="medium"
                            >
                              <DeleteForeverIcon />
                            </IconButton>
                          </Tooltip>
                          <SetPublish
                            parentLoad={loading}
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
                  <TableCell className={classes.menuButton} align="right">
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
      {loading && (
        <div className="d-flex justify-content-center mt-5">
          <CircularProgress color="primary" />
        </div>
      )}
      {qrCodeId && (
        <Dialog open={qrCode} onClose={() => toggleQrDialog(qrCodeId)}>
          <QrDialog
            href={`http://${location}:3000/${user.uid}/menu/${qrCodeId}`}
            id={qrCodeId}
          />
          <DialogActions>
            <Button onClick={() => toggleQrDialog(qrCodeId)} color="primary">
              Sluiten
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
