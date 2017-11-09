// Type definitions for react-native-simple-gauge 0.1.5
// Project: https://github.com/nerdyfactory/react-native-simple-gauge
// Definitions by: Adam Lavin <https://github.com/lavoaster>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.5

import * as React from 'react';
import { ViewProperties } from 'react-native';

export interface CircularProgressProps extends ViewProperties {
    size: number;
    fill: number;
    width: number;
    tintColor: string;
    strokeCap: string;
    backgroundColor: string;
    rotation: number;
    cropDegree: number;
}

export interface AnimatedCircularProgressProps extends CircularProgressProps {
    prefill: number;
    tension: number;
    friction: number;
}

export class CircularProgress extends React.Component<CircularProgressProps, any> {}
export class AnimatedCircularProgress extends React.Component<AnimatedCircularProgressProps, any> {}