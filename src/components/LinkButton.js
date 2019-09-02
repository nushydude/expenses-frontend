// @flow
import styled from 'styled-components';

export const LinkButton = styled.button`
  background: none !important;
  border: none;
  padding: 0 !important;
  /*optional*/
  font-family: Roboto, sans-serif;
  /*input has OS specific font-family*/
  color: green;
  cursor: pointer;
  font-size: 16px;

  // -webkit-transition-duration: 0.4s; /* Safari */
  // transition-duration: 0.4s;

  :focus {
    outline: none;
  }

  :hover {
    text-decoration: underline;
  }
`;
