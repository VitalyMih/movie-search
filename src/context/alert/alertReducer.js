import {HIDE_ALERT, SHOW_ALERT} from "../types";

export const AlertReducer = (state, action) => {
    switch (action.type) {
        case HIDE_ALERT: return null;
        case SHOW_ALERT: return action.payload;
        default: return state;
    }
}