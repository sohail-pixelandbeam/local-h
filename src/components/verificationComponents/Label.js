import React from 'react';
import { View, Text, TextInput } from 'react-native';

export default function Label({ children, style }) {
    return (
        <Text
            style={{
                color: '#2A2A2A',
                zIndex: 10,
                marginVertical: 11,
                fontSize: 14,
                ...style,
            }}>
            {children}
        </Text>
    );
}
