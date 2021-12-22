import moxios from "moxios";
import { getSecretWord } from "./";

describe("getSecretWord", () => {
    beforeEach(() => {
        moxios.install();
    });
    afterEach(() => {
        moxios.uninstall();
    });
    test("secretWord is returned", () => {
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
        return getSecretWord().then((secretWord) => {
            expect(secretWord).toBe("party");
        });
    });
});
