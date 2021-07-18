import React from 'react';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useTheme} from 'react-native-paper';
import {UserData} from '../utils/Types';
import {Header, IconButton, User} from '../components';
import {useNavigation} from '@react-navigation/native';
import firebase from 'firebase/app';
import {AuthContext} from '../utils/Auth';

const Search: React.FC = () => {
  const [users, setUsers] = React.useState<UserData[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const {colors} = useTheme();
  const navigation = useNavigation();

  const styles = classes(colors);

  const {userInfo} = React.useContext(AuthContext);

  const addFriend = async (friend: UserData) => {
    try {
      if (userInfo?.user.id) {
        setLoading(true);
        const friends = firebase
          .database()
          .ref('users')
          .child(userInfo?.user.id)
          .child('friends');
        await friends.child(friend.id).set({friend_id: friend.id});
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const goBack = () => navigation.goBack();
  const onChangeText = (value: string) => {
    setSearchQuery(value);
    searchUsers(value);
  };
  const clearQuery = () => setSearchQuery('');

  const searchUsers = async (value: string) => {
    setUsers([]);
    const data = await firebase
      .database()
      .ref('users')
      .orderByChild('name')
      .startAt(value)
      .endAt(value + '\uf8ff')
      .get();
    data.forEach(item => setUsers(users => [...users, item.val()]));
  };

  const listHeaderComponent = () => (
    <Header
      left={<IconButton icon="arrow-left" onPress={goBack} borderless />}
      center={
        <View style={styles.searchBar}>
          <TextInput
            value={searchQuery}
            onChangeText={onChangeText}
            multiline={false}
            placeholder="Search people"
            placeholderTextColor={colors.placeholder}
            numberOfLines={1}
            style={styles.textInput}
          />
          <IconButton
            icon="close"
            size={14}
            onPress={clearQuery}
            disabled={loading}
            borderless
          />
        </View>
      }
    />
  );

  return (
    <SafeAreaView style={styles.background}>
      <FlatList
        data={users}
        renderItem={({item}) => (
          <User
            {...item}
            onPress={() => addFriend(item)}
            outerStyle={{marginBottom: 8}}
            disabled={userInfo?.user.id === item.id}
          />
        )}
        ListHeaderComponent={listHeaderComponent()}
        stickyHeaderIndices={[0]}
        style={{flex: 1}}
        bounces={false}
        showsVerticalScrollIndicator={false}
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
    searchBar: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background,
      borderRadius: 8,
      paddingHorizontal: 4,
      marginHorizontal: 8,
      height: 42,
    },
    textInput: {
      flex: 1,
      color: colors.text,
      fontSize: 14,
      marginHorizontal: 8,
    },
  });
}

export default Search;
