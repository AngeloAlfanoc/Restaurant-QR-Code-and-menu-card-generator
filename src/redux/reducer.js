import {
    ADD_MENU_CARD,
    ADD_MENU_ITEM,
    OPEN_ADD_MENU_CARD_DIALOG
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
        default:
            return { ...state };
    }
};

export default withReduxStateSync(mainReducer);
