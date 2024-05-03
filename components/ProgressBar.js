import React, { useEffect, useRef, useState } from 'react';
import { Animated, View } from 'react-native';
import { color } from '../constants/color';

export default function Progress({ now, max, height }) {
    const [width, SetWidth] = useState(0);
    const animatedValue = useRef(new Animated.Value(-1000)).current;
    const reactive = useRef(new Animated.Value(-1000)).current;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: reactive,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [])
    useEffect(() => {
        reactive.setValue(-width + width * now / max);

    }, [now, width])

    return (
        <View
            onLayout={e => {
                const newWidth = e.nativeEvent.layout.width;

                SetWidth(newWidth);
            }}
            style={{
                height,
                backgroundColor: color.disabledbtn,
                borderRadius: height,
                overflow: 'hidden',

            }}>
            <Animated.View style={{
                height,
                width: '100%',
                backgroundColor: color.blue,
                borderRadius: height,
                position: 'absolute',
                left: 0,
                top: 0,
                transform: [{
                    translateX: animatedValue,
                }]

            }} />
        </View>
    )
}
