// Since we are testing this with integration testing, there is no guessWordsReducer.test.js file
// The tests are in integration.test.js

import { actionTypes } from "../actions";
/**
 * @function guessedWordsReducer
 * @param {array} state - Array of guessed words
 * @param {object} action - action to be reduced
 * @returns {array} - new guessedWords state
 */

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = [], action) => {
    switch (action.type) {
        case actionTypes.GUESS_WORD:
            return [...state, action.payload];
        default:
            return state;
    }
};
