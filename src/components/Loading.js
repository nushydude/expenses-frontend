// @flow
import * as React from 'react';
import Spinner from 'react-spinkit';

export function Loading() {
  return (
    <div style={{ display: 'inline-block', width: '50%' }}>
      <Spinner name="double-bounce" color="pink" />
    </div>
  );
}
