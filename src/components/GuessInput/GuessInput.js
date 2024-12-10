import React, { useState } from 'react';

function GuessInput({ addNewWord, status }) {
  const [inputData, setInputData] = useState('');

  return (
    <form
      className="guess-input-wrapper"
      onSubmit={(e) => {
        e.preventDefault();
        
        addNewWord(inputData);
        setInputData('');
      }}
    >
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        id="guess-input"
        type="text"
        required
        minLength={5}
        maxLength={5}
        pattern="[a-zA-Z]{5}"
        title="5 letter word"
        autoComplete="off"
        value={inputData}
        onChange={(e) => setInputData(e.target.value.toUpperCase())}
        disabled={status}
      />
    </form>
  )
}

export default GuessInput;
