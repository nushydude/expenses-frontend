// @flow
import * as React from 'react';
import { ResponsivePie } from '@nivo/pie';

type Props = {
  expenses: Array<any>,
};

export function CategoryPieChart({ expenses }: Props) {
  const dataObj = expenses.reduce((accum, expense) => {
    // eslint-disable-next-line no-param-reassign
    accum[expense.category] = (accum[expense.category] || 0) + expense.amount;

    return accum;
  }, {});

  const data = Object.keys(dataObj).map(key => ({
    id: key,
    name: key,
    value: dataObj[key].toFixed(2),
  }));

  return (
    <ResponsivePie
      data={data}
      margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
      colors={{ scheme: 'nivo' }}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
      innerRadius={0.5}
      radialLabelsSkipAngle={10}
      radialLabelsTextXOffset={6}
      radialLabelsTextColor="#333333"
      radialLabelsLinkOffset={0}
      radialLabelsLinkDiagonalLength={16}
      radialLabelsLinkHorizontalLength={24}
      radialLabelsLinkStrokeWidth={1}
      radialLabelsLinkColor={{ from: 'color' }}
      slicesLabelsSkipAngle={10}
      slicesLabelsTextColor="#333333"
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  );
}
