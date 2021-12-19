import React from "react";
import { shallow } from "enzyme";

import { checkProps, findByTestAttr } from "../test/testUtils";
import Input from "./Input";

/**
 * Setup function for app component
 * @returns {ShallowWrapper}
 */
const setup = (secretWord = "party") => {
    return shallow(<Input secretWord={secretWord} />);
};

test("Input renders without error", () => {
    const wrapper = setup();
    const inputComponent = findByTestAttr(wrapper, "component-input");
    expect(inputComponent.length).toBe(1);
});

test("does not throw prop warning with expected props", () => {
    checkProps(Input, { secretWord: "party" });
});

describe("state controlled input field", () => {
    test("state updates with value of input box on change", () => {
        // here we are making a "mock useState" function to run our test,
        // the actual useState() function from React is not being called
        // we tell it what it takes ("") and what it returns (mockSetCurrentGuess)
        const mockSetCurrentGuess = jest.fn();
        React.useState = jest.fn(() => ["", mockSetCurrentGuess]);

        const wrapper = setup();
        const inputBox = findByTestAttr(wrapper, "input-box");

        // mock event
        const mockEvent = { target: { value: "train" } };
        inputBox.simulate("change", mockEvent);

        expect(mockSetCurrentGuess).toHaveBeenCalledWith("train");
    });
});
