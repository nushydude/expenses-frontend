// @flow
import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
`;

const Input = styled.input`
  font: 15px roboto, sans-serif;
  padding; 4px;
  padding-left: 2px;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
`;

const FormField = styled.div`
  display: flex:
  flex-direction: column;
  margin-bottom: 10px;
`;

const Label = styled.label`
  font: 16px roboto, sans-serif;
  margin: 0;
`;

const Button = styled.button`
  margin-right: 4px;
  padding: 4px;
  width: 60px;
  font: 15px roboto, sans-serif;
`;

export type SearchOptions = {
  from?: string,
  to?: string,
  paymentMethods?: Array<string>,
  types?: Array<string>,
};

type State = {
  from: ?string,
  to: ?string,
  paymentMethods: ?Array<string>,
  types: ?Array<string>,
};

type Props = {
  updateOptions: (options: SearchOptions) => void,
};

const initialState = {
  from: '',
  to: '',
  paymentMethods: [],
  types: [],
};

export class ExpenseSearch extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  createSearchOptions = () => {
    const searchOptions: SearchOptions = {};

    const { from, to /* , paymentMethods, types */ } = this.state;

    if (from) {
      searchOptions.from = new Date(from).toISOString();
    }

    if (to) {
      searchOptions.to = new Date(to).toISOString();
    }

    return searchOptions;
  };

  render() {
    const { from, to } = this.state;
    const { updateOptions } = this.props;

    return (
      <Container>
        <FormField>
          <Label>From</Label>
          <Input
            type="date"
            value={from}
            onChange={e => this.setState({ from: e.target.value })}
          />
        </FormField>

        <FormField>
          <Label>To</Label>
          <Input
            type="date"
            value={to}
            onChange={e => this.setState({ to: e.target.value })}
          />
        </FormField>

        <div>
          <Button onClick={() => updateOptions(this.createSearchOptions())}>
            Search
          </Button>
          <Button
            onClick={() => {
              this.setState(initialState, () => {
                updateOptions(this.createSearchOptions());
              });
            }}
          >
            Clear
          </Button>
        </div>
      </Container>
    );
  }
}
