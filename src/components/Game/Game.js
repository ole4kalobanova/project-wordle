import React, { useState, useEffect } from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import GuessInput from '../GuessInput/GuessInput';
import GuessResults from '../GuessResults/GuessResults';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import { checkGuess } from '../../game-helpers';
import WonBanner from '../WonBanner/WonBanner';
import LostBanner from '../LostBanner/LostBanner';
import Button from '../Button/Button';

function Game() {
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState('running'); // won|lost|running
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    const newAnswer = sample(WORDS);
    setAnswer(newAnswer);
  }, []);

  useEffect(() => {
    // To make debugging easier, we'll log the solution in the console.
    console.info({ answer });
  }, [answer]);

  const handleSubmitGuess = (value) => {
    const checkedGuess = checkGuess(value, answer);
    // The unique ID in this task is unnecessary, but it is left as an example
    const nextResults = [...results, { id: crypto.randomUUID(), value: checkedGuess }];
    setResults(nextResults)

    if (value === answer) {
      setStatus('won')
    } else if (nextResults.length === NUM_OF_GUESSES_ALLOWED) {
      setStatus('lost');
    }
  }

  const handleRestartGame = () => {
    const newAnswer = sample(WORDS);
    setAnswer(newAnswer);
    setResults([]);
    setStatus('running');
  }

  return (
    <>
      <GuessResults results={results} />
      <GuessInput handleSubmitGuess={handleSubmitGuess} status={status !== 'running'} />
      {status === 'won' && <WonBanner numOfGuesses={results.length} action={handleRestartGame} />}
      {status === 'lost' && <LostBanner answer={answer} action={handleRestartGame} />}
    </>
  );
}

export default Game;
