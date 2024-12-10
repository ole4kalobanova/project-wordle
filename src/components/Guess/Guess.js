import React from 'react';
import { range } from '../../utils';

function Guess({ value }) {
  return (
    <p className="guess" >
      {
        range(5).map((num) =>
          <span
            key={num}
            className={value ? `cell ${value[num].status}` : "cell"}
          >
            {value ? value[num].letter : ''}
          </span>
        )
      }
    </p>
  );
}

export default Guess;
