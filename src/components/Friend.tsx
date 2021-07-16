import React from 'react';
import {Text, StyleSheet, Image} from 'react-native';
import {useTheme} from 'react-native-paper';
import {StyleProperty} from '../utils/Types';
import {RippleButton, Column, Row} from './';

interface FriendProps {
  name?: string;
  familyName?: string;
  givenName?: string;
  email?: string;
  photo?: string;
  id?: string;
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
      <Image source={{uri: props.photo}} style={styles.profilePicture} />
      <Column style={{flex: 1}}>
        <Row style={{alignItems: 'center', marginBottom: 1}}>
          <Text style={styles.givenName}>{props.givenName}</Text>
        </Row>
        <Text style={styles.email}>{props.email}</Text>
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
    profilePicture: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginEnd: 12,
    },
    givenName: {
      fontSize: 16,
      color: colors.text,
      fontWeight: 'bold',
      marginEnd: 4,
    },
    email: {
      fontSize: 12,
      color: colors.placeholder,
    },
  });
}
export default Friend;
