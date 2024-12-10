import React, { useState } from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import GuessInput from '../GuessInput/GuessInput';
import GuessResults from '../GuessResults/GuessResults';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import { checkGuess } from '../../game-helpers';
import WonBanner from '../WonBanner/WonBanner';
import LostBanner from '../LostBanner/LostBanner';

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState('running'); // won|lost|running

  const addNewWord = (value) => {
    const checkedGuess = checkGuess(value, answer);
    // Наличие уникального id в данной задаче избыточно, но он оставлен как пример 
    const nextResults = [...results, { id: crypto.randomUUID(), value: checkedGuess }];
    setResults(nextResults)

    if (value === answer) {
      setStatus('won')
    } else if (nextResults.length === NUM_OF_GUESSES_ALLOWED) {
      setStatus('lost');
    }
  }

  return (
    <>
      <GuessResults results={results} />
      <GuessInput addNewWord={addNewWord} status={status !== 'running'} />
      {status === 'won' && <WonBanner numOfGuesses={results.length} />}
      {status === 'lost' && <LostBanner answer={answer} />}
    </>
  );
}

export default Game;
