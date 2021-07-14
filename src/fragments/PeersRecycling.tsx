import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {useTheme} from 'react-native-paper';
import {Top, PeerProgress, RippleButton} from '../components';
import {AuthContext} from '../utils/Auth';

interface PeersRecyclingProps {
  friendsData: {photo: string; name: string; percentage: number; id: string}[];
  progressValue: number;
}

const PeersRecycling: React.FC<PeersRecyclingProps> = props => {
  const {colors} = useTheme();
  const styles = classes(colors);
  const {userInfo} = React.useContext(AuthContext);
  const navigation = useNavigation();

  const navigateToProfile = (id?: string) =>
    navigation.navigate('ProfileScreen', {id: id});
  return (
    <SafeAreaView style={styles.background}>
      <Top textStyle={{fontSize: 18}}>You vs Your Peers</Top>
      <View style={styles.peersView}>
        <RippleButton
          onPress={() => navigateToProfile(userInfo?.user.id)}
          outerStyle={{marginBottom: 10}}>
          <PeerProgress
            nickname={userInfo?.user.name}
            profile_picture={userInfo?.user.photo}
            progressValue={props.progressValue}
            isUser
          />
        </RippleButton>
        {props.friendsData.map(item => (
          <RippleButton
            onPress={() => navigateToProfile(item.id)}
            outerStyle={{marginBottom: 10}}>
            <PeerProgress
              nickname={item.name}
              profile_picture={item.photo}
              progressValue={item.percentage}
            />
          </RippleButton>
        ))}
      </View>
    </SafeAreaView>
  );
};

function classes(colors: any) {
  return StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: colors.background,
    },
    peersView: {
      padding: 10,
    },
  });
}
export default PeersRecycling;
