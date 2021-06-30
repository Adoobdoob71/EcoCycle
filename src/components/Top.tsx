import React from 'react';
import {TextStyle, ViewStyle} from 'react-native';
import {Text, View, StyleSheet, StyleProp} from 'react-native';
import {useTheme} from 'react-native-paper';

interface TopProps {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Top: React.FC<TopProps> = props => {
  const {colors} = useTheme();
  const styles = classes(colors);
  return (
    <>
      <View style={[styles.topView, props.style]}>
        <Text style={[styles.topText, props.textStyle]}>{props.children}</Text>
      </View>
      <View style={styles.topBorder}></View>
    </>
  );
};

function classes(colors: any) {
  return StyleSheet.create({
    topView: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 8,
    },
    topText: {
      fontSize: 14,
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
