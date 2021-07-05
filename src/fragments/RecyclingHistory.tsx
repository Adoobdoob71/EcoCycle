import React from 'react';
import {SafeAreaView, View, StyleSheet, Dimensions} from 'react-native';
import {Top} from '../components';
import {BarChart} from 'react-native-chart-kit';
import {useTheme} from 'react-native-paper';
import {convertOpacityToHex} from '../utils/usefulFunctions';

const RecyclingHistory: React.FC = () => {
  const {colors} = useTheme();
  return (
    <SafeAreaView>
      <Top textStyle={{margin: 4, marginVertical: 2}}>Recycling history</Top>
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
    </SafeAreaView>
  );
};

export default RecyclingHistory;
