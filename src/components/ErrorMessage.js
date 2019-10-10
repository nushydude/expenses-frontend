// @flow
import * as React from 'react';

type Props = {
  retry?: () => void | null,
  error: Error,
};

export function ErrorMessage({ error, retry }: Props) {
  return (
    <div>
      <p>An error occurred</p>
      <p>{error.message}</p>
      {typeof retry === 'function' && (
        <button type="button" onClick={retry}>
          Retry
        </button>
      )}
    </div>
  );
}

ErrorMessage.defaultProps = {
  retry: null,
};
