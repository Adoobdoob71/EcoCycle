import React from 'react';
import {StyleSheet, SafeAreaView, Image} from 'react-native';
import PaperOnBoarding, {
  PaperOnboardingItemType,
} from '@gorhom/paper-onboarding';
import {useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Guide: React.FC = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();

  const data: PaperOnboardingItemType[] = [
    {
      title: 'Welcome To EcoCycle',
      backgroundColor: colors.background,
      image: (
        <Image
          source={{
            uri: 'https://github.com/Adoobdoob71/EcoCycle/blob/master/EcoCycle%20App%20Icon.png',
          }}
        />
      ),
    },
    {
      title: 'Scan barcodes',
      icon: () => <MaterialCommunityIcons name="barcode" size={24} />,
      backgroundColor: colors.background,
      image: (
        <Image
          source={{
            uri: 'https://github.com/Adoobdoob71/EcoCycle/blob/master/EcoCycle%20App%20Icon.png',
          }}
        />
      ),
    },
    {
      title: 'Scan recycling cages with NFC',
      icon: () => <MaterialCommunityIcons name="nfc" size={24} />,
      backgroundColor: colors.background,
      image: (
        <Image
          source={{
            uri: 'https://github.com/Adoobdoob71/EcoCycle/blob/master/EcoCycle%20App%20Icon.png',
          }}
        />
      ),
    },
    {
      title: 'Compare yourself with friends',
      icon: () => <MaterialCommunityIcons name="trophy" size={24} />,
      backgroundColor: colors.background,
      image: (
        <Image
          source={{
            uri: 'https://github.com/Adoobdoob71/EcoCycle/blob/master/EcoCycle%20App%20Icon.png',
          }}
        />
      ),
    },
  ];

  const onCloseButtonPress = () => navigation.goBack();

  return (
    <PaperOnBoarding
      data={data}
      indicatorBackgroundColor={colors.primary}
      onCloseButtonPress={onCloseButtonPress}
    />
  );
};

function classes(colors: any) {
  return StyleSheet.create({});
}

export default Guide;
