import React from 'react';

function Button({ action, text, type }) {
  return (
    <button className={`${type}-button`} onClick={action}>
      {text}
    </button>
  );
}

export default Button;
