import { UserContext } from "../../contexts/usercontext";
import React, { useContext } from "react";
import "./index.scss";
import Chart from "../../components/chart";
import { Container, Typography, Paper } from "@material-ui/core";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
const Dashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <main className="admin">
      <Typography className="my-3" variant="h5">
        Overzicht
      </Typography>
      <Paper style={{ padding: "16px 0 0 16px" }}>
        <div className="d-flex align-items-center">
          <AssignmentTurnedInIcon />
          <p>Checkins</p>
        </div>
      </Paper>
    </main>
  );
};

export default Dashboard;
