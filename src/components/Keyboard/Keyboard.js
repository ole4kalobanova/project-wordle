import React from 'react';

function Keyboard({ keyBoardTable }) {
  return (
    <div className="keyboard-wrapper">
      {
        keyBoardTable.map((row, index) => (
          <p className="keyboard-row" key={index} >
            {
              row.map(({ letter, status }) =>

                <span
                  key={letter}
                  className={`${status} key`}
                >
                  {letter}
                </span>
              )
            }
          </p>
        ))
      }
    </div>
  );
}

export default Keyboard;
