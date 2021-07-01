import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {StyleProperty} from '../utils/Types';

interface RowProps {
  style?: StyleProperty;
}

const Row: React.FC<RowProps> = ({style, children}) => {
  return <View style={[style, {flexDirection: 'row'}]}>{children}</View>;
};

export default Row;
