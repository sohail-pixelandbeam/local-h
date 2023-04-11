import React, { useEffect } from 'react';
import { Animated, View, TouchableOpacity, Text, FlatList, Alert, BackHandler, SafeAreaView } from 'react-native';
import { acolors } from '../constants/colors';
import { fonts } from '../constants/fonts';


function CustomTabBar({ state, descriptors, navigation, position, components }) {

    const tabsFlatListRef = React.useRef();

    useEffect(() => {
        if (state.index !== 3) tabsFlatListRef.current.scrollToIndex({ index: state.index || 0 }), 100;
    }, [state])

    let length = components.length;
    
    if (length == (length - 1 || length - 2 || length - 3) || components.name == ("Description2" || "Images2" || "Title2")) return null

    return (
        <SafeAreaView style={{ backgroundColor: acolors.primary, paddingTop: 10, }}>
            <View style={{ backgroundColor: '#B9B1F0', height: 34, borderRadius: 17, width: "95%", alignSelf: 'center',  }}>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={state.routes}
                    horizontal={true}
                    getItemLayout={(data, index) => (
                        { length: 250, offset: 250 * index, index }
                    )}

                    ref={tabsFlatListRef}
                    renderItem={(route) => {
                        var index = route.index;
                        const { options } = descriptors[route.item.key];
                        const label =
                            options.tabBarLabel !== undefined
                                ? options.tabBarLabel
                                : options.title !== undefined
                                    ? options.title
                                    : route.item.name;

                        const isFocused = state.index === index;

                        const onPress = () => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.item.key,
                                canPreventDefault: true,
                            });

                            if (!isFocused && !event.defaultPrevented) {
                                // The `merge: true` option makes sure that the params inside the tab screen are preserved
                                navigation.navigate({ name: route.item.name, merge: true });
                            }
                            tabsFlatListRef.current.scrollToIndex({ index: index || 0 }), 100;
                        };

                        const onLongPress = () => {
                            navigation.emit({
                                type: 'tabLongPress',
                                target: route.item.key,
                            });
                        };

                        const inputRange = state.routes.map((_, i) => i);
                        const opacity = position.interpolate({
                            inputRange,
                            outputRange: inputRange.map(i => (i === index ? 1 : 1)),
                        });
                        const fontFamily = isFocused ? fonts.MSBo : fonts.MLi
                        return (
                            <TouchableOpacity
                                accessibilityRole="button"
                                accessibilityState={isFocused ? { selected: true } : {}}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                testID={options.tabBarTestID}
                                onPress={onPress}
                                onLongPress={onLongPress}
                                style={{ width: 250, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}
                            >
                                <Animated.Text style={{ color: 'white', opacity, fontFamily }}>
                                    {label}
                                </Animated.Text>
                            </TouchableOpacity>
                        );

                        // })}
                    }}
                />

            </View>
        </SafeAreaView>
    );
}

export default CustomTabBar;