import React from 'react';
import {RefreshControl, SafeAreaView, StyleSheet, Text} from 'react-native';
import {useTheme} from 'react-native-paper';
import {Header, IconButton, ScanItem} from '../components';
import {RecyclingDataType} from '../utils/Types';
import firebase from 'firebase/app';
import {useNavigation} from '@react-navigation/core';
import {FlatList} from 'react-native-gesture-handler';
import {useAuth} from '../hooks/useAuth';

const AlreadyRecycledFragment: React.FC = () => {
  const [alreadyRecycledScans, setAlreadyRecycledScans] = React.useState<
    RecyclingDataType[]
  >([]);

  const [loading, setLoading] = React.useState(false);

  const {colors} = useTheme();
  const styles = classes(colors);
  const {currentUser} = useAuth();

  const navigation = useNavigation();
  const goBack = () => navigation.goBack();

  React.useEffect(() => {
    readData();
  }, []);

  const readData = async () => {
    try {
      // setLoading(true);
      // if (userInfo?.user.id) {
      //   const alreadyRecycled = await firebase
      //     .database()
      //     .ref('users')
      //     .child(userInfo?.user.id)
      //     .child('recycling')
      //     .child('already_recycled')
      //     .limitToLast(10)
      //     .get();
      //   alreadyRecycled.forEach(item =>
      //     setAlreadyRecycledScans(items => [...items, item.val()]),
      //   );
      // }
      // setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FlatList
      data={alreadyRecycledScans}
      renderItem={({item}) => <ScanItem {...item} outerStyle={{margin: 10}} />}
      showsVerticalScrollIndicator={false}
      bounces={false}
      overScrollMode="never"
    />
  );
};

function classes(colors: ReactNativePaper.ThemeColors) {
  return StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: colors.background,
    },
  });
}

export default AlreadyRecycledFragment;
