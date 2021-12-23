import axios from "axios";

//////////////////////////////////////////////////////
// THIS WOULD NORMALLY GO IN AN ACTIONTYPES.JS FILE
export const actionTypes = {
    CORRECT_GUESS: "CORRECT_GUESS",
};

/**
 * @function correctGuess
 * @returns {object} - Action object with type 'CORRECT_GUESS'
 */

export function correctGuess() {
    return { type: actionTypes.CORRECT_GUESS };
}
///////////////////////////////////////////////////////////

export const getSecretWord = () => {
    // return response from server
    return axios.get("http://localhost:3030").then((response) => response.data);
};
