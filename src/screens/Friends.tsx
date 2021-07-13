import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {Header, IconButton, Friend} from '../components';
import {useNavigation} from '@react-navigation/native';
import {UserData} from '../utils/Types';
import {watermelonDatabase} from '../..';
import firebase from 'firebase/app';

const Friends: React.FC = () => {
  const [friends, setFriends] = React.useState<UserData[]>([]);
  const [loading, setLoading] = React.useState(true);

  const {colors} = useTheme();
  const styles = classes(colors);

  const navigation = useNavigation<any>();
  const openDrawer = () => navigation.openDrawer();

  const readData = async () => {
    setLoading(true);
    setFriends([]);
    const data = watermelonDatabase.get('friends');
    const friendsList = await data.query().fetch();
    await Promise.all(
      friendsList.map(async (item: any) => {
        const friendData = await firebase
          .database()
          .ref(`users/${item.friendId}`)
          .get();
        setFriends(friends => [...friends, friendData.val()]);
      }),
    );
    setLoading(false);
  };

  const goToSearch = () => navigation.navigate('SearchScreen');

  React.useEffect(() => {
    readData();
  }, []);

  return (
    <SafeAreaView style={styles.background}>
      <FlatList
        data={friends}
        renderItem={({item}) => (
          <Friend
            {...item}
            onPress={() => navigation.navigate('ProfileScreen', {id: item.id})}
          />
        )}
        ListHeaderComponent={() => (
          <Header
            left={<IconButton icon="menu" onPress={openDrawer} borderless />}
            title="Friends"
            right={
              <IconButton icon="magnify" onPress={goToSearch} borderless />
            }
            backgroundStyle={{marginBottom: 8}}
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
        style={{flex: 1}}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
      />
    </SafeAreaView>
  );
};

function classes(colors: any) {
  return StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: colors.background,
    },
  });
}
export default Friends;
