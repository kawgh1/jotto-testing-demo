/**
 * @method getLetterMatchCount
 * @param {string} guessedWord - Guessed word.
 * @param {string} secretWord - Secret word.
 * @returns {number} - Number of letters matched between guessed word and secret word.
 */
export function getLetterMatchCount(guessedWord, secretWord) {
    // split("") makes an array where each item is a letter in the secretWord
    const secretLetters = secretWord.split("");
    // make a Set of letters of the of user-supplied guessedWord
    const guessedLetterSet = new Set(guessedWord);
    // take the secretWord letter array and filter it based on the guessedLetterSet letters
    // and return the length of the returned array (how many letters matched)
    return secretLetters.filter((letter) => guessedLetterSet.has(letter))
        .length;
}
