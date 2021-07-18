import React from 'react';
import {SafeAreaView, StyleSheet, RefreshControl} from 'react-native';
import {useTheme} from 'react-native-paper';
import {FlatList} from 'react-native-gesture-handler';
import {Header, IconButton, Friend} from '../components';
import {useNavigation} from '@react-navigation/native';
import {UserData} from '../utils/Types';
import firebase from 'firebase/app';
import {AuthContext} from '../utils/Auth';

const Friends: React.FC = () => {
  const [friends, setFriends] = React.useState<UserData[]>([]);
  const [loading, setLoading] = React.useState(true);

  const {colors} = useTheme();
  const {userInfo} = React.useContext(AuthContext);
  const styles = classes(colors);

  const navigation = useNavigation<any>();
  const openDrawer = () => navigation.openDrawer();

  const readData = async () => {
    setLoading(true);
    setFriends([]);
    if (userInfo?.user.id) {
      const data = await firebase
        .database()
        .ref('users')
        .child(userInfo?.user.id)
        .child('friends')
        .get();
      data.forEach(item => {
        firebase
          .database()
          .ref('users')
          .child(item.val().friend_id)
          .once('value', snapshot => {
            setFriends(friends => [...friends, snapshot.val()]);
          });
      });
    }
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

function classes(colors: ReactNativePaper.ThemeColors) {
  return StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: colors.background,
    },
  });
}
export default Friends;
