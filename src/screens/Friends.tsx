import React from 'react';
import {SafeAreaView, StyleSheet, RefreshControl} from 'react-native';
import {Appbar, useTheme} from 'react-native-paper';
import {FlatList} from 'react-native-gesture-handler';
import {Header, IconButton, Friend} from '../components';
import {useNavigation} from '@react-navigation/native';
import {UserData} from '../utils/Types';
import {useAuth} from '../hooks/useAuth';
import firestore from '@react-native-firebase/firestore';
import {useUserData} from '../hooks/useUserData';

const Friends: React.FC = () => {
  const [friends, setFriends] = React.useState<UserData[]>([]);
  const [loading, setLoading] = React.useState(true);

  const {colors} = useTheme();
  const {currentUser} = useAuth();
  const styles = classes(colors);

  const navigation = useNavigation<any>();
  const openDrawer = () => navigation.openDrawer();

  const readData = async () => {
    setLoading(true);
    try {
      setFriends([]);
      if (currentUser) {
        const data = await firestore()
          .collection('users')
          .doc(currentUser.uid)
          .collection('friends')
          .get();
        data.docs.forEach(item => {
          const {loadData, userData, error} = useUserData(item.id);
          if (error) throw error;
          loadData().then(() => {
            if (userData) setFriends(friends => [...friends, userData]);
          });
        });
      }
    } catch (error) {
      console.error(error);
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
            left={
              <Appbar.Action
                icon="menu"
                onPress={openDrawer}
                color={colors.text}
              />
            }
            title="Friends"
            right={
              <Appbar.Action
                icon="magnify"
                onPress={goToSearch}
                color={colors.text}
              />
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
