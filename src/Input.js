import React from "react";
import PropTypes from "prop-types";
// redux
import { useSelector, useDispatch } from "react-redux";
import { guessWord } from "./actions";

function Input({ secretWord }) {
    // not destructuring so that the mock functions work in testing, weird thing
    const [currentGuess, setCurrentGuess] = React.useState("");
    // redux
    const success = useSelector((state) => state.success);
    const dispatch = useDispatch();

    if (success) {
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
                        // update guessedWords
                        // check against secretWord and update successState if needed
                        dispatch(guessWord(currentGuess));
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
