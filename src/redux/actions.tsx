import {
  ADD_MENU_CARD,
  ADD_MENU_ITEM,
  TOGGLE_QR_DIALOG,
  SET_LOADING,
  SET_ERROR,
  SET_INPUT,
  SET_SELECTED_CARD_ID,
  SET_CHECKIN_REF,
  SET_CURRENT_STEP
} from "./constants";

export const addMenuCard = (value: boolean) => ({ type: ADD_MENU_CARD, value });
export const addMenuitem = (value: boolean) => ({ type: ADD_MENU_ITEM, value });
export const toggleQrDialog = (value: boolean) => ({
  type: TOGGLE_QR_DIALOG,
  value,
});
export const setCheckinRef = (value: string) => ({
  type: SET_CHECKIN_REF,
  value,
});
export const setSelectedCardRef = (value: string) => ({
  type: SET_SELECTED_CARD_ID,
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
export const setCurrentStep = (value: any) => ({
  type: SET_CURRENT_STEP,
  value,
});