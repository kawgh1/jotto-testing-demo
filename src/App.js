import { useEffect } from "react";
import { getSecretWord } from "./actions";
import "./App.css";
import Congrats from "./Congrats";
import GuessedWords from "./UserGuessedWords";
import Input from "./Input";
import { useSelector, useDispatch } from "react-redux";

function App() {
    // const success = false;
    // const secretWord = "party";
    // const guessedWords = [];

    // get props from shared state
    const success = useSelector((state) => state.success);
    const secretWord = useSelector((state) => state.secretWord);
    const guessedWords = useSelector((state) => state.guessedWords);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSecretWord());
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
