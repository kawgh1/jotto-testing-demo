# Jotto

-   ##### Different perspective before diving in
    -   ##### Testing React: A convert’s journey from Enzyme to Testing Library
        -   https://bonniedotdev.medium.com/testing-react-a-converts-journey-from-enzyme-to-testing-library-70f85eebb674

### Basic React App game where user guesses random 5 letter word supplied by a server - used to demonstrate TDD and Enzyme+Jest testing

-   ### Branches

    -   `main` - has base code for basic function and mock tests
    -   `redux-testing` - has code for Redux testing
    -   `context-testing` - has code for React Context testing

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

-   ## `.only`, `.skip` and `.todo`

    -   Jest methods on `test` and `describe`
    -   `.only`: only run test/describe **in this file** with `.only` specified
    -   `.skip`: don't run any test/describe **in this file** with `.skip` specified
        -   Good for isolating tests - such as when we have a particularly tricky code impl to test and we just want to isolate that one test until we get it passing
        -   or skipping tests when we may not have that part of the code or app functionality ready to test yet _but we know the expected behavior to test for (and thus, can write tests to be skipped_)
    -   `.todo` is for test to remind yourself to write later

                describe('invalid word guessed', () => {
                    test.todo('guessedWords table does not get another row');
                });

-   ## Testing Axios calls

    -   **npm install axios**

    -   `getSecretWord` in both Context and Redux Implementations
        -   Actual function slightly different
            -   In Redux we're adding that secret word to the global state
            -   in Context we're setting the App level state
        -   Both functions will call `axios`
    -   Test code using `moxios` is the same for both

-   ## `Moxios`

    -   **npm install --save-dev moxios**

    -   Random word server is necessary for actual app, but we don't want to test the server when testing the app
    -   Using Moxios lets us test just the app and mock axios calls
    -   How Moxios works

        -   Test installs Moxios
            -   Axios will now send requests to Moxios instead of HTTP
            -   Test specifies Moxios response to return to Axios to return to our app

    -   Moxios Syntax

        -   Test calls `moxios.install()`
            -   Sets moxios as the axios adapter
            -   Routes axios calls to moxios instead of http
        -   Can pass axios Instance to `moxios.install()`
            -   Use your configured settings
            -   If not instance, leave param blank for default settings
        -   Call `moxios.wait()` during test

            -   watches for axios calls
            -   Sends response using the callback passed to `.wait()`

                    moxios.wait(() => {
                        const request = moxios.requests.mostRecent();
                        request.respondWith({
                            status: 200
                            response: secretWord
                        });
                    });

-   ## Testing Asynchronous Functions

    -   `getSecretWord` returns a promise from Axios
    -   Put assertion in `.then()` callback after running `getSecretWord()`
        -   Assertion will run after promise resolves
    -   So Much Asynchronicity!
        -   `moxios.wait()` is also asynchronous
        -   More important than ever, when testing asychronous functions, to see our tests fail
        -   **It is very easy to make a mistake such that a test completes before async resolves**
            -   Leaving the impression that the test passed when really the async function never even resolved!
            -   **Tests can and do pass even though assertions fail!**
                -   If you're not careful, the test can exist before the promise resolves
                -   Since the test function is a regular JS function, when it calls the async call, the test function may finish without error before the async call
    -   **This is why it's important to see your async tests fail**
        -   If you can see the test fail, you know the assertion is being run before the test function completes, and thus the async call is resolving
        -   **Make sure to return your function call `getSecretWord()` in the test**
            -   this way we know the test won't finish before async promise resolves
        -   **Make sure to call assertion in the `.then()` callback from your function call**
            -   Can also use async and await
            -   won't run until `getSecretWord()` async promise resolves
        -   **Make sure you can see the tests fail**

-   ## Mocking Modules in Jest

    -   Before, we mocked pieces of or methods of modules individually: `React.useState()` by overriding the useState method
    -   That was done test-file by test-file
        -   reasonable: sometimes we wanted to mock, sometimes we didn't
    -   We are going to want to mock the `getSecretWord` action everywhere
        -   never want to go across the network except maybe for End-to-End testing
    -   For this: mock the module **globally** so it will automatically be mocked for all of our files

    -   ## Mock files for global mocks

        -   Global mock file can be used by **any** test file
        -   Located in folder with special name: `__mocks__`
        -   Useful if you want to mock every time ( or almost every time)
        -   Test files import from `__mocks__` code instead of actual module code

    -   ## Location of `__mocks__` folder

        -   For any node module

            -   At same level as the `node_modules` folder
                -   jotto-redux/
                    -   **mocks**
                        -   react.js
                    -   node_modules
                    -   src

        -   For project modules
            -   At the same level as the module
                -   src
                    -   App.js
                    -   App.test.js
                    -   **mocks**
                        -   helpers.js
                    -   helpers.js

    -   ## Different Behavior for Node Modules

        -   `__mocks__` file that provides mocks
            -   mocking a node module (ex. 'react')
                -   mocks automatically unless you explicitly unmock at the top of the test file
            -   mocking a project module
                -   will **not** mock unless you explicitly mock at the top of the test file

    -   ## Mocking with Create-React-App

        -   Issue with location of node modules
            -   `__mocks__` folder needs to be at top level of `src`, not same level as `node_modules`
            -   link to issue: https://github.com/facebook/create-react-app/issues/7539
            -   Mocks reset automatically before each test
                -   This is a problem if you've specified return value
                    -   https://github.com/facebook/jest/issues/9131#issuecomment-668790615

    -   ## Mocking useEffect Hook
        -   React hook that runs function on component reload, every reload
            -   or specify to re-run only when certain values change
        -   "re-run when an empty array changes" = run only on mount
            -   equivalent of `componentDidMount`
            -   example - we wouldn't want to `secretWord` to change every time the player guessed a word! No one would play that game
        -   use Enzyme `mount` not `shallow` for `useEffect`
            -   `useEffect` not called on `shallow`
            -   https://github.com/airbnb/enzyme/issues/2086
        -   Mock module containing `getSecretWord`
            -   set up global mock to avoid network calls in tests
        -   Clear mock using `.clearMock()` after each test so we know that we dont have any side effects from any previous tests
            -   mock tracks calls cumulatively until reset
        -   `secretWord` should not update on App update
            -   evil game - word changes every guess
        -   Notes: we are not testing that React's useEffect hook works properly
            -   That's React's job
            -   We are testing that our code is using the hook properly
        -   Will trigger update with Enzyme `setProps()`
            -   `update()` doesnt trigger `useEffect()`
            -   issue https://github.com/enzymejs/enzyme/issues/2254

-   # Notes on Shared State (Redux vs. Context API)
    -   Shared State is used for props needed by lots of components
        -   Global settings (language, visual theme, user properties)
        -   Deeply nested components that need access to certain props that their ancestors don't
    -   Redux vs Context API
        -   Simple apps: Context works great
        -   Sophisticated apps: Redux has better tools
            -   optimization for high frequency updates or state changes
            -   rich ecosystem for developers
                -   tools for debugging
            -   middleware for automatic code upon any action
                -   for example, logging events to analytics pipelines

# REDUX

-   **npm install --save redux react-redux**
