import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTheme} from 'react-native-paper';
import {StyleProperty} from '../utils/Types';

interface ButtonProps {
  text: string;
  onPress?: () => void;
  style?: StyleProperty;
  innerStyle?: StyleProperty;
  loading?: boolean;
  disabled?: boolean;
  size?: 'extra-large' | 'large' | 'medium' | 'small' | 'extra-small';
}

const Button: React.FC<ButtonProps> = props => {
  const {colors} = useTheme();
  const styles = classes(colors);
  return (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <View style={props.innerStyle}>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

function classes(colors: ReactNativePaper.ThemeColors) {
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
