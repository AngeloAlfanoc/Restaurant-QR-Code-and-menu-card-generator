import { Button, Tooltip } from "@material-ui/core";
import React from "react";

import { editFieldInStoreObject } from "../../../services/crud";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../redux/actions";
export default function SetPublish(props) {

  const dispatch = useDispatch();

  const handlePublish = async () => {
    const {docid, collection, published} = props
    dispatch(setLoading(true));
    const doc = await editFieldInStoreObject(docid, collection);
    doc.set(JSON.parse(JSON.stringify(
      { published: !published, editedAt: Date.now() })),
      { merge: true }
    );
    dispatch(setLoading(false));
  };

  return (
    <>
      <Tooltip title="Publiceren">
        <Button
          color={props.published ? "secondary" : "primary"}
          onClick={handlePublish}
        >
          {props.published ? "Onpubliceer" : "Publiceren"}
        </Button>
      </Tooltip>
    </>
  );
}
