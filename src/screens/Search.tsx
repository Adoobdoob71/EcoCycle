import React from 'react';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Appbar, useTheme} from 'react-native-paper';
import {Header, IconButton, User} from '../components';
import {useNavigation} from '@react-navigation/native';
import {Snackbar} from 'react-native-paper';
import {useAuth} from '../hooks/useAuth';
import {useSearch} from '../hooks/useSearch';
import firestore from '@react-native-firebase/firestore';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] =
    React.useState<string | null>(null);

  const {colors} = useTheme();
  const navigation = useNavigation();

  const styles = classes(colors);

  const {currentUser} = useAuth();
  const {searchUsers, users} = useSearch();

  const addFriend = async (friend: FirebaseAuthTypes.User) => {
    try {
      if (currentUser) {
        setLoading(true);
        const friends = firestore()
          .collection('users')
          .doc(currentUser.uid)
          .collection('friends');
        await friends.doc(friend.uid).set({friend_uid: friend.uid});
      }
      setLoading(false);
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

  const dismissScreen = () => {
    setSnackbarMessage(null);
    setTimeout(() => {
      navigation.goBack();
    }, 5000);
  };

  const listHeaderComponent = () => (
    <Header
      left={<Appbar.BackAction onPress={goBack} color={colors.text} />}
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
            disabled={currentUser?.uid === item.id}
          />
        )}
        ListHeaderComponent={listHeaderComponent()}
        stickyHeaderIndices={[0]}
        style={{flex: 1}}
        bounces={false}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
      />
      <Snackbar visible={snackbarMessage !== null} onDismiss={dismissScreen}>
        {snackbarMessage}
      </Snackbar>
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
