import React from 'react';
import {View, StyleSheet} from 'react-native';
import {StyleProperty} from '../utils/Types';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import {convertOpacityToHex} from '../utils/usefulFunctions';
import {useTheme} from 'react-native-paper';

interface RippleButtonProps {
  outerStyle?: StyleProperty;
  innerStyle?: StyleProperty;
  borderRadius?: number;
  onPress: () => void;
}

const RippleButton: React.FC<RippleButtonProps> = props => {
  const {colors} = useTheme();
  const styles = classes(colors);
  return (
    <View
      style={[
        props.outerStyle,
        {
          overflow: 'hidden',
          borderRadius: props.borderRadius ? props.borderRadius : 18,
        },
      ]}>
      <TouchableNativeFeedback
        onPress={props.onPress}
        background={TouchableNativeFeedback.Ripple(
          `${colors.placeholder}${convertOpacityToHex(0.4)}`,
          true,
        )}>
        <View style={[props.innerStyle, styles.background]}>
          {props.children}
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

function classes(colors: any) {
  return StyleSheet.create({
    background: {},
  });
}

export default RippleButton;
