import React from 'react';
import { isValidationError } from '../utils/error';

/* eslint-disable-next-line */
export interface ErrorMessagesProps {
  error: unknown;
}

export function ErrorMessages(props: ErrorMessagesProps) {
  let errors;
  if (isValidationError(props.error)) {
    errors = Object.entries(props.error.errors).map(([key, value]) => (
      <li key={key}>
        {key}: {value.join(' ')}
      </li>
    ));
  }

  return <ul className="error-messages">{errors}</ul>;
}

export default ErrorMessages;
