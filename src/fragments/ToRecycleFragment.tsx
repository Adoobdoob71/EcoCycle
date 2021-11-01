import React from 'react';
import {StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {ScanItem} from '../components';
import {RecyclingDataType} from '../utils/Types';
import firebase from 'firebase/app';
import {FlatList} from 'react-native-gesture-handler';
import {useAuth} from '../hooks/useAuth';

const ToRecycleFragment: React.FC = () => {
  const [toRecycleScans, setToRecycleScans] = React.useState<
    RecyclingDataType[]
  >([]);
  const [loading, setLoading] = React.useState(false);

  const {colors} = useTheme();
  const {currentUser} = useAuth();

  React.useEffect(() => {
    readData();
  }, []);

  const readData = async () => {
    try {
      // setLoading(true);
      // if (userInfo?.user.id) {
      //   const toRecycle = await firebase
      //     .database()
      //     .ref('users')
      //     .child(userInfo?.user.id)
      //     .child('recycling')
      //     .child('to_recycle')
      //     .limitToLast(10)
      //     .get();
      //   toRecycle.forEach(item =>
      //     setToRecycleScans(items => [...items, item.val()]),
      //   );
      // }
      // setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FlatList
      data={toRecycleScans}
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

export default ToRecycleFragment;
