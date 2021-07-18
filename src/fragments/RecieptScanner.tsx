import React from 'react';
import {SafeAreaView, StyleSheet, View, Image} from 'react-native';
import {useTheme} from 'react-native-paper';
import {BarCodeReadEvent, RNCamera} from 'react-native-camera';
import {Dimensions} from 'react-native';
import {RecyclingDataType} from '../utils/Types';
import {AuthContext} from '../utils/Auth';
import {useNavigation} from '@react-navigation/native';
import firebase from 'firebase/app';

const RecieptScanner: React.FC = () => {
  const [scanned, setScanned] = React.useState(false);

  const {colors} = useTheme();
  const styles = classes(colors);

  const {userInfo} = React.useContext(AuthContext);
  const navigation = useNavigation();

  const readBarcode = async (event: BarCodeReadEvent) => {
    if (scanned) return;
    setScanned(true);
    const barCodeData = JSON.parse(event.data);
    await recordData(barCodeData);
    navigation.goBack();
  };

  const recordData = async (barCodeData: RecyclingDataType) => {
    try {
      if (userInfo?.user.id) {
        let data: RecyclingDataType = {
          ...barCodeData,
          created_at: Date.now(),
        };
        await firebase
          .database()
          .ref(`users/${userInfo?.user.id}`)
          .child('recycling')
          .child('to_recycle')
          .push()
          .set(data);
        const updates: any = {};
        updates[
          `users/${userInfo?.user.id}/recycling_brief/bottlesToRecycleAmount`
        ] = firebase.database.ServerValue.increment(data.bottles);
        updates[
          `users/${userInfo?.user.id}/recycling_brief/itemsToRecycleAmount`
        ] = firebase.database.ServerValue.increment(data.all_items);
        await firebase.database().ref().update(updates);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
        }}
        onBarCodeRead={readBarcode}>
        <View style={styles.focusSquare}></View>
      </RNCamera>
    </SafeAreaView>
  );
};

function classes(colors: ReactNativePaper.ThemeColors) {
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
