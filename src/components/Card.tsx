import React from 'react';
import {
  StyleProp,
  View,
  ViewStyle,
  StyleSheet,
  Platform,
  TouchableNativeFeedback,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTheme} from 'react-native-paper';
import {StyleProperty} from '../utils/Types';
import {convertOpacityToHex} from '../utils/usefulFunctions';

interface CardProps {
  outerStyle?: StyleProperty;
  innerStyle?: StyleProperty;
  onPress: () => void;
}

const Card: React.FC<CardProps> = props => {
  const {colors} = useTheme();
  const styles = classes(colors);

  return Platform.OS === 'android' ? (
    <View style={[props.outerStyle, {overflow: 'hidden', borderRadius: 10}]}>
      <TouchableNativeFeedback
        onPress={props.onPress}
        background={TouchableNativeFeedback.Ripple(
          `${colors.placeholder}${convertOpacityToHex(0.4)}`,
          true,
        )}>
        <View style={[styles.backgroundStyle, props.innerStyle]}>
          {props.children}
        </View>
      </TouchableNativeFeedback>
    </View>
  ) : (
    <TouchableOpacity onPress={props.onPress} style={props.outerStyle}>
      <View style={[styles.backgroundStyle, props.innerStyle]}>
        {props.children}
      </View>
    </TouchableOpacity>
  );
};

function classes(colors: any) {
  return StyleSheet.create({
    backgroundStyle: {
      backgroundColor: colors.surface,
      borderRadius: 10,
    },
  });
}

export default Card;
