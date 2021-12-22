import "./App.css";
import Congrats from "./Congrats";
import GuessedWords from "./GuessedWords";
import Input from "./Input";

function App() {
    // TODO: get props from shared state
    const successState = false;
    const secretWord = "party";
    const guessedWords = [];

    return (
        <div data-test="component-app" className="container">
            <h1>Jotto</h1>
            <Congrats successState={successState} />
            <Input successState={successState} secretWord={secretWord} />
            <GuessedWords guessedWords={guessedWords} />
        </div>
    );
}

export default App;
