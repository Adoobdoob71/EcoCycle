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
import {Header, Card, IconButton, Top} from '../components';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {BarChart} from 'react-native-chart-kit';

const Home: React.FC = () => {
  const {colors} = useTheme();
  const styles = classes(colors);
  const navigation = useNavigation<any>();

  const openDrawer = () => navigation.openDrawer();
  return (
    <SafeAreaView style={styles.mainView}>
      <Header
        left={<IconButton icon="menu" onPress={openDrawer} />}
        right={
          <TouchableOpacity>
            <Image
              source={{
                uri: 'https://avatars.githubusercontent.com/u/46420655?v=4',
              }}
              style={styles.headerProfilePicture}
            />
          </TouchableOpacity>
        }
        title={`Welcome back, Elad`}
        subtitle="Planning on recycling more?"
      />
      <ScrollView style={{flex: 1}}>
        <View style={styles.contentView}>
          <Card
            onPress={() => {}}
            innerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 12,
              marginVertical: 12,
            }}>
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
            <Text style={styles.recycledBottlesGreeting}>
              Almost halfway there!
            </Text>
          </Card>
          <Card
            onPress={() => {}}
            innerStyle={{
              marginVertical: 12,
            }}>
            <Top textStyle={{margin: 4}}>
              In the last 4 days you've recycled:
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
              // showValuesOnTopOfBars
              yAxisLabel=""
              yAxisSuffix=""
              width={Dimensions.get('window').width - 48}
              height={200}
              chartConfig={{
                backgroundGradientFrom: colors.surface,
                backgroundGradientFromOpacity: 0,
                backgroundGradientTo: colors.surface,
                backgroundGradientToOpacity: 0,
                decimalPlaces: 0,
                color: opacity => `rgba(139, 255, 113, ${opacity})`,
                barPercentage: 0.5,
                useShadowColorFromDataset: false, // optional
              }}
              style={{marginVertical: 8, alignSelf: 'center'}}
            />
          </Card>
        </View>
      </ScrollView>
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
  });
}

export default Home;
