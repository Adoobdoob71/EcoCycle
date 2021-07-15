import * as React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {IStep, Labels} from 'rn-tourguide';
import Button from './Button';
import RippleButton from './RippleButton';
import Row from './Row';

export interface TooltipProps {
  isFirstStep?: boolean;
  isLastStep?: boolean;
  currentStep: IStep;
  labels?: Labels;
  handleNext?(): void;
  handlePrev?(): void;
  handleStop?(): void;
  colors?: ReactNativePaper.ThemeColors;
}

export const Tooltip = ({
  isFirstStep,
  isLastStep,
  handleNext,
  handlePrev,
  handleStop,
  currentStep,
  labels,
}: TooltipProps) => {
  const {colors} = useTheme();
  const styles = classes(colors);

  return (
    <View
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          width: '80%',
        },
        styles.tooltipBackground,
      ]}>
      <View style={{padding: 8}}>
        <Text testID="stepDescription" style={styles.tooltipText}>
          {currentStep && currentStep.text}
        </Text>
      </View>
      <Row style={{alignItems: 'center'}}>
        {!isLastStep ? (
          <TouchableOpacity onPress={handleStop}>
            <View style={styles.navButton}>
              <Text style={styles.navButtonText}>{labels?.skip || 'Skip'}</Text>
            </View>
          </TouchableOpacity>
        ) : null}
        {!isFirstStep ? (
          <TouchableOpacity onPress={handlePrev}>
            <View style={styles.navButton}>
              <Text style={styles.navButtonText}>
                {labels?.previous || 'Previous'}
              </Text>
            </View>
          </TouchableOpacity>
        ) : null}
        {!isLastStep ? (
          <TouchableOpacity onPress={handleNext}>
            <View style={styles.navButton}>
              <Text style={styles.navButtonText}>{labels?.next || 'Next'}</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleStop}>
            <View style={styles.navButton}>
              <Text style={styles.navButtonText}>
                {labels?.finish || 'Finish'}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </Row>
    </View>
  );
};

function classes(colors: any) {
  return StyleSheet.create({
    tooltipBackground: {
      backgroundColor: colors.surface,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderRadius: 8,
      elevation: 4,
    },
    tooltipText: {
      color: colors.text,
      fontSize: 14,
    },
    navButton: {
      padding: 8,
    },
    navButtonText: {
      color: colors.primary,
      fontWeight: 'bold',
    },
  });
}

export default Tooltip;
