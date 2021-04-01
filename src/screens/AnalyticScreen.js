import React from 'react';
import {
  // View,
  Text
} from 'react-native';

import {
  Body,
  Charts
} from '../components';

function AnalyticScreen() {
  const data = [
    {
      'credit': 47,
      'debit': 20
    },
    {
      'credit': 0,
      'debit': 10
    },
    {
      'credit': 20,
      'debit': 20
    },
    {
      'credit': 30,
      'debit': 10
    },
    {
      'credit': 90,
      'debit': 40
    }
  ];
  return (
    <Body>
      <Text>analytics</Text>
      <Charts
        data={data}
        lastDay={31}
      />
    </Body>
  );
}

export default AnalyticScreen;
