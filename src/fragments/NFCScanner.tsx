import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';

const NFCScanner: React.FC = () => {
  const {colors} = useTheme();
  const styles = classes(colors);

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: colors.text}}>NFC</Text>
    </SafeAreaView>
  );
};

function classes(colors: any) {
  return StyleSheet.create({});
}
export default NFCScanner;
