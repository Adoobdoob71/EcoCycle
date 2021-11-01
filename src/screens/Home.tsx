import React from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView, Image} from 'react-native';
import {ActivityIndicator, useTheme, IconButton} from 'react-native-paper';
import {Header} from '../components';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../hooks/useAuth';

const Home: React.FC = () => {
  const {colors} = useTheme();
  const styles = classes(colors);
  const navigation = useNavigation<any>();

  const [loading, setLoading] = React.useState(false);

  const {currentUser} = useAuth();
  const openDrawer = () => navigation.openDrawer();
  const goToProfile = () =>
    navigation.navigate('ProfileScreen', {id: currentUser?.uid});

  return loading ? (
    <SafeAreaView
      style={[
        styles.mainView,
        {justifyContent: 'center', alignItems: 'center'},
      ]}>
      <ActivityIndicator size="large" color={colors.primary} />
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.mainView}>
      <ScrollView
        style={{flex: 1}}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never">
        <Header
          left={<IconButton icon="menu" size={21} onPress={openDrawer} />}
          right={
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <IconButton
                icon="barcode-scan"
                size={18}
                onPress={() => navigation.navigate('ScanScreen')}
              />
              <TouchableOpacity style={{marginStart: 8}} onPress={goToProfile}>
                <Image
                  source={{
                    uri: currentUser?.photoURL,
                  }}
                  style={styles.headerProfilePicture}
                />
              </TouchableOpacity>
            </View>
          }
          backgroundStyle={{
            borderRadius: 8,
            margin: 6,
            elevation: 4,
          }}
          title={`Welcome back, ${currentUser?.displayName}`}
          subtitle="Planning on recycling more?"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

function classes(colors: ReactNativePaper.ThemeColors) {
  return StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor: colors.background,
    },
    headerProfilePicture: {
      width: 36,
      height: 36,
      borderRadius: 18,
    },
    contentView: {
      padding: 12,
    },
    recycledBottlesAmount: {
      fontSize: 18,
      color: colors.text,
      fontWeight: 'bold',
    },
    recycledBottlesGreeting: {
      fontSize: 14,
      color: colors.text,
    },
    bottomSheetsBackground: {
      backgroundColor: colors.background,
    },
    bottomSheetsBar: {
      backgroundColor: colors.surface,
      borderTopEndRadius: 12,
      borderTopStartRadius: 12,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomSheetsHandle: {
      backgroundColor: colors.disabled,
      width: '10%',
      height: 5,
      borderRadius: 8,
    },
  });
}

export default Home;
