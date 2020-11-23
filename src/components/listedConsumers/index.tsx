import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DateRangeIcon from "@material-ui/icons/DateRange";
import { UserContext } from "../../contexts/usercontext";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Alert } from "@material-ui/lab";
import SkeletonComponent from "../skeletonLoader";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Loader from "../../components/loader";
import Tooltip from "@material-ui/core/Tooltip";

import Skeleton from "@material-ui/lab/Skeleton";
import { IconButton } from "@material-ui/core";
import { db } from "../../services/firebase";

const useStyles = makeStyles({
  table: {
    minWidth: 100 + "%",
  },
  button: {
    padding: 0,
  },
});

export default function BasicTable() {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>(null);
  const [rows, setRows] = React.useState<any>(null);
  const [documentId, setDocumentId] = React.useState<string>()
  useEffect(() => {
    setLoading(true);
    db.collection("checkins").where("owner", "==", user.uid).get().then(function(doc) {
      doc.forEach((doc) => {
        console.log(doc.id)
      })
  }).catch(function(error) {
      setError(error)
  });
    // const unsubscribe = db
    //   .collection("checkins")
    //   .where("owner", "==", user.uid)
      
    //   // .collection("items")
    //   // .onSnapshot((snapshot) => {
    //   //   const tempLoad = [];
    //   //   if (snapshot.size) {
    //   //     try {
    //   //       snapshot.forEach((doc) => {
    //   //         tempLoad.push({ ...doc.data().items });
    //   //       });
    //   //     } catch {
    //   //       setError("Probleem bij het opvragen van consumenten");
    //   //     } finally {
    //   //       setLoading(false);
    //   //     }
    //   //   }
    //   //   setRows(tempLoad);
    //   //   setLoading(false);
    //   // });

    return () => {
      // unsubscribe();
    };
  }, [setRows, user.uid]);

  return (
    <>
      <TableContainer component={Paper}>
        <Alert className="d-flex align-items-center" severity="info">
          Klik op het <DateRangeIcon className="m-auto" /> icoontje om een tijd
          spanne te selecteren.
        </Alert>
        <Tooltip title="Selectie">
          <IconButton>
            <DateRangeIcon />
          </IconButton>
        </Tooltip>
        {error && <Alert severity="warning">{error}</Alert>}

        <Table aria-label="simple table">
          <TableHead className="my-0">
            <TableRow className="my-0">
              <Tooltip title="Naam Menu Kaart">
                <TableCell>Consument</TableCell>
              </Tooltip>
              <Tooltip title="Qr code weergeven">
                <TableCell align="left">Tijd van inchecken</TableCell>
              </Tooltip>
              <Tooltip title="Menu kaart weergeven">
                <TableCell align="left">Email</TableCell>
              </Tooltip>
              <Tooltip title="Mogelijke acties">
                <TableCell align="left">Telefoon</TableCell>
              </Tooltip>
            </TableRow>
          </TableHead>
          <TableBody className="my-0"></TableBody>

          <TableBody>
            {rows ? (
              rows.map((row: any, i: number) => {
               
                return (
                  <TableRow key={i} className="my-0">
                    <TableCell></TableCell>
                  </TableRow>
                );
              })
            ) : (
              <>
                <SkeletonComponent />
                <SkeletonComponent />
                <SkeletonComponent />
                <SkeletonComponent />
                <SkeletonComponent />
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {loading && <Loader />}
    </>
  );
}
