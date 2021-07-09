import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {StyleProperty} from '../utils/Types';
import {
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {convertOpacityToHex} from '../utils/usefulFunctions';
import {useTheme} from 'react-native-paper';

interface RippleButtonProps {
  outerStyle?: StyleProperty;
  innerStyle?: StyleProperty;
  borderRadius?: number;
  onPress: () => void;
  rippleColor?: string;
}

const RippleButton: React.FC<RippleButtonProps> = props => {
  const {colors} = useTheme();
  const styles = classes(colors);
  return Platform.OS === 'android' ? (
    <View
      style={[
        props.outerStyle,
        {
          overflow: 'hidden',
          borderRadius: props.borderRadius ? props.borderRadius : 0,
        },
      ]}>
      <TouchableNativeFeedback
        onPress={props.onPress}
        background={TouchableNativeFeedback.Ripple(
          `${
            props.rippleColor ? props.rippleColor : colors.placeholder
          }${convertOpacityToHex(0.4)}`,
          true,
        )}>
        <View style={[props.innerStyle, styles.background]}>
          {props.children}
        </View>
      </TouchableNativeFeedback>
    </View>
  ) : (
    <TouchableOpacity onPress={props.onPress} style={props.outerStyle}>
      <View style={[props.innerStyle, styles.background]}>
        {props.children}
      </View>
    </TouchableOpacity>
  );
};

function classes(colors: any) {
  return StyleSheet.create({
    background: {},
  });
}

export default RippleButton;
