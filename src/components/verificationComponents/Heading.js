import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function Heading({
    fontSize = 21,
    color = '#5B4DBC',
    children,
    style,
}) {
    return (
        <Text
            style={{
                fontSize: fontSize,
                color: color,
                fontWeight: '600',
                ...style,
            }}>
            {children}
        </Text>
    );
}
