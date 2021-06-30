import React from 'react';
import {StyleProp, View, ViewStyle, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTheme} from 'react-native-paper';

interface CardProps {
  outerStyle?: StyleProp<ViewStyle>;
  innerStyle?: StyleProp<ViewStyle>;
  onPress: () => void;
}

const Card: React.FC<CardProps> = props => {
  const {colors} = useTheme();
  const styles = classes(colors);

  return (
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
