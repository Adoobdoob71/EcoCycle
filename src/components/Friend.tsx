import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useTheme} from 'react-native-paper';
import {StyleProperty} from '../utils/Types';
import {RippleButton, Column, Row} from './';

interface FriendProps {
  nickname?: string;
  username?: string;
  profile_picture?: string;
  description?: string;
  uid?: string;
  onPress?: () => void;
  outerStyle?: StyleProperty;
}

const Friend: React.FC<FriendProps> = props => {
  const {colors} = useTheme();
  const styles = classes(colors);

  return (
    <RippleButton
      onPress={props.onPress ? props.onPress : () => {}}
      borderRadius={0}
      innerStyle={styles.background}
      outerStyle={props.outerStyle}>
      <Image
        source={{uri: props.profile_picture}}
        style={styles.friendProfilePicture}
      />
      <Column style={{flex: 1}}>
        <Row style={{alignItems: 'center', marginBottom: 1}}>
          <Text style={styles.friendNickname}>{props.nickname}</Text>
          <Text style={styles.friendUsername}>@{props.username}</Text>
        </Row>
        <Text style={styles.friendDescripton}>{props.description}</Text>
      </Column>
    </RippleButton>
  );
};

function classes(colors: any) {
  return StyleSheet.create({
    background: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    friendProfilePicture: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginEnd: 12,
    },
    friendNickname: {
      fontSize: 16,
      color: colors.text,
      fontWeight: 'bold',
      marginEnd: 4,
    },
    friendUsername: {
      fontSize: 14,
      color: colors.placeholder,
    },
    friendDescripton: {
      fontSize: 12,
      color: colors.text,
    },
  });
}
export default Friend;
