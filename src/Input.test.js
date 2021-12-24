import React from "react";
import { mount } from "enzyme";

import { checkProps, findByTestAttr, storeFactory } from "../test/testUtils";
import Input from "./Input";
// redux
import { Provider } from "react-redux";

// mock entire module for destructuring useState on import //////
// const mockSetCurrentGuess = jest.fn();
// jest.mock('react', () => ({
//   ...jest.requireActual('react'),
//   useState: (initialState) => [initialState, mockSetCurrentGuess]
// }))

/**
 * Setup function for app component
 * @returns {ShallowWrapper}
 */
const setup = (initialState = {}, secretWord = "party") => {
    const store = storeFactory(initialState);
    return mount(
        <Provider store={store}>
            <Input secretWord={secretWord} />
        </Provider>
    );
};

describe("render", () => {
    describe("success is true", () => {
        // let wrapper;
        // beforeEach(() => {
        //     wrapper = setup(true);
        // });
        test("Input renders without error", () => {
            const wrapper = setup({ success: true });
            const inputComponent = findByTestAttr(wrapper, "component-input");
            expect(inputComponent.length).toBe(1);
        });
        test("Input box does not display once user guesses secret word", () => {
            const wrapper = setup({ success: true });
            const inputBox = findByTestAttr(wrapper, "input-box");
            expect(inputBox.exists()).toBe(false);
        });
        test("Submit button does not display once user guesses secret word", () => {
            const wrapper = setup({ success: true });
            const submitButton = findByTestAttr(wrapper, "submit-button");
            expect(submitButton.exists()).toBe(false);
        });
    });
    describe("successState is false", () => {
        test("Input renders without error", () => {
            const wrapper = setup({ success: false });
            const inputComponent = findByTestAttr(wrapper, "component-input");
            expect(inputComponent.length).toBe(1);
        });
        test("Input box does display if user guesses incorrectly", () => {
            const wrapper = setup({ success: false });
            const inputBox = findByTestAttr(wrapper, "input-box");
            expect(inputBox.exists()).toBe(true);
        });
        test("Submit button does display if user guesses incorrectly", () => {
            const wrapper = setup({ success: false });
            const submitButton = findByTestAttr(wrapper, "submit-button");
            expect(submitButton.exists()).toBe(true);
        });
    });
});

test("does not throw prop warning with expected props", () => {
    checkProps(Input, { secretWord: "party" });
});

// below we use variable "originalUseState" to stand for whatever was in useState prior to our
// mock useState function call
// then, afterEach() test - we clear the mock useState and reset it back to originalUseState
describe("state controlled input field", () => {
    // let mockSetCurrentGuess = jest.fn()
    // let wrapper
    // let originalUseState;
    // beforeEach(() => {
    //     mockSetCurrentGuess.mockClear()
    //     originalUseState = React.useState
    //     React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
    //     const wrapper = setup();
    // });

    // afterEach(() => {
    //     React.useSate = originalUseState
    // })

    let mockSetCurrentGuess = jest.fn();
    let wrapper;

    beforeEach(() => {
        mockSetCurrentGuess.mockClear();
        React.useState = () => ["", mockSetCurrentGuess];
        wrapper = setup({ success: false });
    });

    test("state updates with value of input box on change", () => {
        // here we are making a "mock useState" function to run our test,
        // the actual useState() function from React is not being called
        // we tell it what it takes ("") and what it returns (mockSetCurrentGuess)
        // const mockSetCurrentGuess = jest.fn();
        // override useState method
        // React.useState = jest.fn(() => ["", mockSetCurrentGuess]);

        // const wrapper = setup({ success: false });
        const inputBox = findByTestAttr(wrapper, "input-box");

        // mock event
        const mockEvent = { target: { value: "train" } };
        inputBox.simulate("change", mockEvent);

        expect(mockSetCurrentGuess).toHaveBeenCalledWith("train");
    });

    test("field is cleared on submit button click", () => {
        // const mockSetCurrentGuess = jest.fn();
        // React.useState = jest.fn(() => ["", mockSetCurrentGuess]);

        // const wrapper = setup();
        const submitButton = findByTestAttr(wrapper, "submit-button");

        submitButton.simulate("click", { preventDefault() {} });
        expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
    });
});
