import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useTheme} from 'react-native-paper';
import {Header, IconButton} from '../components';

const About: React.FC = () => {
  const {colors} = useTheme();
  const styles = classes(colors);

  const navigation = useNavigation<any>();
  const openDrawer = () => navigation.openDrawer();

  return (
    <SafeAreaView style={styles.background}>
      <ScrollView
        stickyHeaderIndices={[0]}
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}>
        <Header
          left={<IconButton icon="menu" onPress={openDrawer} borderless />}
          title="About the developer"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

function classes(colors: any) {
  return StyleSheet.create({
    background: {
      backgroundColor: colors.background,
      flex: 1,
    },
  });
}

export default About;
