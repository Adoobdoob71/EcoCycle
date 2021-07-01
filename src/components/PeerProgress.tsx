import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useTheme} from 'react-native-paper';
import {StyleProperty} from '../utils/Types';
import {ProgressBar} from './';

interface PeerProgressProps {
  nickname: string;
  profile_picture: string;
  progressValue: number;
  outerStyle?: StyleProperty;
  isUser?: boolean;
}

const PeerProgress: React.FC<PeerProgressProps> = props => {
  const {colors} = useTheme();
  const styles = classes(colors);

  return (
    <View style={[styles.peerProgressBackground, props.outerStyle]}>
      <Image
        source={{uri: props.profile_picture}}
        style={styles.peerProfilePicture}
      />
      <Text style={styles.peerNickname} numberOfLines={1}>
        {props.nickname}
      </Text>
      <ProgressBar
        outerStyle={{flex: 4, marginStart: 8}}
        innerStyle={{
          backgroundColor: props.isUser ? colors.accent : colors.primary,
        }}
        value={props.progressValue}
      />
    </View>
  );
};

function classes(colors: any) {
  return StyleSheet.create({
    peerProgressBackground: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    peerProfilePicture: {
      width: 24,
      height: 24,
      borderRadius: 12,
      marginEnd: 8,
    },
    peerNickname: {
      flex: 2,
      color: colors.text,
      fontWeight: 'bold',
    },
  });
}

export default PeerProgress;
