import "./index.scss";

import React from "react";
import ListedCodes from "../../components/listedCodes";
import { Typography } from "@material-ui/core";

import AddDialog from "../../components/addDialog";
export default function MenuCards() {
  return (
    <main className="admin">
      <Typography className="my-3" variant="h5">
        Menu kaarten
      </Typography>
      <ListedCodes />
      <AddDialog />
    </main>
  );
}
