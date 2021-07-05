import { StyleProp, ViewStyle } from 'react-native';

export type StyleProperty = StyleProp<ViewStyle>; 

export interface UserData {
	nickname?: string;
	username?: string;
	profile_picture?: string;
}