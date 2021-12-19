import React from "react";

// receive success state (true, false - whether word has been correctly guessed) as a prop

/**
 * Functional react component for congratulatory message.
 * @function
 * @param {object} props - React props
 * @returns {JSX.Element} - Rendered component (or null if `successState` prop is false)
 */
function Congrats({ successState }) {
    if (successState) {
        return (
            <div data-test="component-congrats">
                <span data-test="congrats-message">
                    Congratulations! You guessed the word!
                </span>
            </div>
        );
    } else {
        return <div data-test="component-congrats"></div>;
    }
}

export default Congrats;
