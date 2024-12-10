import React, { useState } from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import GuessInput from '../GuessInput/GuessInput';
import GuessResults from '../GuessResults/GuessResults';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import { checkGuess } from '../../game-helpers';

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [results, setResults] = useState([]);

  const addNewWord = (value) => {
    if (results.length >= NUM_OF_GUESSES_ALLOWED) return;

    setResults([...results, { id: crypto.randomUUID(), value: checkGuess(value, answer) }])
  }

  return (
    <>
      <GuessResults results={results} answer={answer} />
      <GuessInput addNewWord={addNewWord} />
    </>
  );
}

export default Game;
