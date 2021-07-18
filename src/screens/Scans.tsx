import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {
  RefreshControl,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {Header, IconButton, ScanItem, Top} from '../components';
import {RecyclingDataType} from '../utils/Types';
import firebase from 'firebase/app';
import {AuthContext} from '../utils/Auth';

const Scans: React.FC = () => {
  const [toRecycleScans, setToRecycleScans] = React.useState<
    RecyclingDataType[]
  >([]);
  const [alreadyRecycledScans, setAlreadyRecycledScans] = React.useState<
    RecyclingDataType[]
  >([]);

  const [loading, setLoading] = React.useState(true);

  const {colors} = useTheme();
  const styles = classes(colors);
  const {userInfo} = React.useContext(AuthContext);

  const navigation = useNavigation();
  const goBack = () => navigation.goBack();

  const onRemovePress = () => {};

  React.useEffect(() => {
    readData();
  }, []);

  const readData = async () => {
    try {
      setLoading(true);
      if (userInfo?.user.id) {
        const toRecycle = await firebase
          .database()
          .ref('users')
          .child(userInfo?.user.id)
          .child('recycling')
          .child('to_recycle')
          .limitToLast(10)
          .get();
        const alreadyRecycled = await firebase
          .database()
          .ref('users')
          .child(userInfo?.user.id)
          .child('recycling')
          .child('already_recycled')
          .limitToLast(10)
          .get();
        toRecycle.forEach(item =>
          setToRecycleScans(items => [...items, item.val()]),
        );
        alreadyRecycled.forEach(item =>
          setAlreadyRecycledScans(items => [...items, item.val()]),
        );
      }
      setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <SectionList
        sections={[
          {
            title: 'Items To Recycle',
            data: toRecycleScans,
            renderItem: ({item}) => (
              <ScanItem
                {...item}
                onRemovePress={onRemovePress}
                outerStyle={{margin: 10}}
              />
            ),
          },
          {
            title: 'Items Already Recycled',
            data: alreadyRecycledScans,
            renderItem: ({item}) => (
              <ScanItem
                {...item}
                onRemovePress={onRemovePress}
                outerStyle={{margin: 10}}
                alreadyRecycled
              />
            ),
          },
        ]}
        stickyHeaderIndices={[0]}
        stickySectionHeadersEnabled
        renderSectionHeader={({section: {title}}) => (
          <Text
            style={{
              color: colors.placeholder,
              fontSize: 14,
              padding: 16,
              fontWeight: 'bold',
              backgroundColor: colors.background,
            }}>
            {title}
          </Text>
        )}
        ListHeaderComponent={() => (
          <Header
            left={<IconButton icon="arrow-left" onPress={goBack} borderless />}
            title="My Scans"
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={readData}
            colors={[colors.primary]}
            progressBackgroundColor={colors.backdrop}
          />
        }
        bounces={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
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

export default Scans;
