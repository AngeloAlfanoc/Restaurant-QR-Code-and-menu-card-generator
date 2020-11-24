import { Button, Tooltip } from "@material-ui/core";
import React, { useState } from "react";

import { editFieldInStoreObject } from "../../services/crud";
import Loader from "../loader";

export default function SetPublish(props) {
  const [loading, setLoading] = useState<boolean>(false);
  const handlePublish = async (id: string) => {
    setLoading(true);
    const doc = await editFieldInStoreObject(id, props.collection);
    doc.set(
      { published: !props.published, editedAt: Date.now(), items: {} },
      { merge: true }
    );
    setLoading(false);
  };

  return (
    <>
      <Tooltip title="Publiceren">
        <Button
          color={props.published ? "secondary" : "primary"}
          onClick={() => handlePublish(props.docid)}
        >
          {props.published ? "Onpubliceer" : "Publiceren"}{" "}
          {loading && <Loader />}
        </Button>
      </Tooltip>
      {props.parentLoad && <Loader />}
    </>
  );
}
