import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface IconButtonProps {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  innerStyle?: StyleProp<ViewStyle>;
  onPress: () => void;
}

const IconButton: React.FC<IconButtonProps> = props => {
  const {colors} = useTheme();
  const styles = classes(colors, props);
  return (
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

function classes(colors: any, props: IconButtonProps) {
  return StyleSheet.create({
    background: {
      backgroundColor: colors.surface,
      borderRadius: 8,
      borderWidth: 1,
      padding: 6,
      borderColor: colors.primary,
    },
  });
}

export default IconButton;
