import React, { useState } from "react";

import CheckIcon from "@material-ui/icons/Check";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  MenuItem,
} from "@material-ui/core";

import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";

import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

import { objects } from "./selectProps";
import { IAddMenuItem } from "../../../types";
import { addMenuItem } from "../../../redux/actions";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { addMenuItemData } from "../../../services/crud";
export default function AddMenuItem() {
  const dispatch = useDispatch();
  const [addCardItem, setAddCardItem] = useState<boolean>(false);
  const state = useSelector((state: RootStateOrAny) => state);
  const [menuCardItemSelect, setMenuCardItem] = useState<string>(null);
  const [input, setInput] = useState<IAddMenuItem | null>(null);
  const handleChangeTypeSelect = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMenuCardItem(event.target.value);
  };

  // const handleInputChange = (e) => {
  //   setInput({
  //     [e.currentTarget.name]: e.currentTarget.value,
  //   });
  // };

  const handleStoreMenuItemData = async (type: string) => {
    await addMenuItemData(
      "0",
      type,
      input.title,
      input.itemTitle,
      input.itemPrice,
      undefined,
      0
    );
  };
  return (
    <Dialog
      maxWidth={"md"}
      fullWidth
      open={state.toggleAddMenuItem}
      onClose={() => dispatch(addMenuItem(false))}
    >
      <DialogContent>
        <DialogTitle className="text-left">
          Klik op toevoegen om te beginnen
        </DialogTitle>
        <Box className="w-100 d-flex align-items-center justify-content-between">
          <Tooltip className="ml-3" title="Toevoegen">
            <Button onClick={() => setAddCardItem(true)}>Toevoegen</Button>
          </Tooltip>
          <Tooltip
            className="mr-3"
            title={"Klik op toevoegen om een nieuwe item toe te voegen."}
          >
            <HelpOutlineIcon className="m-2" color="disabled" />
          </Tooltip>
        </Box>
        <DialogContent>
          {addCardItem && (
            <Box className="d-flex justify-content-start">
              <TextField
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
              {menuCardItemSelect === "titel" && (
                <>
                  <TextField
                    // onChange={handleInputChange}
                    name="title"
                    className="mx-2"
                    label="Titel Naam"
                  ></TextField>
                  <Box className="my-auto">
                    <IconButton
                      onClick={() =>
                        handleStoreMenuItemData(menuCardItemSelect)
                      }
                    >
                      <CheckIcon />
                    </IconButton>
                  </Box>
                </>
              )}
              {menuCardItemSelect === "item" && (
                <>
                  <TextField
                    name="itemTitle"
                    className="mx-2"
                    label="Benaming"
                    // onChange={handleInputChange}
                  ></TextField>
                  <TextField
                    name="itemPrice"
                    className="mx-2"
                    label="Prijs"
                    // onChange={handleInputChange}
                  ></TextField>
                  <Box className="my-auto">
                    <IconButton
                      onClick={() =>
                        handleStoreMenuItemData(menuCardItemSelect)
                      }
                    >
                      <CheckIcon />
                    </IconButton>
                  </Box>
                </>
              )}
              {/* {cardId && <CardMenuItems id={cardId} />} */}
            </Box>
          )}
        </DialogContent>
        <Box className="d-flex justify-content-end">
          <Button onClick={() => dispatch(addMenuItem(false))} color="primary">
            Sluiten
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
