import React from 'react';
import {SafeAreaView, StyleSheet, View, Image} from 'react-native';
import {useTheme} from 'react-native-paper';
import {RNCamera} from 'react-native-camera';
import {Dimensions} from 'react-native';

const RecieptScanner: React.FC = () => {
  const {colors} = useTheme();
  const styles = classes(colors);
  return (
    <SafeAreaView style={{flex: 1}}>
      <RNCamera
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        captureAudio={false}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        <View style={styles.focusSquare}></View>
      </RNCamera>
    </SafeAreaView>
  );
};

function classes(colors: any) {
  return StyleSheet.create({
    focusSquare: {
      backgroundColor: 'transparent',
      borderWidth: 0.5,
      borderColor: colors.primary,
      borderRadius: 8,
      width: Dimensions.get('window').width * 0.65,
      height: Dimensions.get('window').width * 0.65,
    },
  });
}

export default RecieptScanner;
