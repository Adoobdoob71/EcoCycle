import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {
  Header,
  Card,
  IconButton,
  Top,
  PeerProgress,
  Row,
  Column,
} from '../components';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {useNavigation} from '@react-navigation/native';
import {BarChart} from 'react-native-chart-kit';
import {convertOpacityToHex} from '../utils/usefulFunctions';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import PeersRecycling from '../fragments/PeersRecycling';

const Home: React.FC = () => {
  const {colors} = useTheme();
  const styles = classes(colors);
  const navigation = useNavigation<any>();
  const [modalContentIndex, setModalContentIndex] = React.useState<number>(1);

  const bottomSheetRef = React.useRef<BottomSheet>(null);

  const snapPoints = React.useMemo(() => [0, '25%', '50%'], []);

  const modalContentNav = () => {
    switch (modalContentIndex) {
      case 3:
        return <PeersRecycling />;
      default:
        return null;
    }
  };

  const changeModalNav = (index: number) => {
    setModalContentIndex(index);
    bottomSheetRef.current?.snapTo(1);
  };

  const openDrawer = () => navigation.openDrawer();
  return (
    <SafeAreaView style={styles.mainView}>
      <ScrollView
        style={{flex: 1}}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never">
        <Header
          left={
            <IconButton
              icon="menu"
              size={21}
              onPress={openDrawer}
              innerStyle={{backgroundColor: colors.background}}
              borderless
            />
          }
          right={
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <IconButton icon="barcode-scan" onPress={() => {}} borderless />
              <TouchableOpacity style={{marginStart: 8}}>
                <Image
                  source={{
                    uri: 'https://avatars.githubusercontent.com/u/46420655?v=4',
                  }}
                  style={styles.headerProfilePicture}
                />
              </TouchableOpacity>
            </View>
          }
          backgroundStyle={{
            backgroundColor: colors.surface,
            borderRadius: 8,
            margin: 6,
            elevation: 4,
          }}
          title={`Welcome back, Elad`}
          subtitle="Planning on recycling more?"
        />
        <View style={styles.contentView}>
          <Card
            onPress={() => changeModalNav(1)}
            innerStyle={{
              padding: 12,
            }}>
            <Row style={{alignItems: 'center', justifyContent: 'space-around'}}>
              <Column style={{alignItems: 'center'}}>
                <AnimatedCircularProgress
                  rotation={0}
                  size={100}
                  width={2}
                  fill={(10 / 25) * 100}
                  tintColor={colors.primary}
                  backgroundColor={colors.placeholder}
                  style={{marginVertical: 12}}>
                  {fill => (
                    <Text style={styles.recycledBottlesAmount}>10/25</Text>
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
                  fill={53}
                  tintColor={colors.primary}
                  backgroundColor={colors.placeholder}
                  style={{marginVertical: 12}}>
                  {fill => (
                    <Text style={styles.recycledBottlesAmount}>53%</Text>
                  )}
                </AnimatedCircularProgress>
                <Text style={styles.recycledBottlesGreeting}>
                  53% items recycled
                </Text>
              </Column>
            </Row>
          </Card>
          <Card
            onPress={() => changeModalNav(2)}
            outerStyle={{
              marginVertical: 12,
            }}>
            <Top textStyle={{margin: 4, marginVertical: 2}}>
              Recycling history
            </Top>
            <BarChart
              data={{
                labels: ['30/6', '29/6', '28/6', '27/6'],
                datasets: [
                  {
                    data: [23, 17, 19, 10],
                  },
                ],
              }}
              // withInnerLines={false}
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
          </Card>
          <Card
            onPress={() => changeModalNav(3)}
            outerStyle={{marginBottom: 12}}>
            <Top style={{margin: 4, marginVertical: 2}}>
              Here's where you stand amongst your peers
            </Top>
            <View style={{margin: 8}}>
              <PeerProgress
                nickname="Elad Mekonen"
                profile_picture="https://avatars.githubusercontent.com/u/46420655?v=4"
                progressValue={0.64}
                outerStyle={{marginBottom: 6}}
                isUser
              />
              <PeerProgress
                nickname="Devin Booker"
                profile_picture="https://wallpaperaccess.com/full/5457303.png"
                progressValue={0.4}
                outerStyle={{marginBottom: 6}}
              />
              <PeerProgress
                nickname="Chris Paul"
                profile_picture="https://64.media.tumblr.com/644ea9b4a3baa8d8b6c362422686fb34/tumblr_pg90ks4V2s1xu7jxzo1_1280.png"
                progressValue={0.8}
                outerStyle={{marginBottom: 6}}
              />
            </View>
          </Card>
        </View>
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
          <SafeAreaView>{modalContentNav()}</SafeAreaView>
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
