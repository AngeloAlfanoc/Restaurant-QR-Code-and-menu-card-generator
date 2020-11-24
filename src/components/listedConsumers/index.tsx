import React, { useContext, useEffect, useState } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DateRangeIcon from "@material-ui/icons/DateRange";
import { UserContext } from "../../contexts/userContext";

import { Alert, Skeleton } from "@material-ui/lab";
import SkeletonComponent from "../skeletonLoader";

import Loader from "../../components/loader";
import Tooltip from "@material-ui/core/Tooltip";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

import { IconButton, TextField } from "@material-ui/core";
import { db } from "../../services/firebase";
import Box from "@material-ui/core/Box/Box";

import moment from "moment";

export default function ListedConsumers(props: any) {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>(null);
  const [rows, setRows] = useState<any>(null);
  const [today] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [todayPlusOne] = useState(
    moment(new Date()).add(1, "day").format("YYYY-MM-DD")
  );
  useEffect(() => {
    setLoading(true);
    db.collection("checkins")
      .doc(props.docid)
      .collection("items")
      .orderBy("created", "desc")
      .limit(props.range)
      .onSnapshot((snapshot) => {
        const tempLoad = [];
        if (snapshot.size) {
          try {
            snapshot.forEach((doc) => {
              tempLoad.push({ ...doc.data(), docid: doc.id });
            });
          } catch {
            setError(
              "Probleem bij het ophalen van client gegevens gelieve uw systeem beheerder de contacteren."
            );
          }
        }
        if (snapshot.size === 0) {
          tempLoad.push({
            firstname: "Er hebben nog geen consumenten ingecheckt...",
          });
        }
        setRows(tempLoad);
        setLoading(false);
      });

    setLoading(false);
  }, [setRows, user.uid, props.docid, props.range]);

  return (
    <>
      <TableContainer component={Paper}>
        <Box className="w-100 d-flex align-items-between justify-items-between my-3">
          <Tooltip title="Selectie start">
            <TextField
              className="mx-3"
              id="datetime-local"
              label="Zoek tussen"
              type="datetime-local"
              defaultValue={today + "T00:00"}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Tooltip>
          <Tooltip title="Selectie einde">
            <TextField
              className="mx-3"
              id="datetime-local"
              label="en"
              type="datetime-local"
              defaultValue={todayPlusOne + "T00:00"}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Tooltip>
        </Box>

        {error && <Alert severity="warning">{error}</Alert>}

        <Table aria-label="simple table">
          <TableHead className="my-0">
            <TableRow className="my-0">
              <Tooltip title="Tijd van inchecken">
                <TableCell align="left">Tijd</TableCell>
              </Tooltip>
              <Tooltip title="Naam van consument">
                <TableCell>Consument</TableCell>
              </Tooltip>

              <Tooltip title="Email adres van consument">
                <TableCell align="left">Email</TableCell>
              </Tooltip>
              <Tooltip title="Telefoon / Gsm nummer van consument">
                <TableCell align="right">Telefoon</TableCell>
              </Tooltip>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows ? (
              rows.map((row: any, i: number) => {
                console.log(row);
                return (
                  <TableRow key={i}>
                    <TableCell>
                      {row.created &&
                        new Date(row.created).toLocaleTimeString("be-NL")}
                    </TableCell>
                    <TableCell>
                      {row.firstname} {row.lastname}
                    </TableCell>

                    <TableCell>{row.email}</TableCell>
                    <TableCell align="right">
                      {row.phone && "+32" + row.phone}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <>
                <TableRow>
                  <TableCell align="left">
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell align="left">
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell align="left">
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
      {loading && <Loader />}
    </>
  );
}
