import React, { useState, useEffect } from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import GuessInput from '../GuessInput/GuessInput';
import GuessResults from '../GuessResults/GuessResults';
import { LETTERS, NUM_OF_GUESSES_ALLOWED } from '../../constants';
import { checkGuess } from '../../game-helpers';
import WonBanner from '../WonBanner/WonBanner';
import LostBanner from '../LostBanner/LostBanner';
import Keyboard from '../Keyboard/Keyboard';

function Game() {
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState('running'); // won|lost|running
  const [answer, setAnswer] = useState('');
  const [keyBoardTable, setKeyBoardTable] = useState([]);

  useEffect(() => {
    const newAnswer = sample(WORDS);
    setAnswer(newAnswer);
    const keyBoardWithStatus = createKeyBoardStatus(LETTERS);
    setKeyBoardTable(keyBoardWithStatus);
  }, []);

  useEffect(() => {
    // To make debugging easier, we'll log the solution in the console.
    console.info({ answer });
  }, [answer]);

  const createKeyBoardStatus = (arr) => {
    return arr.map(row => row.map(letter => ({ letter, status: '' })))
  }

  const updateKeyBoard = (checkedGuess) => {
    let updKeyBoardTable = [];
    checkedGuess.forEach(({ letter, status }) => {
      updKeyBoardTable = keyBoardTable.map(row => {
        const newRow = row.map(key => {
          if (letter === key.letter && key.status !== 'correct') {
            key.status = (key.status === 'misplaced' && status === 'incorrect') ? 'misplaced' : status;
          }
          return key;
        });
        return newRow;
      })
    });
    return updKeyBoardTable;
  }

  const handleSubmitGuess = (value) => {
    const checkedGuess = checkGuess(value, answer);
    setKeyBoardTable(updateKeyBoard(checkedGuess));//TODO

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
    const keyBoardWithStatus = createKeyBoardStatus(LETTERS);
    setKeyBoardTable(keyBoardWithStatus);
    setResults([]);
    setStatus('running');
  }

  return (
    <>
      <GuessResults results={results} />
      <GuessInput handleSubmitGuess={handleSubmitGuess} status={status !== 'running'} />
      <Keyboard keyBoardTable={keyBoardTable} />
      {status === 'won' && <WonBanner numOfGuesses={results.length} action={handleRestartGame} />}
      {status === 'lost' && <LostBanner answer={answer} action={handleRestartGame} />}
    </>
  );
}

export default Game;
