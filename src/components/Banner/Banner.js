import React from 'react';
import Button from '../Button/Button';

function Banner({ status, children, action }) {
  return (
    <div className={`${status} banner`}>
      {children}
      <Button text="RESTART GAME" type="restart" action={action} />
    </div>
  );
}

export default Banner;
