import axios from "axios";
import { getLetterMatchCount } from "../helpers";

//////////////////////////////////////////////////////
// THIS WOULD NORMALLY GO IN AN ACTIONTYPES.JS FILE
export const actionTypes = {
    CORRECT_GUESS: "CORRECT_GUESS",
    GUESS_WORD: "GUESS_WORD",
};

// Used this before implementing Thunk
// /**
//  * @function correctGuess
//  * @returns {object} - Action object with type 'CORRECT_GUESS'
//  */

// export function correctGuess() {
//     return { type: actionTypes.CORRECT_GUESS };
// }

/**
 * Returns Redux Thunk function that dispatches GUESS_WORD action and (conditionally) CORRECT_GUESS action
 * @function guessWord
 * @param {string} guessedWord guessed word
 * @returns {function} - Redux Thunk function
 */
// function returns a functions - Thunk
export const guessWord = (guessedWord) => {
    return function (dispatch, getState) {
        const secretWord = getState().secretWord;
        const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);

        dispatch({
            type: actionTypes.GUESS_WORD,
            payload: { guessedWord, letterMatchCount },
        });

        if (guessedWord === secretWord) {
            dispatch({ type: actionTypes.CORRECT_GUESS });
        }
    };
};

export const getSecretWord = () => {
    // return response from server
    return axios.get("http://localhost:3030").then((response) => response.data);
};
