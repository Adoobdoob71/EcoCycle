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
	all_items: number; 
  bottles: number;
  plastic_items: number;
  metallic_items: number;
  paper_items: number;
  created_at: number;
}

export interface UserRecyclingData {
	bottlesToRecycleAmount: number;
	bottlesRecycledAmount: number;
	itemsToRecycleAmount: number;
	itemsRecycledAmount: number;
}