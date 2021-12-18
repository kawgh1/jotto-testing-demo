# Jotto

### Basic React App game where user guesses random 5 letter word supplied by a server - used to demonstrate TDD and Enzyme+Jest testing

## Jotto App plan

-   Testing with props
    -   Hand down state from parents
    -   Don't need Redux or Context API
-   Set up common tools
    -   define functions in helper file
    -   Set up Enzyme for every file via Jest config
-   Will use a localhost server to generate random 5 letter words for user to guess
-   Will test server calls

-   Input: state-controlled field
    -   useState hook test
-   App: get secret word on mount
    -   useEffect hook test
