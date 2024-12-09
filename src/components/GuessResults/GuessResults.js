import React from 'react';
import { range } from '../../utils';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import Guess from '../Guess/Guess';

function GuessResults({ results }) {
  return (
    <div className="guess-results">
      {
        range(NUM_OF_GUESSES_ALLOWED).map(num => <Guess key={num} value={results[num] ? results[num].value : ''} />)
      }
    </div>
  );
}

export default GuessResults;
