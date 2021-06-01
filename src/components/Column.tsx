import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

interface ColumnProps {
  style?: StyleProp<ViewStyle>;
}

const Column: React.FC<ColumnProps> = ({style, children}) => {
  return <View style={style}>{children}</View>;
};

export default Column;
