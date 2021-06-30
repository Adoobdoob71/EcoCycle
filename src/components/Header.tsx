import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {useTheme} from 'react-native-paper';

interface HeaderProps {
  left?: JSX.Element;
  right?: JSX.Element;
  center?: JSX.Element;
  title?: string;
  subtitle?: string;
  backgroundStyle?: StyleProp<ViewStyle>;
}

const Header: React.FC<HeaderProps> = props => {
  const {colors} = useTheme();
  const styles = classes(colors);

  return (
    <SafeAreaView style={[styles.headerBackground, props.backgroundStyle]}>
      {props.left}
      {props.center ? (
        props.center
      ) : (
        <View style={styles.centerView}>
          <Text
            style={styles.headerTitle}
            numberOfLines={1}
            ellipsizeMode="tail">
            {props.title}
          </Text>
          <Text
            style={styles.headerSubtitle}
            numberOfLines={1}
            ellipsizeMode="tail">
            {props.subtitle}
          </Text>
        </View>
      )}
      {props.right}
    </SafeAreaView>
  );
};

function classes(colors: any) {
  return StyleSheet.create({
    headerBackground: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: 10,
      paddingVertical: 6,
    },
    centerView: {
      flex: 1,
      marginStart: 12,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
    },
    headerSubtitle: {
      fontSize: 12,
      color: colors.text,
    },
  });
}

export default Header;
