// @flow
import * as React from 'react';
import styled from 'styled-components';
import { Link as RRDLink } from 'react-router-dom';

const Button = styled.div`
  border: 1px solid green;
  box-sizing: border-box;
  user-select: none;
  padding: 8px 16px;
  margin-bottom: 10px;
  display: inline-block;

  a {
    margin: 0;
    padding: 0;
    text-decoration: none;
  }
`;

const NonButtonLink = styled(RRDLink)`
  text-decoration: none;
  color: green;

  :visited {
    color: green;
  }

  :hover {
    color: green;
    text-decoration: underline;
  }

  :active {
    color: green;
  }
`;

type Props = {
  button: boolean,
  children: React.Node,
  to: string,
};

export function Link({ button, children, ...rest }: Props) {
  if (button) {
    return (
      <Button>
        <RRDLink {...rest}>{children}</RRDLink>
      </Button>
    );
  }

  return <NonButtonLink {...rest}>{children}</NonButtonLink>;
}

Link.defaultProps = {
  button: false,
};
