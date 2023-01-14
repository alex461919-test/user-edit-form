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

export function getHumanViewError(error: unknown) {
  // console.log(error);
  return React.createElement('pre', { children: JSON.stringify(error, null, 2) });
  //  return <pre>{JSON.stringify(error, null, 2)}</pre>;
}
