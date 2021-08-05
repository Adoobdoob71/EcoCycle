import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useTheme} from 'react-native-paper';
import {StyleProperty} from '../utils/Types';
import {ProgressBar, Column} from './';

interface PeerProgressProps {
  nickname?: string | null;
  profile_picture?: string | null;
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
      <Column style={{flex: 1, justifyContent: 'center'}}>
        <Text style={styles.peerNickname} numberOfLines={1}>
          {props.nickname}
        </Text>
        <ProgressBar
          outerStyle={{alignSelf: 'stretch', marginTop: 8}}
          innerStyle={{
            backgroundColor: props.isUser ? colors.accent : colors.primary,
          }}
          value={props.progressValue}
        />
      </Column>
    </View>
  );
};

function classes(colors: ReactNativePaper.ThemeColors) {
  return StyleSheet.create({
    peerProgressBackground: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 4,
    },
    peerProfilePicture: {
      width: 32,
      height: 32,
      borderRadius: 16,
      marginEnd: 10,
    },
    peerNickname: {
      color: colors.text,
      fontWeight: 'bold',
    },
  });
}

export default PeerProgress;
