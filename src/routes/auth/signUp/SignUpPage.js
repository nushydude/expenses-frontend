// @flow
import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import { useMutation } from '@apollo/react-hooks';
import { isEmail } from 'validator';
import { SignUpForm } from './SignUpForm';
import type { FormFields } from './SignUpForm';

const SIGNUP_WITH_EMAIL_MUTATION = gql`
  mutation Web_SignUpWithEmail($input: SignUpWithEmailInput!) {
    result: signUpWithEmail(input: $input) {
      created
      error {
        message
      }
    }
  }
`;

type Props = {};

type FormInputs = {
  email: string,
  name: string,
  password: string,
  confirmPassword: string,
};

function validateInputs({
  email,
  name,
  password,
  confirmPassword,
}: FormInputs): ?string {
  if (!isEmail(email)) {
    return 'Email is not a valid email';
  }

  if (name.length === 0) {
    return 'Please fill the name';
  }

  if (password.length < 6) {
    return 'Password is too short';
  }

  if (password !== confirmPassword) {
    return 'Password and confirm password fields do not match';
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
    created: boolean,
    error: ?{
      message: string,
    },
  },
};

export function SignUpPage(props: Props) {
  const [error, setError] = React.useState<?string>(null);
  const [success, setSuccess] = React.useState<boolean>(false);

  const [signUp, { loading }] = useMutation(SIGNUP_WITH_EMAIL_MUTATION, {
    onCompleted: (data: any) => {
      const { created, error } = data.result;

      if (created) {
        setSuccess(true);
      } else {
        setError(error || 'Unknown error');
      }
    },
    onError: (error: Error) => setError(error.message),
  });

  const [formState, setFormState] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });

  const handleInputChange = (name: FormFields) => (
    e: SyntheticInputEvent<HTMLInputElement>,
  ) => {
    setFormState({
      ...formState,
      [name]: e.target.value,
    });
  };

  if (success) {
    return (
      <p>
        Sign up successful. Your account needs to be verified before you can log
        in. Check your email.
      </p>
    );
  }

  return (
    <div style={{ width: '400px' }}>
      <SignUpForm
        isBusy={loading}
        clearError={() => setError(null)}
        error={error}
        submit={(e: SyntheticInputEvent<any>): Promise<any> => {
          e.preventDefault();

          const { email, name, confirmPassword, password } = formState;

          const error = validateInputs({
            email,
            name,
            password,
            confirmPassword,
          });

          if (error) {
            setError(error);

            return Promise.reject();
          } else {
            const variables = { input: { email, name, password } };

            return signUp({ variables });
          }
        }}
        handleInputChange={handleInputChange}
        {...formState}
      />
    </div>
  );
}
