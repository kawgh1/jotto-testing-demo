import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";

import Congrats from "./Congrats";
// helper test functions
import { findByTestAttr } from "../test/testUtils";

Enzyme.configure({ adapter: new EnzymeAdapter() });

// Congrats Component is a child of App Component from which `successState` is passed

// setup function run before each test
/**
 * Factory function to create a Wrapper for the Congrats component.
 * @function setup
 * @param {object} props - Component props specific to this setup
 * @returns {shallowWrapper}
 */
const setup = (props = {}) => {
    return shallow(<Congrats {...props} />);
};

test("renders without error", () => {
    const wrapper = setup();
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
