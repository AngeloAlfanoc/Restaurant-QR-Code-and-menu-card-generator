import React, { useLayoutEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import {
  addMenuCard,
  toggleQrDialog,
  setLoading,
  setSelectedCardRef,
  setCurrentStep,
  setAlert,
  setInput,
} from "../../redux/actions";
import { uid } from "uid";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
export default function Next() {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);
  const [urlMatchExpression] = useState(
    "(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})"
  );
  const { qrCodeControl, ownLinkControl, menuName, menuLink } = useSelector(
    (state: RootStateOrAny) => state
  );

  useLayoutEffect(() => {
    const regex = new RegExp(urlMatchExpression);
    if (menuName && !ownLinkControl) {
      if (menuName.length >= 4) {
        setDisabled(false);
      }
    }
    if (ownLinkControl && menuName && menuLink) {
      if (menuLink.match(regex)) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  }, [menuName, ownLinkControl, urlMatchExpression, menuLink]);
  const handler = (e) => {
    if (!qrCodeControl && !ownLinkControl) {
      dispatch(setAlert("Gelieve tenminste een schakelaar aan de klikken."));
    }
    if (menuName.length === 0) {
      dispatch(
        setAlert("Je dient een naamkaart in te vullen om verder te gaan!")
      );
    }
    if (ownLinkControl && menuLink.length === 0) {
      dispatch(
        setAlert(
          "Je selecteerde de optie eigen menu kaart invullen, gelieve dan ook een link te voorzien!"
        )
      );
    } else {
      dispatch(setLoading(true));
      dispatch(addMenuCard(false));
      dispatch(setSelectedCardRef(uid()));
      dispatch(toggleQrDialog(true));
      dispatch(setLoading(false));
      dispatch(setCurrentStep("dialogMenuCard"));
    }
    dispatch(
      setInput({
        buttonTracker: "next",
      })
    );
  };

  return (
    <Button disabled={disabled} onClick={handler} color="primary">
      Volgende
    </Button>
  );
}
