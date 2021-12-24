import { actionTypes } from "../actions";

/**
 * @function secretWordReducer
 * @param {string} state - State before reducer.
 * @param {object} action - Action sent to reducer.
 * @returns {string} - New state (secret word payload from action).
 */

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = "", action) => {
    switch (action.type) {
        case actionTypes.SET_SECRET_WORD:
            return action.payload;
        default:
            return state;
    }
};
