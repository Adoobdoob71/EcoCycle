import React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {useTheme} from 'react-native-paper';
import {StyleProperty} from '../utils/Types';
import {Row, Column} from './index';

interface SurfaceProps {
  direction: 'row' | 'column';
  style?: StyleProperty;
}

const Surface: React.FC<SurfaceProps> = ({style, direction, children}) => {
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    background: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 12,
    },
  });
  return direction === 'row' ? (
    <Row style={[styles.background, style]}>{children}</Row>
  ) : (
    <Column style={[styles.background, style]}>{children}</Column>
  );
};

export default Surface;
