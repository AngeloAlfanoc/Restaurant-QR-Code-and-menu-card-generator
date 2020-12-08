import {
    ADD_MENU_CARD,
    ADD_MENU_ITEM,
    TOGGLE_QR_DIALOG,
    SET_LOADING,
    SET_ERROR,
    SET_ALERT,
    SET_INPUT,
    SET_SELECTED_CARD_ID,
    SET_CHECKIN_REF,
    SET_CURRENT_STEP,
    SET_MENU_CARDS,
    SET_CONSUMERS,
    SET_USERINFO,
    SET_PUBLIC_USER_INFO,
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
    SET_ITEM_IMAGE_REF_CONSUMER
} from "./constants";

import { loadState } from "./localStorage";
import { withReduxStateSync } from "redux-state-sync";

const mainReducer = (state = loadState(), action) => {
    switch (action.type) {
        case ADD_MENU_CARD: {
            const { value } = action;
            return { ...state, toggleAddMenuDialog: value };
        }
        case ADD_MENU_ITEM: {
            const { value } = action;
            return { ...state, toggleAddMenuItem: value }
        }
        case TOGGLE_QR_DIALOG: {
            const { value } = action;
            return { ...state, toggleQrDialog: value }
        }
        case SET_CHECKIN_REF: {
            const { value } = action;
            return { ...state, checkinRef: value }
        }
        case SET_SELECTED_CARD_ID: {
            const { value } = action;
            return { ...state, selectedCardMenuRef: value }
        }
        case SET_LOADING: {
            const { value } = action;
            return { ...state, isLoading: value }
        }
        case SET_ERROR: {
            const { value } = action;
            return { ...state, errorMessage: value }
        }
        case SET_ALERT: {
            const { value } = action;
            return { ...state, alertMessage: value }
        }
        case SET_INPUT: {
            const { value } = action;
            return { ...state, ...value }
        }
        case SET_CURRENT_STEP: {
            const { value } = action;
            return { ...state, currentStep: value }
        }
        case SET_MENU_CARDS: {
            const { value } = action;
            return { ...state, menuCards: value }
        }
        case SET_MENU_CARD_ITEMS: {
            const { value } = action;
            return { ...state, menuCardItems: value }
        }
        case SET_CONSUMERS: {
            const { value } = action;
            return { ...state, consumers: value }
        }
        case SET_USERINFO: {
            const { value } = action;
            return { ...state, userInfo: value }
        }
        case SET_PUBLIC_USER_INFO: {
            const { value } = action;
            return { ...state, publicInfo: value }
        }
        case TOGGLE_SWITCH_LINK: {
            const { value } = action;
            return { ...state, ownLinkControl: value }
        }
        case TOGGLE_SWITCH_QR_CODE: {
            const { value } = action;
            return { ...state, qrCodeControl: value }
        }
        case SET_MENU_NAME: {
            const { value } = action;
            return { ...state, menuName: value }
        }
        case SET_MENU_LINK: {
            const { value } = action;
            return { ...state, menuLink: value }
        }
        case SET_MENU_ITEM_IMAGE: {
            const { value } = action;
            return { ...state, itemImage: value }
        }
        case SET_MENU_ITEM_IMAGE_FILE: {
            const { value } = action;
            return { ...state, itemImageFile: value }
        }
        case SET_MENU_CARD_ITEMS_COUNTER: {
            const { value } = action;
            return { ...state, menuCardItemCounter: value }
        }
        case TOGGLE_ITEM_IMAGE_DIALOG: {
            const { value } = action;
            return { ...state, toggleItemImageDialog: value }
        }
        case TOGGLE_ITEM_IMAGE_DIALOG_CONSUMER: {
            const { value } = action;
            return { ...state, toggleItemImageDialogConsumer: value }
        }
        case SET_ITEM_IMAGE_REF: {
            const { value } = action;
            return { ...state, itemImageRef: value }
        }
        case SET_ITEM_IMAGE_REF_CONSUMER: {
            const { value } = action;
            return { ...state, itemImageRef: value }
        }
        default:
            return { ...state };
    }
};

export default withReduxStateSync(mainReducer);
