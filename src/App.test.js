import { mount } from "enzyme";
import { findByTestAttr, storeFactory } from "../test/testUtils";
import App from "./App";

// import getSecretWord function to call in our mock
import { getSecretWord as mockGetSecretWord } from "./actions";

//redux
import { Provider } from "react-redux";

// explicitly activate global mock to make sure getSecretWord doesnt make a network call
jest.mock("./actions");

/**
 * Setup function for App component
 * @returns {ShallowWrapper}
 */
const setup = () => {
    // have to use mount because useEffet does not work with 'shallow'
    // https://github.com/airbnb/enzyme/issues/2086
    const store = storeFactory();
    return mount(
        <Provider store={store}>
            <App />
        </Provider>
    );
};

test("renders without error", () => {
    const wrapper = setup();
    const appComponent = findByTestAttr(wrapper, "component-app");
    expect(appComponent.length).toBe(1);
});

describe("get secret word", () => {
    beforeEach(() => {
        // clear the mock calls from previous tests
        mockGetSecretWord.mockClear();
    });
    test("getSecretWord is called on app mount", () => {
        const wrapper = setup();
        expect(mockGetSecretWord).toHaveBeenCalledTimes(1);
    });

    test("getSecretWord is NOT called on app update", () => {
        const wrapper = setup();
        mockGetSecretWord.mockClear();

        // using setProps because wrapper.update() doesnt trigger useEffect
        // https://github.com/enzymejs/enzyme/issues/2254
        wrapper.setProps();

        expect(mockGetSecretWord).toHaveBeenCalledTimes(0);
    });
});
