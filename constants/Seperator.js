import React from 'react';
import { View } from 'react-native';
import { color } from './color';
const Separator = () => {
    return (
        <View style={{ borderBottomWidth: 1, margin: 0, padding: 0, width: '100%', opacity: 0.2, color: color.disabledbtn }} />
    );
}

export default Separator;
