import React from 'react';
import {View, StyleSheet, Animated, Easing} from 'react-native';
import {useTheme} from 'react-native-paper';
import {StyleProperty} from '../utils/Types';

interface ProgressBarProps {
  value: number;
  outerStyle?: StyleProperty;
  innerStyle?: StyleProperty;
}

const ProgressBar: React.FC<ProgressBarProps> = props => {
  const [progressBarWidth, setProgressBarWidth] = React.useState(0);

  const progressAnim = React.useRef(new Animated.Value(0)).current;

  const {colors} = useTheme();
  const styles = classes(colors);

  const progressIn = () => {
    Animated.timing(progressAnim, {
      toValue: props.value * 100,
      duration: 2000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  React.useEffect(() => {
    progressIn();
    progressAnim.addListener(anim => setProgressBarWidth(anim.value));
  }, []);

  return (
    <View style={[styles.progressBarBackground, props.outerStyle]}>
      <Animated.View
        style={[
          styles.progressBarProgress,
          props.innerStyle,
          {
            width: `${progressBarWidth}%`,
          },
        ]}></Animated.View>
    </View>
  );
};

function classes(colors: ReactNativePaper.ThemeColors) {
  return StyleSheet.create({
    progressBarBackground: {
      flexDirection: 'row',
      backgroundColor: colors.placeholder,
      borderRadius: 10,
      height: 12,
    },
    progressBarProgress: {
      backgroundColor: colors.primary,
      borderRadius: 10,
      height: 12,
      width: 2,
    },
  });
}

export default ProgressBar;
