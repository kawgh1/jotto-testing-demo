import moxios from "moxios";
import { getSecretWord, correctGuess, actionTypes } from "./";

// No longer used once Redux Thunk implemented
// describe("correctGuess", () => {
//     test("returns an action with type `CORRECT_GUESS`", () => {
//         const action = correctGuess();
//         expect(action).toStrictEqual({ type: actionTypes.CORRECT_GUESS });
//     });
// });

import { storeFactory } from "../../test/testUtils";

describe("getSecretWord", () => {
    beforeEach(() => {
        moxios.install();
    });
    afterEach(() => {
        moxios.uninstall();
    });
    test("secretWord is returned", () => {
        const store = storeFactory();
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: "party",
            });
        });

        // update to test app in Redux / Context

        // by using 'return' and calling our tested function
        // we know that the axios/moxios call will resolve before the test completes
        return store.dispatch(getSecretWord()).then(() => {
            const secretWord = store.getState().secretWord;
            expect(secretWord).toBe("party");
        });
    });
});
