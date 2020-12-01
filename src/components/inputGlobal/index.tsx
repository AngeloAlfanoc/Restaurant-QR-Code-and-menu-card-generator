import TextField from "@material-ui/core/TextField/TextField";
import React from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { setInput } from "../../redux/actions";
export default function InputGlobal(props) {
  const dispatch = useDispatch();
  const input = useSelector((state: RootStateOrAny) => state.globalInput);
  const handleInputChange = (e) => {
    dispatch(
      setInput({
        [e.currentTarget.name]: e.currentTarget.value,
      })
    );
  };

  return (
    <TextField
      className={props.className}
      margin={props.margin}
      id={props.id}
      label={props.label}
      type={props.type}
      name={props.name}
      fullWidth
      {...props.required}
      onChange={handleInputChange}
    />
  );
}
