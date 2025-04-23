import React from 'react';
import { Button as StyledButton } from '../styles';

function Button({ children, onClick }) {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
}

export default Button;
