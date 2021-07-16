import React from 'react';
import {SafeAreaView, Text, StyleSheet, Platform} from 'react-native';
import {useTheme} from 'react-native-paper';
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';
import firebase from 'firebase/app';
import {AuthContext} from '../utils/Auth';
import {useNavigation} from '@react-navigation/native';
import {RecyclingDataType} from '../utils/Types';

const NFCScanner: React.FC = () => {
  const {colors} = useTheme();
  const styles = classes(colors);
  const [readyForScans, setReadyForScans] = React.useState(false);
  const [scanned, setScanned] = React.useState(false);

  const {userInfo} = React.useContext(AuthContext);
  const navigation = useNavigation();

  const initNfc = async () => {
    await NfcManager.start();
  };

  const readNdef = () => {
    const cleanUp = () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.setEventListener(NfcEvents.SessionClosed, null);
    };

    return new Promise<void>(resolve => {
      let tagFound: any = null;

      NfcManager.setEventListener(NfcEvents.DiscoverTag, async (tag: any) => {
        tagFound = tag;
        resolve(tagFound);
        Platform.OS === 'ios' &&
          NfcManager.setAlertMessageIOS('NDEF tag found');
        NfcManager.unregisterTagEvent().catch(() => 0);
        if (scanned) return;
        await recordData();
        navigation.navigate('Home', {guide: false});
      });

      NfcManager.setEventListener(NfcEvents.SessionClosed, () => {
        cleanUp();
        if (!tagFound) {
          resolve();
        }
      });

      NfcManager.registerTagEvent();
    });
  };

  const recordData = async () => {
    try {
      const bottlesNumber = Math.round(Math.random() * 10);
      const data: RecyclingDataType = {
        all_items: 8 + bottlesNumber,
        bottles: bottlesNumber,
        plastic_items: 5,
        metallic_items: 0,
        paper_items: 3,
        created_at: Date.now(),
      };
      await firebase
        .database()
        .ref(`users/${userInfo?.user.id}`)
        .child('recycling')
        .child('already_recycled')
        .push()
        .set(data);
      const updates: any = {};
      updates[
        `users/${userInfo?.user.id}/recycling_brief/bottlesRecycledAmount`
      ] = firebase.database.ServerValue.increment(data.bottles);
      updates[
        `users/${userInfo?.user.id}/recycling_brief/itemsRecycledAmount`
      ] = firebase.database.ServerValue.increment(data.all_items);
      await firebase.database().ref().update(updates);
      setScanned(true);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    initNfc().then(async () => {
      const data = await readNdef();
      console.log(data);
    });
  }, []);

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
