import { ADD_MENU_CARD, ADD_MENU_ITEM } from "./constants";

export const addMenuCard = value => ({ type: ADD_MENU_CARD, value })
export const addMenuitem = value => ({ type: ADD_MENU_ITEM, value })