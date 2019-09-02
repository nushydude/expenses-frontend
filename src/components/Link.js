// @flow
import styled from 'styled-components';
import { Link as _Link } from 'react-router-dom';

export const Link = styled(_Link)`
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
