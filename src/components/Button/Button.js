import React from 'react';

import cn from 'classnames';

import './Button.scss';

function Button({ onClick, children, className, type }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn('Button', className)}
    >
      {children}
    </button>
  )
}

export default Button;
