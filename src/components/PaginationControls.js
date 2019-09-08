// @flow
import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  width: 290px;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  width: 50px;
  padding: 10px 0;
`;

const PageNumberContainer = styled.div`
  padding: 10px;
  width: 50px;
  text-align: center;
`;

const PageNumber = styled.p``;

type Props = {
  pageNumber: number,
  totalPages: number,
  setPageNumber: () => void,
};

export function PaginationControls({
  pageNumber,
  totalPages,
  setPageNumber,
}: Props) {
  return (
    <Container>
      <Content>
        <Button
          disabled={totalPages === 1 || pageNumber < 2}
          onClick={() => setPageNumber(1)}
        >
          {'<<'}
        </Button>
        <Button
          disabled={totalPages === 1 || pageNumber < 2}
          onClick={() => setPageNumber(pageNumber - 1)}
        >
          {'<'}
        </Button>
        <PageNumberContainer>
          <PageNumber>{`${pageNumber}/${totalPages}`}</PageNumber>
        </PageNumberContainer>
        <Button
          disabled={totalPages === 1 || pageNumber > totalPages - 1}
          onClick={() => setPageNumber(pageNumber + 1)}
        >
          {'>'}
        </Button>
        <Button
          disabled={totalPages === 1 || pageNumber > totalPages - 1}
          onClick={() => setPageNumber(totalPages)}
        >
          {'>>'}
        </Button>
      </Content>
    </Container>
  );
}
