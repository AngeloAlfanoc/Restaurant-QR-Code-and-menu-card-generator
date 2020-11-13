import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import { Dialog, IconButton } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { UserContext } from "../../contexts/usercontext";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Alert } from "@material-ui/lab";
import { CameraAlt } from "@material-ui/icons";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useDialogDispatch } from "../../contexts/addDialogcontext/index";
import { remDataStore } from "../../services/crud";
import { db } from "../../services/firebase";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import Skeleton from "@material-ui/lab/Skeleton";
import QrDialog from "../qrDialog";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import SetPublish from "../setPublish";
const useStyles = makeStyles({
  table: {
    minWidth: 100 + "%",
  },
  button: {
    padding: 0,
  },
});

export default function BasicTable() {
  const [qrCode, setQrCode] = React.useState(false);
  const { user } = useContext(UserContext);
  const classes = useStyles();
  const [loading, setLoading] = React.useState<boolean>(false);
  const dispatch = useDialogDispatch();
  const [error, setError] = React.useState<string>(null);
  const [rows, setRows] = React.useState<any>(null);
  const [qrCodeUid, setQrCodeUid] = React.useState<string>();
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
          } finally {
            setLoading(false);
          }
        }
        setRows(tempLoad);
        setLoading(false);
      });

    return () => {
      unsubscribe();
    };
  }, [setRows, user.uid]);

  const toggleQrDialog = (qrCodeUid: string) => {
    setQrCode(!qrCode);
    setQrCodeUid(qrCodeUid);
  };

  const editMenuItems = () => {};

  const handleEdit = (menuCardId: string) => {
    console.log("TODO Edit: " + menuCardId);
  };

  const handleDelete = (document: string, index: number) => {
    try {
      remDataStore(document);
      setRows(rows.splice(index, 1));
    } catch (e) {
      setError(e);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Alert className="d-flex align-items-center" severity="info">
          Klik op het <AddCircleIcon className="m-auto" /> icoontje om te
          beginnen
        </Alert>

        <Tooltip title="Toevoegen">
          <IconButton
            onClick={() => dispatch({ type: "add" })}
            className="m-2"
            color="primary"
            size="medium"
          >
            <AddCircleIcon />
          </IconButton>
        </Tooltip>
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
                <TableCell align="center">Menu kaart</TableCell>
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
                    <TableCell align="center">
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
                      <SetPublish published={row.published} docUid={row.id} />
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell align="left">
                  <Skeleton animation="wave" />
                </TableCell>
                <TableCell align="center">
                  <Skeleton animation="wave" />
                </TableCell>
                <TableCell align="center">
                  <Skeleton animation="wave" />
                </TableCell>
                <TableCell align="right">
                  <Skeleton animation="wave" />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {loading && (
        <div className="d-flex justify-content-center mt-5">
          <CircularProgress color="primary" />
        </div>
      )}
      {qrCodeUid && (
        <Dialog open={qrCode} onClose={() => toggleQrDialog(qrCodeUid)}>
          <QrDialog uid={`http://localhost:3000/menu/${qrCodeUid}`} />
          <DialogActions>
            <Button onClick={() => toggleQrDialog(qrCodeUid)} color="primary">
              Sluiten
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
