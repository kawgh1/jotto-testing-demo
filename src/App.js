import { useEffect } from "react";
import { getSecretWord } from "./actions";
import "./App.css";
import Congrats from "./Congrats";
import GuessedWords from "./UserGuessedWords";
import Input from "./Input";

function App() {
    // TODO: get props from shared state
    const success = false;
    const secretWord = "party";
    const guessedWords = [];

    useEffect(() => {
        getSecretWord();
    }, []);

    return (
        <div data-test="component-app" className="container">
            <h1>Jotto</h1>
            <Congrats success={success} />
            <Input success={success} secretWord={secretWord} />
            <GuessedWords guessedWords={guessedWords} />
        </div>
    );
}

export default App;
