import React from 'react';
import {StyleSheet, SafeAreaView, Image} from 'react-native';
import PaperOnBoarding, {
  PaperOnboardingItemType,
} from '@gorhom/paper-onboarding';
import {useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dimensions} from 'react-native';

const Guide: React.FC = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const WIDTH = Dimensions.get('window').width;

  const styles = classes(colors);

  const data: PaperOnboardingItemType[] = [
    {
      title: 'EcoCycle',
      backgroundColor: colors.background,
      image: (
        <Image
          source={{
            uri: 'https://raw.githubusercontent.com/Adoobdoob71/EcoCycle/master/EcoCycle%20App%20Icon.png',
          }}
          style={{width: WIDTH * 0.5, height: WIDTH * 0.5, borderRadius: 8}}
        />
      ),
    },
    {
      title: 'Scan barcodes',
      icon: ({size}) => <MaterialCommunityIcons name="barcode" size={size} />,
      backgroundColor: colors.placeholder,
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
      icon: ({size}) => <MaterialCommunityIcons name="nfc" size={size} />,
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
      icon: ({size}) => <MaterialCommunityIcons name="trophy" size={size} />,
      backgroundColor: colors.placeholder,
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
      titleStyle={styles.titleStyle}
      indicatorSize={32}
      indicatorBackgroundColor={colors.primary}
      onCloseButtonPress={onCloseButtonPress}
    />
  );
};

function classes(colors: ReactNativePaper.ThemeColors) {
  return StyleSheet.create({
    titleStyle: {
      fontSize: 21,
      color: colors.text,
    },
  });
}

export default Guide;
