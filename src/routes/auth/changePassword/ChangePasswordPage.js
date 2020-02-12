// @flow
import gql from 'graphql-tag';
import * as React from 'react';
import type { Location } from 'react-router-dom';
import queryString from 'query-string';
import { useMutation } from '@apollo/react-hooks';
import { ChangePasswordForm } from './ChangePasswordForm';
import { CentrePage } from '../../../components/layouts/CentrePage';

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

type Data = {
  result: {
    passwordChanged: boolean,
    error: ?{
      message: string,
    },
  },
};

export function ChangePasswordPage(props: Props) {
  const [errorMessage, setErrorMessage] = React.useState<?string>(null);
  const [success, setSuccess] = React.useState<boolean>(false);
  const [formState, setFormState] = React.useState<FormInputs>({
    password: '',
    confirmPassword: '',
  });

  const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD_MUTATION, {
    onError: (error: Error) => setErrorMessage(error.message),
    onCompleted: (data: Data) => {
      const { passwordChanged, error } = data.result;

      if (passwordChanged) {
        setSuccess(true);
      } else {
        setErrorMessage(error ? error.message : 'Unknown error');
      }
    },
  });

  if (success) {
    return <p>Password changed successfully</p>;
  }

  return (
    <CentrePage>
      <ChangePasswordForm
        isBusy={loading}
        clearError={() => setErrorMessage(null)}
        error={errorMessage}
        submit={(e: SyntheticInputEvent<any>) => {
          e.preventDefault();

          const { location } = props;
          const { password, confirmPassword } = formState;

          const { secret } = queryString.parse(location.search);

          const validationErrorMessage = validateInputs({
            password,
            confirmPassword,
            secret,
          });

          if (validationErrorMessage) {
            setErrorMessage(validationErrorMessage);

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
    </CentrePage>
  );
}
