import React from "react";
// import Enzyme, { shallow } from "enzyme";
import { shallow } from "enzyme";
// import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";

import Congrats from "./Congrats";

// helper test functions
import { findByTestAttr, checkProps } from "../test/testUtils";

// Enzyme.configure({ adapter: new EnzymeAdapter() }); - refactored into setupTests.js

// Congrats Component is a child of App Component from which `successState` is passed

/* 
When using defaultProps in testing, its important to always be aware what they are
and if they ever change - if they do change, you could be using bad props in your tests
making them pointless or even bad if they pass when they should fail from using incorrect props
 */
const defaultProps = { successState: false };

// setup function run before each test
/**
 * Factory function to create a Wrapper for the Congrats component.
 * @function setup
 * @param {object} props - Component props specific to this setup
 * @returns {shallowWrapper}
 */
const setup = (props = {}) => {
    // take defaultProps and if any test-supplied props override any defaultProps,
    // then use the test-supplied Props
    const setupProps = { ...defaultProps, ...props };
    return shallow(<Congrats {...setupProps} />);
};

test("renders without error", () => {
    const wrapper = setup({ successState: false });
    const component = findByTestAttr(wrapper, "component-congrats");
    expect(component.length).toBe(1);
});

test("renders no text when `successState` prop is false", () => {
    const wrapper = setup({ successState: false });
    const component = findByTestAttr(wrapper, "component-congrats");
    expect(component.text()).toBe("");
});

test("renders non-empty congrats message when `successState` prop is true", () => {
    const wrapper = setup({ successState: true });
    const component = findByTestAttr(wrapper, "congrats-message");
    expect(component.text().length).not.toBe(0);
});

/* here we are using the checkProps library which throws a warning 
when incorrect PropTypes are used in a Component
and we are testing, when this Congrats component 
is given 'successSate: false', it does not throw a warning for bad Prop Types */
test("does not throw warning with expected props", () => {
    const expectedProps = { successState: false };
    checkProps(Congrats, expectedProps);
});
