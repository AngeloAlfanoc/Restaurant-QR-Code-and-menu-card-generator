import {
  ADD_MENU_CARD,
  ADD_MENU_ITEM,
  TOGGLE_QR_DIALOG,
  SET_LOADING,
  SET_ERROR,
  SET_INPUT,
  SET_SELECTED_CARD_ID,
  SET_CHECKIN_REF,
  SET_CURRENT_STEP,
  SET_MENU_CARDS,
  SET_CONSUMERS,
  SET_USERINFO,
  SET_PUBLIC_USER_INFO,
  SET_ALERT,
  TOGGLE_SWITCH_LINK,
  TOGGLE_SWITCH_QR_CODE,
  SET_MENU_NAME,
  SET_MENU_LINK,
  SET_MENU_CARD_ITEMS,
  SET_MENU_CARD_ITEMS_COUNTER,
  SET_MENU_ITEM_IMAGE,
  SET_MENU_ITEM_IMAGE_FILE,
  TOGGLE_ITEM_IMAGE_DIALOG,
  SET_ITEM_IMAGE_REF,
  TOGGLE_ITEM_IMAGE_DIALOG_CONSUMER,
} from "./constants";
import {IPublicInfo} from "../types"
export const addMenuCard = (value: boolean) => ({ type: ADD_MENU_CARD, value });
export const addMenuItem = (value: boolean) => ({ type: ADD_MENU_ITEM, value });
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
  type: SET_ALERT,
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
export const setMenuCards = (value: any) => ({
  type: SET_MENU_CARDS,
  value,
});
export const setMenuCardItems = (value: any) => ({
  type: SET_MENU_CARD_ITEMS,
  value,
});
export const setMenuCardItemsCounter = (value: number) => ({
  type: SET_MENU_CARD_ITEMS_COUNTER,
  value,
});
export const setConsumers = (value: any) => ({
  type: SET_CONSUMERS,
  value,
});
export const setUserInfo = (value: any) => ({
  type: SET_USERINFO,
  value,
});
export const setPublicUserInfo = (value: IPublicInfo) => ({
  type: SET_PUBLIC_USER_INFO,
  value,
});
export const toggleSwitchLink = (value: any) => ({
  type: TOGGLE_SWITCH_LINK,
  value,
});
export const toggleSwitchQrCode = (value: any) => ({
  type: TOGGLE_SWITCH_QR_CODE,
  value,
});
export const setMenuName = (value: any) => ({
  type: SET_MENU_NAME,
  value,
});
export const setMenuLink = (value: any) => ({
  type: SET_MENU_LINK,
  value,
});
export const setMenuCardItemNewImage = (value: any) => ({
  type: SET_MENU_ITEM_IMAGE,
  value,
});
export const setMenuCardItemNewImageFile = (value: any) => ({
  type: SET_MENU_ITEM_IMAGE_FILE,
  value,
});
export const setToggleItemImageDialog = (value: any) => ({
  type: TOGGLE_ITEM_IMAGE_DIALOG,
  value,
});
export const setItemImageRef = (value: string) => ({
  type: SET_ITEM_IMAGE_REF,
  value,
});
export const toggleItemImageDialogConsumer = (value: any) => ({
  type: TOGGLE_ITEM_IMAGE_DIALOG_CONSUMER,
  value,
});
export const setItemImageRefConsumer = (value: string) => ({
  type: SET_ITEM_IMAGE_REF,
  value,
});
