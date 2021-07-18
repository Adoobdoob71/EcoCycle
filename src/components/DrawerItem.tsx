import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {StyleProperty} from '../utils/Types';
import {RippleButton} from './';

interface DrawerItemProps {
  text: string;
  whereTo: string;
  outerStyle?: StyleProperty;
  currentIndex: number;
  index: number;
  params?: Object;
}

const DrawerItem: React.FC<DrawerItemProps> = props => {
  const navigation = useNavigation();
  const navigate = () => navigation.navigate(props.whereTo, props.params);
  const {colors} = useTheme();
  const styles = classes(colors, props);

  return (
    <RippleButton
      onPress={navigate}
      outerStyle={props.outerStyle}
      borderRadius={12}
      rippleColor={
        props.currentIndex === props.index ? colors.primary : colors.placeholder
      }>
      <View style={styles.background}>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </RippleButton>
  );
};

function classes(
  colors: ReactNativePaper.ThemeColors,
  props: React.PropsWithChildren<DrawerItemProps>,
) {
  return StyleSheet.create({
    background: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderWidth: 2,
      borderColor:
        props.currentIndex === props.index
          ? colors.primary
          : colors.placeholder,
      borderRadius: 12,
    },
    text: {
      fontSize: 18,
      color: colors.text,
    },
  });
}

export default DrawerItem;
