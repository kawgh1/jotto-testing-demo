import React from "react";
import PropTypes from "prop-types";

function Input({ successState, secretWord }) {
    // not destructuring so that the mock functions work in testing, weird thing
    const [currentGuess, setCurrentGuess] = React.useState("");

    if (successState) {
        return <div data-test="component-input" />;
    }
    return (
        <div data-test="component-input">
            <form className="form-inline">
                <input
                    data-test="input-box"
                    className="mb-2 mx-sm-3"
                    type="text"
                    placeholder="Make a guess"
                    value={currentGuess}
                    onChange={(event) => setCurrentGuess(event.target.value)}
                />
                <button
                    data-test="submit-button"
                    className="btn btn-primary mb-2"
                    onClick={(event) => {
                        event.preventDefault();
                        // TODO: update guessedWords
                        // TODO: check against secretWord and update successState if needed
                        setCurrentGuess("");
                    }}
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

Input.propTypes = {
    secretWord: PropTypes.string.isRequired,
};

export default Input;
