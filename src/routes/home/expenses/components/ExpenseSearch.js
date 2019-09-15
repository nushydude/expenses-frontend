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
import { MdRefresh, MdSearch } from 'react-icons/md';

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

const Input = styled.input`
  font: 12px roboto, sans-serif;
  padding; 4px;
  padding-left: 2px;
  margin: 0;
  margin-left: 8px;
  width: 100%;
  box-sizing: border-box;
`;

const Select = styled.select`
  font: 12px roboto, sans-serif;
  padding; 4px;
  padding-left: 2px;
  margin: 0;
  margin-left: 8px;
  width: 100%;
  box-sizing: border-box;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 16px;
  margin-bottom: 4px;
  white-space: nowrap;

  :last-child {
    margin-right: 0;
  }
`;

const Label = styled.label`
  font: 12px roboto, sans-serif;
  margin: 0;
`;

const Button = styled.button`
  margin-right: 4px;
  padding: 4px 8px;
  font: 12px roboto, sans-serif;
  margin-right: 8px;
  margin-bottom: 4px;

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

type Props = {
  from: string,
  loading: boolean,
  reset: () => void,
  to: string,
  updateOptions: (options: SearchOptions) => void,
};

const PRESETS = {
  LAST_MONTH: 'LAST_MONTH',
  LAST_YEAR: 'LAST_YEAR',
  THIS_MONTH: 'THIS_MONTH',
  THIS_YEAR: 'THIS_YEAR',
};

const DATE_FORMAT_FOR_INPUT = 'yyyy-MM-dd';

export function ExpenseSearch(props: Props) {
  const [from, setFrom] = React.useState(props.from);
  const [to, setTo] = React.useState(props.to);

  const createSearchOptions = () => {
    const searchOptions: SearchOptions = {};

    if (from) {
      searchOptions.from = new Date(from).toISOString();
    }

    if (to) {
      searchOptions.to = new Date(to).toISOString();
    }

    return searchOptions;
  };

  const setMonth = (offset: num) => {
    const now = addMonths(new Date(), offset);
    const from = format(startOfMonth(now), DATE_FORMAT_FOR_INPUT);
    const to = format(
      addMilliseconds(addMonths(startOfMonth(now), 1), -1),
      DATE_FORMAT_FOR_INPUT,
    );

    setFrom(from);
    setTo(to);
  };

  const setYear = (offset: num) => {
    const now = addYears(new Date(), offset);

    const from = format(startOfYear(now), DATE_FORMAT_FOR_INPUT);
    const to = format(
      addMilliseconds(addYears(startOfYear(now), 1), -1),
      DATE_FORMAT_FOR_INPUT,
    );

    setFrom(from);
    setTo(to);
  };

  const search = () => props.updateOptions(createSearchOptions());

  const setPresetDateRange = (preset: string) => {
    if (preset === PRESETS.THIS_MONTH) {
      setMonth(0);
    } else if (preset === PRESETS.LAST_MONTH) {
      setMonth(-1);
    } else if (preset === PRESETS.THIS_YEAR) {
      setYear(0);
    } else if (preset === PRESETS.LAST_YEAR) {
      setYear(-1);
    }
  };

  return (
    <Container>
      <PeriodContainer>
        <FormField>
          <Label>From</Label>
          <Input
            type="date"
            value={from}
            onChange={e => setFrom(e.target.value)}
          />
        </FormField>

        <FormField>
          <Label>To</Label>
          <Input type="date" value={to} onChange={e => setTo(e.target.value)} />
        </FormField>
        <FormField>
          <Label>Date Range</Label>
          <Select onChange={e => setPresetDateRange(e.target.value)}>
            <option value={PRESETS.THIS_MONTH}>This Month</option>
            <option value={PRESETS.LAST_MONTH}>Last Month</option>
            <option value={PRESETS.THIS_YEAR}>This Year</option>
            <option value={PRESETS.LAST_YEAR}>Last Year</option>
          </Select>
        </FormField>
      </PeriodContainer>

      <div>
        <Button
          disabled={props.loading || to === '' || from === ''}
          onClick={search}
        >
          <MdSearch size={12} />
        </Button>
        <Button disabled={props.loading} onClick={props.reset}>
          <MdRefresh size={12} />
        </Button>
      </div>
    </Container>
  );
}
