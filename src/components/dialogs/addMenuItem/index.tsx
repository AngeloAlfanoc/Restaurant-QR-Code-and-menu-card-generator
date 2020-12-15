import React, { useState } from "react";

import CheckIcon from "@material-ui/icons/Check";
import { Box, Dialog, DialogContent, DialogTitle, IconButton, TextField, MenuItem, Grid } from "@material-ui/core";

import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import InputGlobal from "../../inputs/global";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

import { objects } from "./selectProps";
import { addMenuItem, setLoading } from "../../../redux/actions";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { addMenuItemData } from "../../../services/crud";
import Cancel from "../../buttons/dialogActions/cancel";
import CardMenuItems from "../../lists/cardMenuItems/cardMenuItems";
import ImageHandler from "./imageHandler";

import { storage } from "../../../services/firebase";
import { uid } from "uid";
import ErrorMessage from "../../alerts/error"
import Warning from "../../alerts/warning"
export default function AddMenuItem() {
  const dispatch = useDispatch();
  const [addCardItem, setAddCardItem] = useState<boolean>(false);
  const {
    toggleAddMenuItem,
    menuCardItemCounter,
    itemTitle,
    itemPrice,
    selectedCardMenuRef,
    itemImageFile,
    userInfo,
    itemDescr,
  } = useSelector((state: RootStateOrAny) => state);
  const [menuCardItemSelect, setMenuCardItem] = useState<string>(null);
  const [generateToken, setGenerateToken] = useState(uid());
  const [prevGenToken, setPrevGenToken] = useState();

  const handleChangeTypeSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMenuCardItem(e.target.value);
  };

  const handleStoreMenuItemData = async (type: string) => {
    dispatch(setLoading(true));

    const ref = storage.ref(userInfo.company);
    ref
      .child(generateToken)
      .put(itemImageFile)
      .then(function (snapshot) {
        console.log(snapshot);
      });
    setAddCardItem(false);

    await addMenuItemData(
      selectedCardMenuRef,
      type,
      itemTitle,
      itemDescr,
      itemPrice,
      generateToken,
      menuCardItemCounter
    );

    dispatch(setLoading(false));
    setGenerateToken(uid());
  };

  return (
    <Dialog maxWidth={"md"} fullWidth open={toggleAddMenuItem} onClose={() => dispatch(addMenuItem(false))}>
      <ErrorMessage/>
        <Warning />
      <DialogContent>
        <DialogTitle className="text-left">Klik op toevoegen om te beginnen</DialogTitle>
        <Box className="w-100 d-flex align-items-center justify-content-between">
          <Tooltip className="ml-3" title="Toevoegen">
            <Button onClick={() => setAddCardItem(true)}>Toevoegen</Button>
          </Tooltip>
          <Tooltip className="mr-3" title={"Klik op toevoegen om een nieuwe item toe te voegen."}>
            <HelpOutlineIcon className="m-2" color="disabled" />
          </Tooltip>
        </Box>
        <DialogContent>
          {addCardItem && (
            <Box className="d-flex justify-content-start">
              <Grid container>
                <Grid item sm={12} md={6}>
                  <TextField
                    fullWidth
                    id="standard-select-type"
                    select
                    label="Type van item"
                    value={menuCardItemSelect}
                    onChange={handleChangeTypeSelect}
                    helperText="Kies je type van object hier"
                  >
                    {objects.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                {menuCardItemSelect === "title" && (
                  <Box className="d-flex justify-content-between w-100 mb-4 mt-1">
                    <Grid item sm={12}>
                      <InputGlobal fullWidth id="name" label="Titel Naam" type="name" name="itemTitle" />
                    </Grid>
                    <Grid item sm={1}>
                      <Box className="my-auto">
                        <IconButton onClick={() => handleStoreMenuItemData(menuCardItemSelect)}>
                          <CheckIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Box>
                )}
                {menuCardItemSelect === "item" && (
                  <Box className="d-flex justify-content-between w-100 mb-4 mt-1 flex-wrap align-items-center">
                    <Grid item sm={6}>
                      <InputGlobal fullWidth id="itemTitle" label="Benaming" type="name" name="itemTitle" />
                    </Grid>
                    <Grid item sm={6}>
                      <InputGlobal
                        className="ml-2"
                        fullWidth
                        id="itemDescr"
                        label="Beschrijving"
                        type="name"
                        name="itemDescr"
                      />
                    </Grid>
                    <Grid item sm={6}>
                      <InputGlobal
                        fullWidth
                        className="my-2"
                        id="itemPrice"
                        label="Prijs"
                        type="name"
                        name="itemPrice"
                        adornement="€"
                      />
                    </Grid>

                    <Grid item sm={5}>
                      <Box className="my-5 ml-3">
                        <ImageHandler />
                      </Box>
                    </Grid>
                    <Grid item sm={1}>
                      <Box>
                        <IconButton onClick={() => handleStoreMenuItemData(menuCardItemSelect)}>
                          <CheckIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Box>
                )}
              </Grid>
            </Box>
          )}
          <CardMenuItems />
        </DialogContent>
        <Box className="d-flex justify-content-end">
          <Cancel />
        </Box>
      </DialogContent>
    </Dialog>
  );
}
