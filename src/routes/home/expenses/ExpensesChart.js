// @flow
import * as React from 'react';
import styled from 'styled-components';
import { ROUTE } from '../../../configs/route';
import { formatDateForTables } from '../../../utils/formatDateForTables';
import { Link } from '../../../components/Link';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
} from 'recharts';

type Props = {
  expenses: Array<{
    amount: number,
    date: string,
    id: string,
    paymentMethod: string,
    type: string,
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

const COLORS = ['#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600'];

export function ExpensesChart({ expenses }: Props) {
  const defaultDataObj = expenses.reduce((accum, expense) => {
    accum[expense.type] = (accum[expense.type] | 0) + expense.amount;

    return accum;
  }, {});

  const defaultData = Object.keys(defaultDataObj).map(key => ({
    key,
    value: defaultDataObj[key],
  }));

  const [type, setType] = React.useState(TYPES.CATEGORY_PIE_CHART);
  const [data, setData] = React.useState(defaultData);

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height={500}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="key"
            cx="50%"
            cy="50%"
            outerRadius={200}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
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
