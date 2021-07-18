import React from 'react';
import {Text, View, StyleSheet, StyleProp, TextStyle} from 'react-native';
import {useTheme} from 'react-native-paper';
import {StyleProperty} from '../utils/Types';

interface TopProps {
  style?: StyleProperty;
  textStyle?: StyleProp<TextStyle>;
  right?: JSX.Element;
}

const Top: React.FC<TopProps> = props => {
  const {colors} = useTheme();
  const styles = classes(colors);
  return (
    <>
      <View style={[styles.topView, props.style]}>
        <Text style={[styles.topText, props.textStyle]} numberOfLines={1}>
          {props.children}
        </Text>
        {props.right}
      </View>
      <View style={styles.topBorder}></View>
    </>
  );
};

function classes(colors: ReactNativePaper.ThemeColors) {
  return StyleSheet.create({
    topView: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 8,
    },
    topText: {
      flex: 1,
      fontSize: 15,
      color: colors.text,
      fontWeight: 'bold',
    },
    topBorder: {
      backgroundColor: colors.primary,
      alignSelf: 'stretch',
      borderRadius: 4,
      marginBottom: 12,
      marginHorizontal: 6,
      height: 2,
    },
  });
}

export default Top;
