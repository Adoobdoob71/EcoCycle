import React from 'react';
import {SafeAreaView, StyleSheet, View, Image} from 'react-native';
import {useTheme} from 'react-native-paper';
import {BarCodeReadEvent, RNCamera} from 'react-native-camera';
import {Dimensions} from 'react-native';
import {RecyclingDataType} from '../utils/Types';
import firebase from 'firebase/app';
import {AuthContext} from '../utils/Auth';
import {watermelonDatabase} from '../..';
import {RecycleProgress} from '../utils/model/Models';
import {useNavigation} from '@react-navigation/native';

const RecieptScanner: React.FC = () => {
  const [scanned, setScanned] = React.useState(false);

  const {colors} = useTheme();
  const styles = classes(colors);

  const {userInfo} = React.useContext(AuthContext);
  const navigation = useNavigation();

  const readBarcode = async (event: BarCodeReadEvent) => {
    if (scanned) return;
    const barCodeData = JSON.parse(event.data);
    await recordData(barCodeData);
    navigation.goBack();
  };

  const recordData = async (barCodeData: RecyclingDataType) => {
    try {
      const recyclingData = watermelonDatabase.get('items_recycled');
      await watermelonDatabase.action(async () => {
        const data = await recyclingData.create((item: any) => {
          item._raw.all_items = barCodeData.allItems;
          item._raw.bottles = barCodeData.bottles;
          item._raw.plastic_items = barCodeData.plasticItems;
          item._raw.metallic_items = barCodeData.metallicItems;
          item._raw.paper_items = barCodeData.paperItems;
        });
      });
    } catch (error) {
      console.error(error);
    }
    setScanned(true);
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
