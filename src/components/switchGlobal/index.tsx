import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Switch from "@material-ui/core/Switch/Switch";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setInput } from "../../redux/actions";

export default function SwitchGlobal(props) {
  const dispatch = useDispatch();
  const [check, setCheck] = useState<boolean>(false);
  const handleInputChange = (e) => {
    dispatch(
      setInput({
        [e.currentTarget.name]: e.currentTarget.checked,
      })
    );
    setCheck(!check);
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
