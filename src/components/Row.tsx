import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

interface RowProps {
  style?: StyleProp<ViewStyle>;
}

const Row: React.FC<RowProps> = ({style, children}) => {
  return <View style={style}>{children}</View>;
};

export default Row;
