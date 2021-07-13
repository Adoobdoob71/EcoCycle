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
	all_items?: any; 
  bottles?: any;
  plastic_items?: any;
  metallic_items?: any;
  paper_items?: any;
  created_at?: any;
}