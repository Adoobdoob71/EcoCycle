import React from 'react';
import {View} from 'react-native';
import {StyleProperty} from '../utils/Types';

interface ColumnProps {
  style?: StyleProperty;
}

const Column: React.FC<ColumnProps> = ({style, children}) => {
  return <View style={style}>{children}</View>;
};

export default Column;
