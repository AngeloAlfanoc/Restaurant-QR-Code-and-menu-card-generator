import { Button, Tooltip } from "@material-ui/core";
import React, { useState } from "react";

import { editFieldInStoreObject } from "../../../services/crud";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../redux/actions";
export default function SetPublish(props) {
  const dispatch = useDispatch();
  const handlePublish = async (id: string) => {
    dispatch(setLoading(true));
    const doc = await editFieldInStoreObject(id, props.collection);
    doc.set(
      { published: !props.published, editedAt: Date.now(), items: {} },
      { merge: true }
    );
    dispatch(setLoading(false));
  };

  return (
    <>
      <Tooltip title="Publiceren">
        <Button
          color={props.published ? "secondary" : "primary"}
          onClick={() => handlePublish(props.docid)}
        >
          {props.published ? "Onpubliceer" : "Publiceren"}{" "}
        </Button>
      </Tooltip>
    </>
  );
}
