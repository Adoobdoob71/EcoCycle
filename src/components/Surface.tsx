import React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {Row, Column} from './index';

interface SurfaceProps {
  direction: 'row' | 'column';
  style?: StyleProp<ViewStyle>;
}

const Surface: React.FC<SurfaceProps> = ({style, direction, children}) => {
  const styles = StyleSheet.create({
    background: {},
  });
  return direction === 'row' ? (
    <Row style={[styles.background, style]}>{children}</Row>
  ) : (
    <Column style={[styles.background, style]}>{children}</Column>
  );
};

export default Surface;
