import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../test/testUtils";
import GuessedWords from "./UserGuessedWords";

const defaultProps = {
    guessedWords: [{ guessedWord: "train", letterMatchCount: 3 }],
};

/**
 * Factory function to create shallowWrapper for the GuessedWords Component.
 * @function setup
 * @param {object} props -Component props specific to this setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
    const setupProps = { ...defaultProps, ...props };
    return shallow(<GuessedWords {...setupProps} />);
};

test("does not throw warning with expected props", () => {
    checkProps(GuessedWords, defaultProps);
});

// describe is a way of grouping tests

describe("if there are no words guessed", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup({ guessedWords: [] });
    });
    test("renders without error", () => {
        // const wrapper = setup({ guessedWords: [] });
        const component = findByTestAttr(wrapper, "component-guessed-words");
        expect(component.length).toBe(1);
    });
    test("renders instructions to guess another word", () => {
        // const wrapper = setup({ guessedWords: [] });
        const instructions = findByTestAttr(wrapper, "guess-instructions");
        expect(instructions.text().length).not.toBe(0);
    });
});

describe("if the word is guessed", () => {
    let wrapper;
    const guessedWords = [
        { guessedWord: "train", letterMatchCount: 3 },
        { guessedWord: "agile", letterMatchCount: 1 },
        { guessedWord: "party", letterMatchCount: 5 },
    ];
    beforeEach(() => {
        wrapper = setup({ guessedWords });
    });

    test("renders without error", () => {
        const component = findByTestAttr(wrapper, "component-guessed-words");
        expect(component.length).toBe(1);
    });

    test('renders the "guessed words" section', () => {
        const guessedWordsNode = findByTestAttr(wrapper, "guessed-words");
        expect(guessedWordsNode.length).toBe(1);
    });

    test("correct number of guessed words", () => {
        const guessedWordNode = findByTestAttr(wrapper, "guessed-word");
        expect(guessedWordNode.length).toBe(guessedWords.length);
    });
});
