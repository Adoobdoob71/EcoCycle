import React from 'react';
import {View, Text, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTheme} from 'react-native-paper';

interface ButtonProps {
  text: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  innerStyle?: StyleProp<ViewStyle>;
  loading?: boolean;
  disabled?: boolean;
  size?: 'extra-large' | 'large' | 'medium' | 'small' | 'extra-small';
}

const Button: React.FC<ButtonProps> = props => {
  const {colors} = useTheme();
  const styles = classes(colors, props);
  return (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <View style={props.innerStyle}>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

function classes(colors: any, props: ButtonProps) {
  return StyleSheet.create({
    background: {
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      borderRadius: 10,
    },
    text: {
      color: colors.onPrimaryColor,
      fontWeight: 'bold',
    },
  });
}

export default Button;