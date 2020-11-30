import {
  ADD_MENU_CARD,
  ADD_MENU_ITEM,
  SET_QR_DIALOG_ID,
  TOGGLE_QR_DIALOG,
  SET_LOADING,
  SET_ERROR,
  SET_INPUT,
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
export const setLoading = (value: boolean) => ({
  type: SET_LOADING,
  value,
});
export const setError = (value: string) => ({
  type: SET_ERROR,
  value,
});
export const setAlert = (value: string) => ({
  type: SET_ERROR,
  value,
});
export const setInput = (value: any) => ({
  type: SET_INPUT,
  value,
});
