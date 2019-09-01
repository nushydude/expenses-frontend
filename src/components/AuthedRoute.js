// @flow
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { isAuthed } from '../redux/selectors/auth';
import { ROUTE } from '../configs/route';

type Props = {
  path: string,
  component: React$ComponentType<*>,
  exact?: boolean,
};

export function AuthedRoute(props: Props) {
  const authed = useSelector(isAuthed);

  if (!authed) {
    return <Redirect to={ROUTE.AUTH_LOGIN} />;
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...props} />;
}

AuthedRoute.defaultProps = {
  exact: false,
};
