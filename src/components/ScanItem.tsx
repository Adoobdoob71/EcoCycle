import React from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import {useTheme} from 'react-native-paper';
import {RecyclingDataType, StyleProperty} from '../utils/Types';
import {Row, Card, Surface} from './';
import {Menu} from 'react-native-paper';
interface ScanItemProps extends RecyclingDataType {
  outerStyle?: StyleProperty;
}

const ScanItem: React.FC<ScanItemProps> = props => {
  const {colors} = useTheme();
  const styles = classes(colors);

  return (
    <View
      style={[
        props.outerStyle,
        {
          flexDirection: 'row',
          borderWidth: 1,
          borderColor: colors.primary,
          padding: 0,
          backgroundColor: colors.surface,
          borderRadius: 12,
        },
      ]}>
      <Stat
        title="All"
        detail={`${props.all_items}`}
        colors={colors}
        styles={styles}
      />
      <View
        style={{
          height: '80%',
          width: 1,
          borderRadius: 8,
          backgroundColor: colors.text,
          alignSelf: 'center',
        }}></View>
      <Stat
        title="Bottles"
        detail={`${props.bottles}`}
        colors={colors}
        styles={styles}
      />
      <View
        style={{
          height: '80%',
          width: 1,
          borderRadius: 8,
          backgroundColor: colors.text,
          alignSelf: 'center',
        }}></View>
      <Stat
        title="Paper"
        detail={`${props.paper_items}`}
        colors={colors}
        styles={styles}
      />
      <View
        style={{
          height: '80%',
          width: 1,
          borderRadius: 8,
          backgroundColor: colors.text,
          alignSelf: 'center',
        }}></View>
      <Stat
        title="Metallic"
        detail={`${props.paper_items}`}
        colors={colors}
        styles={styles}
      />
    </View>
  );
};

const Stat: React.FC<{
  title: string;
  detail: string;
  styles: any;
  colors: ReactNativePaper.ThemeColors;
}> = ({title, detail, styles, colors}) => {
  return (
    <Row style={{flex: 1, alignItems: 'center'}}>
      <View style={styles.statBackground}>
        <Text style={styles.statTitle}>{title}</Text>
        <Text style={styles.statDetail}>{detail}</Text>
      </View>
    </Row>
  );
};

function classes(colors: ReactNativePaper.ThemeColors) {
  return StyleSheet.create({
    removeButton: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    statBackground: {
      alignItems: 'center',
      padding: 8,
      flex: 1,
    },
    statTitle: {
      fontSize: 14,
      color: colors.text,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    statDetail: {
      fontSize: 12,
      color: colors.text,
    },
  });
}

export default ScanItem;
