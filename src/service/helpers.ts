import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import React from 'react';

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export function isErrorWithMessage(error: unknown): error is { message: string } {
  return typeof error === 'object' && error != null && 'message' in error && typeof (error as any).message === 'string';
}

export function getHumanError(error: unknown): React.ReactNode {
  if (isErrorWithMessage(error)) {
    return error.message;
  } else if (isFetchBaseQueryError(error)) {
    return `Status: ${error.status} ${'error' in error ? error.error : JSON.stringify(error.data)}`;
  }
  return React.createElement('pre', { children: JSON.stringify(error, null, 2) });
}
export const emptyArray: any[] = [];
