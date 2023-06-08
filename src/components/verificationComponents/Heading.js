import { Text } from 'react-native';
import React from 'react';
import { fonts } from '../../constants/fonts';

export default function Heading({
    fontSize = 21,
    color = '#5B4DBC',
    children,
    style,
}) {
    return (
        <Text
            style={{
                fontFamily: fonts.MBo,
                fontSize: fontSize,
                color: color,
                fontWeight: '600',
                ...style,
            }}>
            {children}
        </Text>
    );
}
