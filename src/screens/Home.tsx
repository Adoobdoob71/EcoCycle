import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  Dimensions,
  RefreshControl,
} from 'react-native';
import {ActivityIndicator, useTheme} from 'react-native-paper';
import {
  Header,
  Card,
  IconButton,
  Top,
  PeerProgress,
  Row,
  Column,
  Surface,
} from '../components';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {useNavigation} from '@react-navigation/native';
import {BarChart} from 'react-native-chart-kit';
import {convertOpacityToHex} from '../utils/usefulFunctions';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import PeersRecycling from '../fragments/PeersRecycling';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {AuthContext} from '../utils/Auth';
import {RecyclingDataType, UserRecyclingData} from '../utils/Types';
import firebase from 'firebase/app';
import {TourGuideZone, useTourGuideController} from 'rn-tourguide';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home: React.FC = () => {
  const {colors} = useTheme();
  const styles = classes(colors);
  const navigation = useNavigation<any>();

  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [itemsRecycledDataFromToday, setItemsRecycledDataFromToday] =
    React.useState<RecyclingDataType[]>([]);
  const [itemsToRecycleDataToday, setItemsToRecycleDataToday] = React.useState<
    RecyclingDataType[]
  >([]);

  const [bottlesToRecycleAmount, setBottlesToRecycleAmount] = React.useState(0);
  const [bottlesRecycledAmount, setBottlesRecycledAmount] = React.useState(0);
  const [itemsRecycledPercentage, setItemsRecycledPercentage] =
    React.useState(0);

  const [friendsRecyclingData, setFriendsRecyclingData] = React.useState<
    {photo: string; name: string; percentage: number; id: string}[]
  >([]);

  const {updateUserInfo, userInfo} = React.useContext(AuthContext);

  const bottomSheetRef = React.useRef<BottomSheet>(null);

  const snapPoints = React.useMemo(() => [0, '25%', '50%'], []);

  const openModal = () => bottomSheetRef.current?.snapTo(1);

  const openDrawer = () => navigation.openDrawer();
  const goToProfile = () =>
    navigation.navigate('ProfileScreen', {id: userInfo?.user.id});

  const {canStart, start} = useTourGuideController();

  React.useEffect(() => {
    signIntoAccount();
  }, []);

  const startGuide = async () => {
    let already_launched = await AsyncStorage.getItem('already_launched');
    if (canStart && !already_launched) start && start();
  };

  React.useEffect(() => {
    startGuide();
  }, [canStart]);

  const signIntoAccount = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      updateUserInfo(userInfo);
      readData(userInfo?.user.id);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        navigation.navigate('SigninScreen');
      } else {
        // some other error
      }
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setBottlesRecycledAmount(0);
    setBottlesToRecycleAmount(0);
    setItemsRecycledPercentage(0);
    setItemsRecycledDataFromToday([]);
    setItemsToRecycleDataToday([]);
    setFriendsRecyclingData([]);
    await readData(userInfo?.user.id);
    setRefreshing(false);
  };

  const readData = async (id?: string) => {
    try {
      if (id) {
        let data = await firebase
          .database()
          .ref('users')
          .child(id)
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
        let itemsRecycledDataToday = await firebase
          .database()
          .ref('users')
          .child(id)
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
        let friendsData = await firebase
          .database()
          .ref('users')
          .child(id)
          .child('friends')
          .get();
        friendsData.forEach(item => {
          firebase
            .database()
            .ref('users')
            .child(item.val().friend_id)
            .once('value', snapshot => {
              setFriendsRecyclingData(friends => [
                ...friends,
                {
                  photo: snapshot.val().photo,
                  name: snapshot.val().name,
                  percentage:
                    snapshot.val().recycling_brief.itemsRecycledAmount /
                    snapshot.val().recycling_brief.itemsToRecycleAmount,
                  id: item.val().friend_id,
                },
              ]);
            });
        });
      }
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      setLoading(false);
    }
  };

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
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            progressBackgroundColor={colors.backdrop}
          />
        }
        overScrollMode="never">
        <TourGuideZone
          zone={1}
          text="Welcome to EcoCycle!"
          shape="rectangle"
          borderRadius={8}>
          <Header
            left={
              <TourGuideZone
                zone={6}
                text="Click here for the menu"
                shape="circle">
                <IconButton
                  icon="menu"
                  size={21}
                  onPress={openDrawer}
                  innerStyle={{backgroundColor: colors.background}}
                  borderless
                />
              </TourGuideZone>
            }
            right={
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TourGuideZone
                  zone={2}
                  text="Here you can start scanning"
                  shape="circle">
                  <IconButton
                    icon="barcode-scan"
                    onPress={() => navigation.navigate('ScanScreen')}
                    borderless
                  />
                </TourGuideZone>
                <TouchableOpacity
                  style={{marginStart: 8}}
                  onPress={goToProfile}>
                  <Image
                    source={{
                      uri: userInfo?.user.photo,
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
            title={`Welcome back, ${userInfo?.user.givenName}`}
            subtitle="Planning on recycling more?"
          />
        </TourGuideZone>
        {refreshing ? (
          <View
            style={{
              height: Dimensions.get('window').height,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <View style={styles.contentView}>
            <TourGuideZone
              zone={3}
              text="Here you can see your progress"
              shape="rectangle"
              borderRadius={8}>
              <Surface
                direction="column"
                style={{
                  padding: 12,
                }}>
                <Row
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-around',
                  }}>
                  <Column style={{alignItems: 'center'}}>
                    <AnimatedCircularProgress
                      rotation={0}
                      size={100}
                      width={2}
                      fill={
                        (bottlesRecycledAmount / bottlesToRecycleAmount) * 100
                      }
                      tintColor={colors.primary}
                      backgroundColor={colors.placeholder}
                      style={{marginVertical: 12}}>
                      {fill => (
                        <Text
                          style={[
                            styles.recycledBottlesAmount,
                            {color: fill === 100 ? colors.accent : colors.text},
                          ]}>
                          {bottlesRecycledAmount}/{bottlesToRecycleAmount}
                        </Text>
                      )}
                    </AnimatedCircularProgress>
                    <Text style={styles.recycledBottlesGreeting}>
                      Bottles recycled
                    </Text>
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
                        <Text
                          style={[
                            styles.recycledBottlesAmount,
                            {color: fill === 100 ? colors.accent : colors.text},
                          ]}>
                          {itemsRecycledPercentage}%
                        </Text>
                      )}
                    </AnimatedCircularProgress>
                    <Text style={styles.recycledBottlesGreeting}>
                      Items recycled
                    </Text>
                  </Column>
                </Row>
              </Surface>
            </TourGuideZone>
            <TourGuideZone
              zone={4}
              text="Here you can see your recycling history"
              borderRadius={8}>
              <Surface
                direction="column"
                style={{
                  marginVertical: 12,
                }}>
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
                    color: opacity =>
                      colors.primary + convertOpacityToHex(opacity),
                    barPercentage: 0.5,
                    useShadowColorFromDataset: false, // optional
                  }}
                  style={{
                    marginVertical: 8,
                    alignSelf: 'center',
                    borderRadius: 8,
                  }}
                />
              </Surface>
            </TourGuideZone>
            <TourGuideZone
              zone={5}
              text="And here you can compare yourself to friends!"
              shape="rectangle"
              borderRadius={8}>
              <Card onPress={openModal} outerStyle={{marginBottom: 12}}>
                <Top
                  style={{margin: 4, marginVertical: 2}}
                  textStyle={{fontSize: 18}}>
                  You vs Your Peers
                </Top>
                <View style={{margin: 8}}>
                  <PeerProgress
                    nickname={userInfo?.user.name}
                    profile_picture={userInfo?.user.photo}
                    progressValue={itemsRecycledPercentage / 100}
                    outerStyle={{marginBottom: 6}}
                    isUser
                  />
                  {friendsRecyclingData.slice(0, 2).map(item => (
                    <PeerProgress
                      nickname={item.name}
                      profile_picture={item.photo}
                      progressValue={item.percentage}
                      outerStyle={{marginBottom: 6}}
                    />
                  ))}
                </View>
              </Card>
            </TourGuideZone>
          </View>
        )}
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        handleComponent={() => (
          <View style={styles.bottomSheetsBar}>
            <View style={styles.bottomSheetsHandle}></View>
          </View>
        )}
        snapPoints={snapPoints}>
        <BottomSheetScrollView style={styles.bottomSheetsBackground}>
          <PeersRecycling
            friendsData={friendsRecyclingData}
            progressValue={bottlesRecycledAmount / bottlesToRecycleAmount}
          />
        </BottomSheetScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
};

function classes(colors: any) {
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
      backgroundColor: colors.placeholder,
      width: '10%',
      height: 5,
      borderRadius: 8,
    },
  });
}

export default Home;
