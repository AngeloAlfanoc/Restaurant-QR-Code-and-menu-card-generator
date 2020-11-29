import {
  ADD_MENU_CARD,
  ADD_MENU_ITEM,
  SET_QR_DIALOG_ID,
  TOGGLE_QR_DIALOG,
} from "./constants";

export const addMenuCard = (value: boolean) => ({ type: ADD_MENU_CARD, value });
export const addMenuitem = (value: boolean) => ({ type: ADD_MENU_ITEM, value });
export const toggleQrDialog = (value: boolean) => ({
  type: TOGGLE_QR_DIALOG,
  value,
});
export const setQrDialogId = (value: string) => ({
  type: SET_QR_DIALOG_ID,
  value,
});
