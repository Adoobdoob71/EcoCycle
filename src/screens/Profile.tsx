import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {Header, IconButton, Surface, Row, Column, Top} from '../components';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {BarChart} from 'react-native-chart-kit';
import PeersRecycling from '../fragments/PeersRecycling';
import RecyclingHistory from '../fragments/RecyclingHistory';
import {convertOpacityToHex} from '../utils/usefulFunctions';
import {ScrollView} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthContext} from '../utils/Auth';

const Profile: React.FC<
  StackScreenProps<{ProfileScreen: {myProfile: boolean}}, 'ProfileScreen'>
> = props => {
  const {colors} = useTheme();
  const styles = classes(colors);

  const navigation = useNavigation();
  const goBack = () => navigation.goBack();

  const {userInfo} = React.useContext(AuthContext);

  const loadData = async () => {
    if (props.route.params.myProfile) {
    }
  };

  React.useEffect(() => {
    loadData();
  }, []);

  return (
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
            uri: userInfo?.user.photo,
          }}
          style={styles.profilePicture}
        />
        <Column style={{marginHorizontal: 12, flex: 1}}>
          <Row style={{alignItems: 'center', marginBottom: 6}}>
            <Text style={styles.nickname}>{userInfo?.user.givenName}</Text>
            <Text style={styles.username}>@DoritoWizard71</Text>
          </Row>
          <Text
            style={styles.description}
            numberOfLines={2}
            lineBreakMode="tail">
            I like programming and playing basketball
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
              fill={(10 / 25) * 100}
              tintColor={colors.primary}
              backgroundColor={colors.placeholder}
              style={{marginVertical: 12}}>
              {fill => <Text style={styles.recycledBottlesAmount}>10/25</Text>}
            </AnimatedCircularProgress>
            <Text style={styles.recycledBottlesGreeting}>Bottles recycled</Text>
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
              {fill => <Text style={styles.recycledBottlesAmount}>53%</Text>}
            </AnimatedCircularProgress>
            <Text style={styles.recycledBottlesGreeting}>
              53% items recycled
            </Text>
          </Column>
        </Row>
      </Surface>
      <Surface direction="column" style={{margin: 12}}>
        <Top textStyle={{margin: 4, marginVertical: 2, fontSize: 18}}>
          Recycling History
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
      </Surface>
    </ScrollView>
  );
};

function classes(colors: any) {
  return StyleSheet.create({
    background: {
      backgroundColor: colors.background,
    },
    profilePicture: {
      width: 72,
      height: 72,
      borderRadius: 36,
    },
    nickname: {
      fontSize: 16,
      color: colors.text,
      fontWeight: 'bold',
      marginEnd: 4,
    },
    username: {
      fontSize: 16,
      color: colors.placeholder,
    },
    description: {
      fontSize: 14,
      color: colors.text,
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
