import { StyleProp, ViewStyle } from 'react-native';

export type StyleProperty = StyleProp<ViewStyle>; 

export interface UserData {
	id: string;
	name: string | null;
	email: string;
	photo: string | null;
	familyName: string | null;
	givenName: string | null;
}

export interface RecyclingDataType {
	allItems?: any; 
  bottles?: any;
  plasticItems?: any;
  metallicItems?: any;
  paperItems?: any;
  createdAt?: any;
}