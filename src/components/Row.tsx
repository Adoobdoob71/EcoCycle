import React from 'react';
import {View} from 'react-native';
import {StyleProperty} from '../utils/Types';

interface RowProps {
  style?: StyleProperty;
}

const Row: React.FC<RowProps> = ({style, children}) => {
  return <View style={[{flexDirection: 'row'}, style]}>{children}</View>;
};

export default Row;
