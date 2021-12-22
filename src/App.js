import "./App.css";
import Congrats from "./Congrats";
import GuessedWords from "./GuessedWords";

function App() {
    return (
        <div data-test="component-app" className="container">
            <h1>Jotto</h1>
            <Congrats successState={true} />
            <GuessedWords
                guessedWords={[{ guessedWord: "train", letterMatchCount: 3 }]}
            />
        </div>
    );
}

export default App;
