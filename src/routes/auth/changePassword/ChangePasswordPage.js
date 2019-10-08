// @flow
import gql from 'graphql-tag';
import * as React from 'react';
import type { Location } from 'react-router-dom';
import queryString from 'query-string';
import { useMutation } from '@apollo/react-hooks';
import { ChangePasswordForm } from './ChangePasswordForm';
import type { FormFields } from './ChangePasswordForm';

const CHANGE_PASSWORD_MUTATION = gql`
  mutation Web_ChangePassword($input: ChangePasswordInput!) {
    result: changePassword(input: $input) {
      passwordChanged
      error {
        message
      }
    }
  }
`;

type Props = {
  location: Location,
};

type FormInputs = {
  password: string,
  confirmPassword: string,
};

type ValidateFields = {
  ...FormInputs,
  secret: ?string,
};

function validateInputs({
  password,
  confirmPassword,
  secret,
}: ValidateFields): ?string {
  if (password.length < 6) {
    return 'Password is too short';
  }

  if (password !== confirmPassword) {
    return 'Password and confirm password fields do not match';
  }

  if (!secret) {
    return 'Unable to validate user. Please use the link provided in your email';
  }

  return null;
}

type State = {
  ...FormInputs,
  error: ?string,
  success: boolean,
};

type Data = {
  result: {
    passwordChanged: boolean,
    error: ?{
      message: string,
    },
  },
};

export function ChangePasswordPage(props: Props) {
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  const [formState, setFormState] = React.useState({
    password: '',
    confirmPassword: '',
  });

  const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD_MUTATION, {
    onError: (error: Error) => setError(error.message),
    onCompleted: (data: Data) => {
      const { passwordChanged, error } = data.result;

      if (passwordChanged) {
        setSuccess(true);
      } else {
        setError(error ? error.message : 'Unknown error');
      }
    },
  });

  if (success) {
    return <p>Password changed successfully</p>;
  }

  return (
    <div style={{ width: '400px' }}>
      <ChangePasswordForm
        isBusy={loading}
        clearError={() => setError(null)}
        error={error}
        submit={(e: SyntheticInputEvent<any>) => {
          e.preventDefault();

          const { location } = props;
          const { password, confirmPassword } = formState;

          const { secret } = queryString.parse(location.search);

          const errorMessage = validateInputs({
            password,
            confirmPassword,
            secret,
          });

          if (errorMessage) {
            setError(errorMessage);

            return Promise.reject();
          }

          const variables = {
            input: {
              confirmPassword,
              password,
              resetPasswordSecret: secret,
            },
          };

          return changePassword({ variables });
        }}
        handleInputChange={(e: SyntheticInputEvent<HTMLInputElement>) => {
          const { name, value } = e.target;

          setFormState({ ...formState, [name]: value });
        }}
        {...formState}
      />
    </div>
  );
}
