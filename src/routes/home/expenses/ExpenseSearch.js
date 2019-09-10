// @flow
import * as React from 'react';
import styled from 'styled-components';
import {
  format,
  startOfMonth,
  startOfYear,
  addMilliseconds,
  addMonths,
  addYears,
} from 'date-fns';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
`;

const PeriodContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const SpecificPeriodContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 20px;
`;

const PresetsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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
  margin-right: 10px;

  :last-child {
    margin-right: 0;
  }
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
  margin-right: 10px;

  :last-child {
    margin-right: 0;
  }
`;

export type SearchOptions = {
  from?: string,
  to?: string,
  paymentMethods?: Array<string>,
  types?: Array<string>,
  recordsPerPage?: number,
};

type State = {
  from: ?string,
  to: ?string,
  paymentMethods: ?Array<string>,
  types: ?Array<string>,
};

type Props = {
  updateOptions: (options: SearchOptions) => void,
  loading: boolean,
  to: string,
  from: string,
};

export class ExpenseSearch extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      to: props.to,
      from: props.from,
      paymentMethods: [],
      types: [],
    };
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

  setMonth = (offset: num) => () => {
    const now = addMonths(new Date(), offset);

    const from = format(startOfMonth(now), 'yyyy-MM-dd');
    const to = format(
      addMilliseconds(addMonths(startOfMonth(now), 1), -1),
      'yyyy-MM-dd',
    );

    this.setState({ from, to });
  };

  setYear = (offset: num) => () => {
    const now = addYears(new Date(), offset);

    const from = format(startOfYear(now), 'yyyy-MM-dd');
    const to = format(
      addMilliseconds(addYears(startOfYear(now), 1), -1),
      'yyyy-MM-dd',
    );

    this.setState({ from, to });
  };

  render() {
    console.log('state:', this.state);

    const { from, to } = this.state;
    const { loading, updateOptions } = this.props;

    return (
      <Container>
        <PeriodContainer>
          <SpecificPeriodContainer>
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
          </SpecificPeriodContainer>

          <PresetsContainer>
            <Button onClick={this.setMonth(0)}>This Month</Button>
            <Button onClick={this.setMonth(-1)}>Last Month</Button>
            <Button onClick={this.setYear(0)}>This Year</Button>
            <Button onClick={this.setYear(-1)}>Last Year</Button>
          </PresetsContainer>
        </PeriodContainer>

        <div>
          <Button
            disabled={loading || to === '' || from === ''}
            onClick={() => updateOptions(this.createSearchOptions())}
          >
            Search
          </Button>
          <Button
            disabled={loading}
            onClick={() => {
              this.setState(
                {
                  to: this.props.to,
                  from: this.to.from,
                  paymentMethods: [],
                  types: [],
                },
                () => {
                  updateOptions(this.createSearchOptions());
                },
              );
            }}
          >
            Clear
          </Button>
        </div>
      </Container>
    );
  }
}
