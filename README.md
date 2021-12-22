# Jotto

### Basic React App game where user guesses random 5 letter word supplied by a server - used to demonstrate TDD and Enzyme+Jest testing

-   based on React Testing course by Bonnie Schulkin

![jotto-mock-wireframe](https://raw.githubusercontent.com/kawgh1/jotto-testing-demo/7a7c412269cbb20437ea41e5f594f0c3b46d5614/jotto-app-wireframe-mock.png)

Props used in Jotto App
![jotto-props](https://raw.githubusercontent.com/kawgh1/jotto-testing-demo/7a7c412269cbb20437ea41e5f594f0c3b46d5614/jotto-props.png)

### Notes

-   Jest in "Watch Mode" will only test files that have been updated since the last commit

## Jotto App plan

-   Testing with props
    -   Hand down state from parents
    -   Don't need Redux or Context API
-   Set up common tools
    -   define functions in helper file
    -   Set up Enzyme for every file via Jest config
-   Use a localhost server to generate random 5 letter words for user to guess

    -   Will test server calls

-   Input: state-controlled field
    -   useState hook test
-   App: get secret word on mount
    -   useEffect hook test

## Tools Used

-   Enzyme
-   Ezyme-React-Adapter-17

    -   **npm install --save-dev enzyme @wojtekmaj/enzyme-adapter-react-17**

-   Testing Prop Types

    -   Runtime type checking for React props and similar objects.

    -   You can use prop-types to document the intended types of properties passed to components. React (and potentially other libraries—see the checkPropTypes() reference below) will check props passed to your components against those definitions, and warn in development if they don’t match.
    -   https://www.npmjs.com/package/prop-types
    -   **npm install --save prop-types**

-   Check Prop Types

    -   Manually check PropTypes-compatible proptypes, returning any errors instead of logging them to console.error.

    -   This function is more suitable for checking propTypes in unit tests than mocking console.error, avoiding some serious problems with that approach.
    -   https://www.npmjs.com/package/check-prop-types
    -   **npm install --save-dev check-prop-types**
    -   Example:
        test('does not throw warning with expected props', () => {
        const expectedProps = {successState: false};
        const propError = checkPropTypes(Congrats.propTypes, expectedProps, 'prop', Congrats.name);
        expect(propError).toBeUndefined();
        })

## Tests

-   ## Functional Tests
    -   Test user flow - testing what the app does, not how
    -   Independent of code implementation
        -   Can be used for Redux or Context
    -   Initial state: props to send to components:
        -   `successState`
        -   `secretWord`
        -   `guessedWords`
