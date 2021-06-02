import React from 'react';
import {View, StyleSheet, SafeAreaView, Text} from 'react-native';
import {useTheme} from 'react-native-paper';

const Home: React.FC = () => {
  const {colors} = useTheme();
  const styles = classes(colors);

  return (
    <SafeAreaView style={styles.mainView}>
      <Text>Home</Text>
    </SafeAreaView>
  );
};

function classes(colors: any) {
  return StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
}

export default Home;
