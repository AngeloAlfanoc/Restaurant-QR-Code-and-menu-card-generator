import TextField from "@material-ui/core/TextField/TextField";
import React from "react";
import { useDispatch } from "react-redux";
import { setInput } from "../../../redux/actions";
import InputAdornment from "@material-ui/core/InputAdornment";
export default function InputGlobal(props) {
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    dispatch(
      setInput({
        [e.currentTarget.name]: e.currentTarget.value,
      })
    );
  };

  return (
    <TextField
      value={props.value}
      className={props.className}
      margin={props.margin}
      id={props.id}
      label={props.label}
      type={props.type}
      name={props.name}
      fullWidth
      {...props}
      onChange={handleInputChange}
      InputProps={
        props.adornement && {
          startAdornment: (
            <InputAdornment position="start">{props.adornement}</InputAdornment>
          ),
        }
      }
    />
  );
}
