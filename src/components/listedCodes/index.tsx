import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import { IconButton } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import QrDialog from "../../components/qrDialog";
import { Button } from "@material-ui/core";
const useStyles = makeStyles({
  table: {
    minWidth: 100 + "%",
  },
});

function createData(name: string, actions: any, qr_link: any) {
  return { name, actions, qr_link };
}

function actions() {
  return (
    <>
      <IconButton className="my-1" color="primary" size="medium">
        <EditIcon />
      </IconButton>
      <IconButton color="secondary" size="medium">
        <DeleteForeverIcon />
      </IconButton>
    </>
  );
}

const rows = [];

export default function BasicTable() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    return <QrDialog state={open} />;
  };

  const classes = useStyles();

  if (rows.length === 0) {
    rows.push(createData("Er is nog geen menu kaart aangemaakt...", "", ""));
  }
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Menu Naam</TableCell>
            <TableCell align="center">QR Code</TableCell>
            <TableCell align="right">Acties</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell onClick={handleClickOpen} align="center">
                <Button>{row.qr_link}</Button>
              </TableCell>
              <TableCell align="right">{row.actions}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
