import { Button, Tooltip } from "@material-ui/core";
import React, { useState } from "react";

import { editFieldInStoreObject } from "../../services/crud";
import Loader from "../loader";

export default function SetPublish(props) {
  const handlePublish = async (id: string) => {
    const doc = await editFieldInStoreObject(id, props.collection);
    doc.set(
      { published: !props.published, editedAt: Date.now(), items: {} },
      { merge: true }
    );
  };

  return (
    <>
      <Tooltip title="Publiceren">
        <Button
          color={props.published ? "secondary" : "primary"}
          onClick={() => handlePublish(props.docid)}
        >
          {props.published ? "Onpubliceer" : "Publiceren"}
        </Button>
      </Tooltip>
      {props.parentLoad && <Loader />}
    </>
  );
}
