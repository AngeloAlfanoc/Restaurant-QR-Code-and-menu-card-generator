import React, { useContext, useEffect, useState } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { UserContext } from "../../contexts/userContext";

import { Alert, Skeleton } from "@material-ui/lab";

import Loader from "../../components/loader";
import Tooltip from "@material-ui/core/Tooltip";

import { IconButton, TextField } from "@material-ui/core";
import { db } from "../../services/firebase";
import Box from "@material-ui/core/Box/Box";
import Moment from "react-moment";
import moment from "moment";
import "moment-timezone";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { rmDataStoreSub } from "../../services/crud";
import { IDateRange } from "../../types";
import { setLoading } from "../../redux/actions";
import { useDispatch } from "react-redux";

export default function ListedConsumers(props: any) {
  const { user } = useContext(UserContext);

  const [error, setError] = useState<string>(null);
  const [rows, setRows] = useState<any>(null);
  const [today] = useState(moment(new Date()).format("YYYY-MM-DD"));

  const dispatch = useDispatch();

  const [todayPlusOne] = useState(
    moment(new Date()).add(1, "day").format("YYYY-MM-DD")
  );
  const [dateRange, setDateRange] = useState<IDateRange>({
    rangeStart: moment(today).valueOf(),
    rangeEnd: moment(todayPlusOne).valueOf(),
  });
  const [boot, setBoot] = useState<boolean>(false);
  const handleOnChange = (e) => {
    const conv = moment(e.currentTarget.value).valueOf();
    setDateRange({
      ...dateRange,
      [e.currentTarget.name]: conv,
    });
  };

  const handleDelete = (document: string, index: number) => {
    try {
      dispatch(setLoading(true));
      rmDataStoreSub("checkins", props.docid, "items", document);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    dispatch(setLoading(true));

    if (!boot) {
      setDateRange({
        rangeStart: moment(today).valueOf(),
        rangeEnd: moment(todayPlusOne).valueOf(),
      });
      setBoot(true);
    }
    if (boot) {
      db.collection("checkins")
        .doc(props.docid)
        .collection("items")
        .orderBy("created", "desc")
        .limit(props.range)
        .where("created", ">=", dateRange.rangeStart)
        .where("created", "<=", dateRange.rangeEnd)
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
              firstname: "Er hebben nog geen consumenten ingecheckt vandaag...",
            });
          }
          setRows(tempLoad);
        });
    }

    dispatch(setLoading(false));
  }, [
    setRows,
    user.uid,
    props.docid,
    props.range,
    today,
    todayPlusOne,
    dateRange.rangeStart,
    dateRange.rangeEnd,
    boot,
  ]);

  return (
    <>
      <TableContainer component={Paper}>
        {props.tools && (
          <Box className="w-100 d-flex align-items-between justify-items-between my-3">
            <Tooltip title="Selectie start">
              <TextField
                className="mx-3"
                id="datetime-local"
                label="Zoek tussen"
                type="datetime-local"
                name="rangeStart"
                defaultValue={today + "T00:00"}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleOnChange}
              />
            </Tooltip>
            <Tooltip title="Selectie einde">
              <TextField
                className="mx-3"
                id="datetime-local"
                label="en"
                type="datetime-local"
                name="rangeEnd"
                defaultValue={todayPlusOne + "T00:00"}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleOnChange}
              />
            </Tooltip>
          </Box>
        )}

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
              <Tooltip title="Acties">
                <TableCell align="right">Acties</TableCell>
              </Tooltip>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows ? (
              rows.map((row: any, i: number) => {
                const stamp = moment(row.created).unix();
                return (
                  <TableRow key={i}>
                    {row.created && (
                      <TableCell>
                        <Moment
                          format="DD/MM - HH:mm"
                          local
                          unix
                          tz="Europe/Brussels"
                        >
                          {stamp}
                        </Moment>
                      </TableCell>
                    )}
                    <TableCell>
                      {row.firstname} {row.lastname}
                    </TableCell>

                    <TableCell>{row.email}</TableCell>
                    <TableCell align="right">
                      {row.phone && "+32" + row.phone}
                    </TableCell>
                    {row.docid && (
                      <TableCell align="right">
                        <Tooltip title="Verwijderen">
                          <IconButton
                            onClick={() => handleDelete(row.docid, i)}
                            color="secondary"
                            size="medium"
                          >
                            <DeleteForeverIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
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
    </>
  );
}
