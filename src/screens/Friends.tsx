import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {Header, IconButton, Friend} from '../components';
import {useNavigation} from '@react-navigation/native';
import {UserData} from '../utils/Types';

const Friends: React.FC = () => {
  const [friends, setFriends] = React.useState<UserData[]>([]);
  const {colors} = useTheme();
  const styles = classes(colors);

  const navigation = useNavigation<any>();
  const openDrawer = () => navigation.openDrawer();

  return (
    <SafeAreaView style={styles.background}>
      {/*
				Should be a FlatList but that'll do for now
			*/}
      <ScrollView
        style={{flex: 1}}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never">
        <Header
          left={<IconButton icon="menu" onPress={openDrawer} borderless />}
          title="Friends"
          backgroundStyle={{marginBottom: 8}}
        />
        <Friend
          profile_picture="https://i.pinimg.com/originals/08/87/33/088733465f7c684a6cdd242eb463b5bf.jpg"
          nickname="DoritoWizard"
          username="DoritoWizard71"
          description="I like programming"
          outerStyle={{marginBottom: 8}}
        />
        <Friend
          profile_picture="https://i.pinimg.com/originals/08/87/33/088733465f7c684a6cdd242eb463b5bf.jpg"
          nickname="DoritoWizard"
          username="DoritoWizard71"
          description="I like programming"
          outerStyle={{marginBottom: 8}}
        />
      </ScrollView>
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
