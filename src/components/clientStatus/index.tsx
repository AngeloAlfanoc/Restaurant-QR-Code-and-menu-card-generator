import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  Paper,
  TableBody,
  IconButton,
  DialogActions,
  Button,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog/Dialog";
import { CameraAlt } from "@material-ui/icons";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/usercontext";
import { db } from "../../services/firebase";
import QrDialog from "../qrDialog";
import SetPublish from "../setPublish";
interface IUser {
  id: string;
  plan: string;
}

export default function ClientStatus(props: IUser) {
  const { user } = useContext(UserContext);
  const [qrCode, setQrCode] = React.useState(false);
  const [error, setError] = React.useState<string>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [publicInfo, setPublicInfo] = React.useState<any>(null);
  const location = window.location.hostname;
  const toggleQrDialog = (qrCodeId: string) => {
    setQrCode(!qrCode);
  };
  useEffect(() => {
    setLoading(true);
    const unsubscribe = db
      .collection("checkins")
      .where("owner", "==", user.uid)
      .onSnapshot((snapshot) => {
        const tempLoad = [];
        if (snapshot.size) {
          try {
            snapshot.forEach((doc) => {
              tempLoad.push({ ...doc.data(), docid: doc.id });
            });
          } catch {
            setError("Probleem bij het van client status");
          } finally {
            setLoading(false);
          }
        }
        setPublicInfo(tempLoad[0]);
        setLoading(false);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <Typography className="mb-3" component="h2" variant="h5">
        Status gebruiker
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead className="my-0">
            <TableRow className="my-0">
              <Tooltip title="Naam Menu Kaart">
                <TableCell>Pagina</TableCell>
              </Tooltip>
              <Tooltip title="Qr code weergeven">
                <TableCell align="center">QR Code</TableCell>
              </Tooltip>
              <Tooltip title="Menu kaart weergeven">
                <TableCell align="right">Plan</TableCell>
              </Tooltip>
              <Tooltip title="Acties">
                <TableCell align="right">Publiceer</TableCell>
              </Tooltip>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow style={{ margin: 0 }}>
              <TableCell align="left">
                <a
                  href={`http://${location}:3000/checkin/${props.id}`}
                  target="_blank"
                  rel="noreferrer"
                >{`http://${location}:3000/checkin/${props.id}`}</a>
              </TableCell>
              <TableCell align="center">
                <Tooltip title="QR code bekijken">
                  <IconButton onClick={() => toggleQrDialog(props.id)}>
                    <CameraAlt />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell align="right">{props.plan}</TableCell>
              <TableCell align="right">
                {publicInfo && (
                  <SetPublish
                    published={publicInfo.published}
                    docid={publicInfo.docid}
                    collection="checkins"
                  />
                )}
                {console.log(publicInfo)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {props.id && (
        <Dialog open={qrCode} onClose={() => toggleQrDialog(props.id)}>
          <QrDialog
            href={`http://${location}:3000/checkin/${props.id}`}
            id={props.id}
          />
          <DialogActions>
            <Button onClick={() => toggleQrDialog(props.id)} color="primary">
              Sluiten
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
