import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Switch from "@material-ui/core/Switch/Switch";
import React from "react";
import { useDispatch } from "react-redux";
import { setInput } from "../../../redux/actions";

export default function SwitchGlobal(props) {
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    dispatch(
      setInput({
        [e.currentTarget.name]: e.currentTarget.checked,
      })
    );
  };

  return (
    <FormControlLabel
      control={
        <>
          <Switch
            checked={props.checked}
            onChange={handleInputChange}
            name={props.name}
            color={props.color}
          />
        </>
      }
      label={props.label}
    />
  );
}
