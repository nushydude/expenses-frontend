// @flow
import * as React from 'react';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import styled from 'styled-components';

const CustomToolTipContainer = styled.div`
  padding: 8px;
  background: #444;
  border-radius: 4px;
  color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const COLORS = ['#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600'];

type Props = {
  expenses: Array<any>,
  height: number | string,
};

export function CategoryPieChart({ expenses, height, width }: Props) {
  const dataObj = expenses.reduce((accum, expense) => {
    // eslint-disable-next-line no-param-reassign
    accum[expense.type] = (accum[expense.type] || 0) + expense.amount;

    return accum;
  }, {});

  const data = Object.keys(dataObj).map(key => ({
    key,
    value: dataObj[key],
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active) {
      const [payloadEntry] = payload;
      const expense = Number.parseFloat(
        payloadEntry[payloadEntry.dataKey],
      ).toFixed(2);

      return <CustomToolTipContainer>{`$${expense}`}</CustomToolTipContainer>;
    }

    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="key"
          cx="50%"
          cy="50%"
          innerRadius="50%"
          outerRadius="100%"
        >
          {data.map((entry, index) => (
            <Cell
              // eslint-disable-next-line react/no-array-index-key
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
