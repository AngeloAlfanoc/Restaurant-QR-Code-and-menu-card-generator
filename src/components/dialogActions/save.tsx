import Button from "@material-ui/core/Button";
import React, { useContext, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { uid } from "uid";
import { UserContext } from "../../contexts/userContext";
import {
  addMenuCard,
  setError,
  setInput,
  setLoading,
} from "../../redux/actions";
import { addMenuCardToStore } from "../../services/crud";

export default function Save() {
  const dispatch = useDispatch();
  const input = useSelector((state: RootStateOrAny) => state.input);
  const [inputCardId] = useState<string>(uid());
  const { user } = useContext(UserContext);
  async function handler() {
    dispatch(setLoading(true));
    try {
      setError("");
      // await addMenuCardToStore(
      //   inputCardId,
      //   input.menuName,
      //   user.uid,
      //   input.menuLink,
      //   supplyOwnLinkCheck,
      //   checkGenQR
      // );
    } catch (e) {
      setError(e.message);
    } finally {
      dispatch(addMenuCard(false));
      dispatch(setInput(null));
    }
    dispatch(setLoading(false));
  }
  return (
    <Button onClick={handler} color="primary">
      Opslaan
    </Button>
  );
}
