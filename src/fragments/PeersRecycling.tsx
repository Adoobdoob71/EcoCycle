import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {useTheme} from 'react-native-paper';
import {Top, PeerProgress, RippleButton} from '../components';

const PeersRecycling: React.FC = () => {
  const {colors} = useTheme();
  const styles = classes(colors);
  return (
    <SafeAreaView style={styles.background}>
      <Top>Here's where you stand amongst your peers</Top>
      <View style={styles.peersView}>
        <RippleButton onPress={() => {}} outerStyle={{marginBottom: 10}}>
          <PeerProgress
            nickname="Elad Mekonen"
            profile_picture="https://avatars.githubusercontent.com/u/46420655?v=4"
            progressValue={0.64}
            isUser
          />
        </RippleButton>
        <RippleButton onPress={() => {}} outerStyle={{marginBottom: 10}}>
          <PeerProgress
            nickname="Devin Booker"
            profile_picture="https://wallpaperaccess.com/full/5457303.png"
            progressValue={0.4}
          />
        </RippleButton>
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
