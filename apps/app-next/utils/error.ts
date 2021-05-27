import { ValidationErrorResponse } from '../models/validation-error-response';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isValidationError(
  error: unknown
): error is ValidationErrorResponse {
  return !!(error as ValidationErrorResponse)?.errors;
}
