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
import {useTheme} from 'react-native-paper';
import {Header, IconButton, Surface, Row, Column, Top} from '../components';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {BarChart} from 'react-native-chart-kit';
import {convertOpacityToHex} from '../utils/usefulFunctions';
import {ScrollView} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthContext} from '../utils/Auth';
import firebase from 'firebase/app';
import {RecyclingDataType, UserData, UserRecyclingData} from '../utils/Types';

const Profile: React.FC<
  StackScreenProps<{ProfileScreen: {id: string}}, 'ProfileScreen'>
> = props => {
  const [loading, setLoading] = React.useState(true);
  const [userData, setUserData] = React.useState<UserData | null>(null);
  const [itemsRecycledDataFromToday, setItemsRecycledDataFromToday] =
    React.useState<RecyclingDataType[]>([]);
  const [bottlesToRecycleAmount, setBottlesToRecycleAmount] = React.useState(0);
  const [bottlesRecycledAmount, setBottlesRecycledAmount] = React.useState(0);
  const [itemsRecycledPercentage, setItemsRecycledPercentage] =
    React.useState(0);

  const {colors} = useTheme();
  const styles = classes(colors);

  const navigation = useNavigation();
  const goBack = () => navigation.goBack();

  const {userInfo} = React.useContext(AuthContext);

  const loadData = async () => {
    try {
      let data = await firebase
        .database()
        .ref('users')
        .child(props.route.params.id)
        .child('recycling_brief')
        .get();
      let recyclingData = data.val() as UserRecyclingData;
      setBottlesRecycledAmount(recyclingData.bottlesRecycledAmount);
      setBottlesToRecycleAmount(recyclingData.bottlesToRecycleAmount);
      setItemsRecycledPercentage(
        Math.round(
          (recyclingData.itemsRecycledAmount /
            recyclingData.itemsToRecycleAmount) *
            100,
        ),
      );
      const date = new Date();
      date.setDate(date.getDate() - 1);
      let userProfile = await firebase
        .database()
        .ref('users')
        .child(props.route.params.id)
        .get();
      let itemsRecycledDataToday = await firebase
        .database()
        .ref('users')
        .child(props.route.params.id)
        .child('recycling')
        .child('already_recycled')
        .orderByChild('created_at')
        .startAt(date.getMilliseconds())
        .get();
      itemsRecycledDataToday.forEach(item => {
        setItemsRecycledDataFromToday(currentData => [
          ...currentData,
          item.val(),
        ]);
      });
      setUserData(userProfile.val());
      setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  React.useEffect(() => {
    loadData();
  }, []);

  return loading ? (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <Header
        left={<IconButton icon="arrow-left" onPress={goBack} borderless />}
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
            uri: userData?.photo,
          }}
          style={styles.profilePicture}
        />
        <Column style={{marginHorizontal: 12, flex: 1}}>
          <Text style={styles.name}>{userData?.name}</Text>
          <Text style={styles.email} numberOfLines={2} lineBreakMode="tail">
            {userData?.email}
          </Text>
        </Column>
      </Surface>
      <Surface direction="column" style={{margin: 12}}>
        <Row style={{alignItems: 'center', justifyContent: 'space-around'}}>
          <Column style={{alignItems: 'center'}}>
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
          </Column>
        </Row>
      </Surface>
      <Surface direction="column" style={{margin: 12}}>
        <Top textStyle={{margin: 4, marginVertical: 2, fontSize: 18}}>
          Recycling History
        </Top>
        <BarChart
          data={{
            labels: itemsRecycledDataFromToday
              .slice(
                itemsRecycledDataFromToday.length - 4,
                itemsRecycledDataFromToday.length,
              )
              .map(
                item =>
                  new Date(item.created_at).getDate() +
                  '/' +
                  (new Date(item.created_at).getMonth() + 1),
              ),
            datasets: [
              {
                data: itemsRecycledDataFromToday
                  .slice(
                    itemsRecycledDataFromToday.length - 4,
                    itemsRecycledDataFromToday.length,
                  )
                  .map(item => item.bottles),
              },
            ],
          }}
          showValuesOnTopOfBars
          yLabelsOffset={32}
          yAxisLabel=""
          yAxisSuffix=""
          fromZero
          width={Dimensions.get('window').width - 48}
          height={200}
          chartConfig={{
            backgroundGradientFrom: colors.surface,
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: colors.primary,
            backgroundGradientToOpacity: 0,
            decimalPlaces: 0,
            color: opacity => colors.primary + convertOpacityToHex(opacity),
            barPercentage: 0.5,
            useShadowColorFromDataset: false, // optional
          }}
          style={{marginVertical: 8, alignSelf: 'center', borderRadius: 8}}
        />
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
