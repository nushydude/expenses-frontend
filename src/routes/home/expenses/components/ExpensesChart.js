// @flow
import * as React from 'react';
import styled from 'styled-components';
import { CategoryPieChart } from './charts/CategoryPieChart';

type Props = {
  expenses: Array<{
    amount: number,
    date: string,
    id: string,
    source: string,
    category: string,
  }>,
};

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TYPES = {
  CATEGORY_PIE_CHART: 0,
};

export function ExpensesChart({ expenses }: Props) {
  // const [type, setType] = React.useState(TYPES.CATEGORY_PIE_CHART);
  const type = TYPES.CATEGORY_PIE_CHART;

  return (
    <ChartContainer>
      {type === TYPES.CATEGORY_PIE_CHART && (
        <CategoryPieChart expenses={expenses} height={400} />
      )}
    </ChartContainer>
  );

  // return (
  //   <BarChart width={730} height={250} data={expenses}>
  //     <CartesianGrid strokeDasharray="3 3" />
  //     <XAxis dataKey="type" />
  //     <YAxis />
  //     <Tooltip />
  //     <Legend />
  //     <Bar dataKey="amount" fill="#8884d8" />
  //   </BarChart>
  // );
}
