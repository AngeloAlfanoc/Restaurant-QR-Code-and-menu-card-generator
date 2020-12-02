import React from "react";
import SwitchGlobal from "../switchGlobal";
import { RootStateOrAny, useSelector } from "react-redux";
import { DialogContentText } from "@material-ui/core";
import InputGlobal from "../inputGlobal";

export default function SupplyOwnLink(props) {
  const ownLinkControl = useSelector(
    (state: RootStateOrAny) => state.ownLinkControl
  );
  return (
    <>
      <SwitchGlobal
        checked={ownLinkControl}
        name="ownLinkControl"
        color="primary"
        label="Eigen menu link voorzien?"
      />
      <DialogContentText>
        <small>
          Hiermee kan je de knop "menu" bij het inchecken door verwijzen naar je
          eigen webpagina
        </small>
      </DialogContentText>
      {ownLinkControl && (
        <InputGlobal
          value={props.value}
          className="mb-5"
          margin="dense"
          id="menulink"
          label="Link naar je menu kaart bv. www.mijnfriet.be/menukaart"
          type="name"
          name="menuLink"
        />
      )}
    </>
  );
}
