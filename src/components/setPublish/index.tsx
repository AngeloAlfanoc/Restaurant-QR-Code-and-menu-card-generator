import { Button, Tooltip } from "@material-ui/core";
import React from "react";

import { editFieldInStoreObject } from "../../services/crud";
export default function SetPublish(props) {
  const handlePublish = async (id: string) => {
    const doc = await editFieldInStoreObject(id);
    doc.set({ published: !props.published }, { merge: true });
  };
  return (
    <Tooltip title="Publiceren">
      <Button
        color={props.published ? "secondary" : "primary"}
        onClick={() => handlePublish(props.docUid)}
      >
        {props.published ? "Onpubliceer" : "Publiceren"}
      </Button>
    </Tooltip>
  );
}
