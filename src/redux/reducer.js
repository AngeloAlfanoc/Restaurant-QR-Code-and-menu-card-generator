import {
    ADD_MENU_CARD,
    ADD_MENU_ITEM,
    TOGGLE_QR_DIALOG,
    SET_QR_DIALOG_ID
} from "./constants";

import { loadState } from "./localStorage";
import { withReduxStateSync } from "redux-state-sync";

const mainReducer = (state = loadState(), action) => {
    switch (action.type) {
        case ADD_MENU_CARD: {
            // const { value } = action;
            return { ...state, toggleAddMenuDialog: !state.toggleAddMenuDialog, };
        }
        case ADD_MENU_ITEM: {
            return { ...state, toggleAddMenuItem: !state.toggleAddMenuItem }
        }
        case TOGGLE_QR_DIALOG: {
            return { ...state, toggleQrDialog: !state.toggleQrDialog }
        }
        case SET_QR_DIALOG_ID: {
            const { value } = action;
            return { ...state, QrDialogId: value }
        }
        default:
            return { ...state };
    }
};

export default withReduxStateSync(mainReducer);
