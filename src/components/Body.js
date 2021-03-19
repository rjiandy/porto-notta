import React from 'react';
import { ScrollView } from 'react-native';

import colors from '../themes/colors';

export default function Body({ children, contentContainerStyle, ...otherProps }) {
  return (
    <ScrollView
      contentContainerStyle={[
        { backgroundColor: colors.bodyWhite, flex: 1 },
        contentContainerStyle
      ]}
      {...otherProps}
    >
      {children}
    </ScrollView>
  );
}
