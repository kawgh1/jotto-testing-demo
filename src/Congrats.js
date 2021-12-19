import React from "react";
import PropTypes from "prop-types";

// receive success state (true, false - whether word has been correctly guessed) as a prop

/**
 * Functional react component for congratulatory message.
 * @function
 * @param {object} props - React props
 * @returns {JSX.Element} - Rendered component (or null if `successState` prop is false)
 */
const Congrats = (props) => {
    if (props.successState) {
        return (
            <div data-test="component-congrats" className="alert alert-success">
                <span data-test="congrats-message">
                    Congratulations! You guessed the word!
                </span>
            </div>
        );
    } else {
        return <div data-test="component-congrats"></div>;
    }
};

Congrats.propTypes = {
    successState: PropTypes.bool.isRequired,
};

export default Congrats;
