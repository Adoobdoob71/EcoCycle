import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {Appbar, useTheme} from 'react-native-paper';
import {Header, IconButton, Surface, Row, Column, Top} from '../components';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {ScrollView} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
import {UserData} from '../utils/Types';
import {VictoryBar, VictoryChart, VictoryTheme} from 'victory-native';
import {useUserData} from '../hooks/useUserData';

const Profile: React.FC<
  StackScreenProps<{ProfileScreen: {id: string}}, 'ProfileScreen'>
> = ({
  route: {
    params: {id},
  },
}) => {
  const [loadingData, setLoadingData] = React.useState(true);
  const [userData, setUserData] = React.useState<UserData | null>(null);

  const {colors} = useTheme();
  const styles = classes(colors);

  const navigation = useNavigation();
  const goBack = () => navigation.goBack();

  const loadData = async () => {
    try {
      const {userData, loadData, error, loading} = useUserData(id);
      setLoadingData(loading);
      await loadData();
      setUserData(userData);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    loadData();
  }, []);

  const data = [
    {quarter: 1, earnings: 13000},
    {quarter: 2, earnings: 16500},
    {quarter: 3, earnings: 14250},
    {quarter: 4, earnings: 19000},
  ];

  return loadingData ? (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <Header
        left={<Appbar.BackAction onPress={goBack} color={colors.text} />}
        title="Profile"
      />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    </SafeAreaView>
  ) : (
    <ScrollView
      style={{flex: 1}}
      stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false}
      bounces={false}
      overScrollMode="never">
      <Header
        left={<IconButton icon="arrow-left" onPress={goBack} borderless />}
        title="Profile"
      />
      <Surface direction="row" style={{alignItems: 'center', margin: 12}}>
        <Image
          source={{
            uri: userData?.photoURL,
          }}
          style={styles.profilePicture}
        />
        <Column style={{marginHorizontal: 12, flex: 1}}>
          <Text style={styles.name}>{userData?.displayName}</Text>
          <Text style={styles.email} numberOfLines={2} lineBreakMode="tail">
            {userData?.email}
          </Text>
        </Column>
      </Surface>
      <Surface direction="column" style={{margin: 12}}>
        <Row style={{alignItems: 'center', justifyContent: 'space-around'}}>
          {/* <Column style={{alignItems: 'center'}}>
            <AnimatedCircularProgress
              rotation={0}
              size={100}
              width={2}
              fill={(bottlesRecycledAmount / bottlesToRecycleAmount) * 100}
              tintColor={colors.primary}
              backgroundColor={colors.placeholder}
              style={{marginVertical: 12}}>
              {fill => (
                <Text style={styles.recycledBottlesAmount}>
                  {bottlesRecycledAmount}/{bottlesToRecycleAmount}
                </Text>
              )}
            </AnimatedCircularProgress>
            <Text style={styles.recycledBottlesGreeting}>Bottles recycled</Text>
          </Column>
          <Column style={{alignItems: 'center'}}>
            <AnimatedCircularProgress
              rotation={0}
              size={100}
              width={2}
              fill={itemsRecycledPercentage}
              tintColor={colors.primary}
              backgroundColor={colors.placeholder}
              style={{marginVertical: 12}}>
              {fill => (
                <Text style={styles.recycledBottlesAmount}>
                  {itemsRecycledPercentage}%
                </Text>
              )}
            </AnimatedCircularProgress>
            <Text style={styles.recycledBottlesGreeting}>Items recycled</Text>
          </Column> */}
        </Row>
      </Surface>
      <Surface direction="column" style={{margin: 12}}>
        <Top textStyle={{margin: 4, marginVertical: 2, fontSize: 18}}>
          Recycling History
        </Top>
        <VictoryChart width={350} theme={VictoryTheme.material}>
          <VictoryBar data={data} x="quarter" y="earnings" />
        </VictoryChart>
      </Surface>
    </ScrollView>
  );
};

function classes(colors: ReactNativePaper.ThemeColors) {
  return StyleSheet.create({
    background: {
      backgroundColor: colors.background,
    },
    profilePicture: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    name: {
      fontSize: 16,
      color: colors.text,
      fontWeight: 'bold',
      marginBottom: 2,
    },
    email: {
      fontSize: 14,
      color: colors.placeholder,
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
  });
}

export default Profile;
