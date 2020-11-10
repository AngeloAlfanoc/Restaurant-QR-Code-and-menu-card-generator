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
import { IconButton } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { listDataStore } from "../../services/crud";
import { Button } from "@material-ui/core";
import { UserContext } from "../../contexts/usercontext";
import CircularProgress from "@material-ui/core/CircularProgress";
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
  const { user } = useContext(UserContext);
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [menuList, setmenuList] = React.useState(null);
  const [error, setError] = React.useState(null);
  const handleClickOpen = () => {
    setOpen(true);
  };

  async function fetchData() {
    try {
      setError("");
      setLoading(true);
      await listDataStore(user.uid)
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            setmenuList(doc.data());
            rows.push(
              createData(doc.data().menuCardName, doc.data().menuCardId, "")
            );
          });
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (menuList === null) {
      !loading && fetchData();
      console.log(rows);
    }
  });

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
        {loading && (
          <div className="d-flex justify-content-center">
            <CircularProgress color="secondary" />
          </div>
        )}
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.qr_link}>
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
