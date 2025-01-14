import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useTheme} from 'react-native-paper';
import {StyleProperty} from '../utils/Types';

interface HeaderProps {
  left?: JSX.Element;
  right?: JSX.Element;
  center?: JSX.Element;
  title?: string;
  subtitle?: string;
  backgroundStyle?: StyleProperty;
}

const Header: React.FC<HeaderProps> = props => {
  const {colors} = useTheme();
  const styles = classes(colors);

  return (
    <View style={[styles.headerBackground, props.backgroundStyle]}>
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
          {props.subtitle && (
            <Text
              style={styles.headerSubtitle}
              numberOfLines={1}
              ellipsizeMode="tail">
              {props.subtitle}
            </Text>
          )}
        </View>
      )}
      {props.right}
    </View>
  );
};

function classes(colors: ReactNativePaper.ThemeColors) {
  return StyleSheet.create({
    headerBackground: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 8,
      backgroundColor: colors.surface,
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
