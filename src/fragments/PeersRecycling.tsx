import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {Top, PeerProgress, RippleButton} from '../components';
import {useAuth} from '../hooks/useAuth';

interface PeersRecyclingProps {
  friendsData: {
    photoURL: string;
    displayName: string;
    percentage: number;
    uid: string;
  }[];
  progressValue: number;
}

const PeersRecycling: React.FC<PeersRecyclingProps> = props => {
  const {colors} = useTheme();
  const styles = classes(colors);
  const {currentUser} = useAuth();
  const navigation = useNavigation();

  const navigateToProfile = (id?: string) =>
    navigation.navigate('ProfileScreen', {id: id});
  return (
    <SafeAreaView style={styles.background}>
      <Top textStyle={{fontSize: 18}}>You vs Your Peers</Top>
      <View style={styles.peersView}>
        <RippleButton
          onPress={() => navigateToProfile(currentUser?.uid)}
          outerStyle={{marginBottom: 10}}
          borderRadius={8}>
          <PeerProgress
            nickname={currentUser?.displayName}
            profile_picture={currentUser?.photoURL}
            progressValue={props.progressValue}
            isUser
          />
        </RippleButton>
        {props.friendsData.map(item => (
          <RippleButton
            onPress={() => navigateToProfile(item.uid)}
            outerStyle={{marginBottom: 10}}
            borderRadius={8}>
            <PeerProgress
              nickname={item.displayName}
              profile_picture={item.photoURL}
              progressValue={item.percentage}
            />
          </RippleButton>
        ))}
      </View>
    </SafeAreaView>
  );
};

function classes(colors: ReactNativePaper.ThemeColors) {
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
