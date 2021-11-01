import { StyleProp, ViewStyle } from 'react-native';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type StyleProperty = StyleProp<ViewStyle>; 

export interface UserData {
	id: string;
	displayName: string;
	email: string;
	photoURL: string;
	joinedOn: FirebaseFirestoreTypes.Timestamp;
	uid: string;
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