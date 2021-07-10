import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler';
import {useTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleProperty} from '../utils/Types';
import {convertOpacityToHex} from '../utils/usefulFunctions';

interface IconButtonProps {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  size?: number;
  color?: string;
  style?: StyleProperty;
  innerStyle?: StyleProperty;
  onPress: () => void;
  borderless?: boolean;
}

const IconButton: React.FC<IconButtonProps> = props => {
  const {colors} = useTheme();
  const styles = classes(colors, props);
  return props.borderless ? (
    <View
      style={[
        props.style,
        {overflow: 'hidden', borderRadius: props.size ? props.size : 18},
      ]}>
      <TouchableNativeFeedback
        onPress={props.onPress}
        background={TouchableNativeFeedback.Ripple(
          `${colors.placeholder}${convertOpacityToHex(0.4)}`,
          true,
        )}>
        <View style={[props.innerStyle, styles.background]}>
          <MaterialCommunityIcons
            name={props.icon}
            color={props.color ? props.color : colors.text}
            size={props.size ? props.size : 18}
          />
        </View>
      </TouchableNativeFeedback>
    </View>
  ) : (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <View style={[props.innerStyle, styles.background]}>
        <MaterialCommunityIcons
          name={props.icon}
          color={props.color ? props.color : colors.text}
          size={props.size ? props.size : 18}
        />
      </View>
    </TouchableOpacity>
  );
};

function classes(colors: any, props: React.PropsWithChildren<IconButtonProps>) {
  return StyleSheet.create({
    background: {
      backgroundColor: props.borderless ? 'transparent' : colors.surface,
      borderRadius: 8,
      borderWidth: props.borderless ? 0 : 1,
      padding: props.borderless ? 10 : 6,
      borderColor: colors.primary,
    },
  });
}

export default IconButton;
