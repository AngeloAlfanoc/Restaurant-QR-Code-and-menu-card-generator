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
    SET_CURRENT_STEP
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
        case SET_CHECKIN_REF : {
            const {value} = action;
            return {...state, checkinRef:value}
        }
        case SET_SELECTED_CARD_ID : {
            const {value} = action;
            return {...state, selectedCardMenuRef:value}
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
            return { ...state, input: value }
        }
        case SET_CURRENT_STEP : {
            const {value } = action;
            return {...state, input : value}
        }
        default:
            return { ...state };
    }
};

export default withReduxStateSync(mainReducer);
