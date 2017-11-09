import * as React from 'React';
import { AnimatedGaugeProgress } from 'react-native-simple-gauge';
import { StyleSheet, Text, View } from 'react-native';
import round from 'lodash-es/round';
import forEach from 'lodash-es/forEach';

interface IGaugeProps {
  value: number;
  max?: number;
  unit?: string;
  description?: string;
  displayRawValue?: boolean;
  displayValueRound?: number;
  thresholds?: {
    [percentage: number]: string;
  }
}

const size = 100;
const width = 5;
const cropDegree = 120;
const textOffset = width * 2;
const textWidth = size - (textOffset * 2);
const textHeight = size * (1 - cropDegree / 360) - (textOffset * 2);

const styles = StyleSheet.create({
  view: {
    marginBottom: -25,
  },
  textView: {
    position: 'absolute',
    top: textOffset * 2,
    left: textOffset,
    width: textWidth,
    height: textHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeValue: {
    fontSize: 25,
  },
  gaugeText: {
    fontSize: 15,
  },
});

export default class Gauge extends React.Component<IGaugeProps> {
  static defaultProps = {
    max: 100,
    displayRawValue: false,
  };

  render() {
    const { value, max, unit, description, displayRawValue, displayValueRound, thresholds } = this.props;
    const calculatedValue = value > 0 ? round((value / max) * 100, 0) : 0;
    const displayValue = round(displayValue, displayValueRound);
    let color = 'black';

    if (thresholds) {
      forEach(thresholds, (value, key) => {
        if (key > calculatedValue) {
          return;
        }

        color = value;
      });
    }

    return (
      <View style={styles.view}>
        <AnimatedGaugeProgress
          size={size}
          width={width}
          tintColor={color}
          fill={calculatedValue}
          cropDegree={cropDegree}
        >
          {(fill) => (
            <View style={styles.textView}>
              <Text style={styles.gaugeValue}>
                {displayRawValue ? displayValue : calculatedValue}{unit ? ' ' + unit : null}
              </Text>

              <Text style={styles.gaugeText}>
                {description}
              </Text>
            </View>
          )}
        </AnimatedGaugeProgress>
      </View>
    );
  }
}
