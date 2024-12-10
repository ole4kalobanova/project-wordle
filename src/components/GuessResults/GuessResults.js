import React from 'react';
import { range } from '../../utils';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import Guess from '../Guess/Guess';

function GuessResults({ results }) {
  console.log({ results })
  return (
    <div className="guess-results">
      {
        range(NUM_OF_GUESSES_ALLOWED).map(num =>
          <Guess
            // Наличие уникального id в данной задаче избыточно, но он оставлен как пример 
            key={results[num] ? results[num].id : num}
            value={results[num] ? results[num].value : ''}
          />
        )
      }
    </div>
  );
}

export default GuessResults;
