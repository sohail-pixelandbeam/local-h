import React from 'react';
import { View, Text, TextInput } from 'react-native';

export default function Input({
    type,
    placeHolder,
    value,
    multiline,
    maxLength,
    style,
    editable,
    secure,
    label,
    labelStyle,
    onChangeText,
    onBlur,
}) {
    return (
        <View style={{ width: '100%', marginTop: 18 }}>
            {label ? (
                <Text
                    style={{
                        color: '#2A2A2A',
                        zIndex: 10,
                        marginBottom: 11,
                        fontSize: 14,
                        ...labelStyle,
                    }}>
                    {label}
                </Text>
            ) : null}
            <TextInput
                editable={editable}
                multiline={multiline}
                value={value}
                maxLength={maxLength}
                secureTextEntry={secure}
                onChangeText={onChangeText}
                onBlur={onBlur}
                keyboardType={type ? type : 'default'}
                placeholder={placeHolder ? placeHolder : ''}
                placeholderTextColor="#a0a0a0"
                style={{
                    width: '100%',
                    borderRadius: 10,
                    borderColor: '#00000066',
                    borderWidth: 1,
                    height: multiline ? 'auto' : 38,
                    paddingLeft: 15,
                    color: '#000',
                    ...style,
                }}
            />
        </View>
    );
}
