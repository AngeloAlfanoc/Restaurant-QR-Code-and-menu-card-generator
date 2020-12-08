import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Button from "@material-ui/core/Button";

import { setMenuCardItemNewImage, setMenuCardItemNewImageFile } from "../../../redux/actions";
export default function ImageHandler() {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(setMenuCardItemNewImageFile(e.target.files[0]));
    //Check if files are attached
    if (e.target.files && e.target.files[0]) {
      //set image as object to be readable for browser
      dispatch(setMenuCardItemNewImage(URL.createObjectURL(e.target.files[0])));
    }
  };

  return (
    <label htmlFor="upload-photo">
      <input onChange={handleChange} style={{ display: "none" }} id="upload-photo" name="upload-photo" type="file" />
      <Button color="secondary" variant="contained" component="span">
        Upload foto
      </Button>
    </label>
  );
}
