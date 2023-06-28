import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

const ImageSlider = ({ images, size = 40 }) => {
    itemWidth = size;
    itemHeight = size;

    return (
        <View style={styles.container}>
            <Swiper
                style={styles.wrapper}
                showsPagination={false}
                // loop={true}
                onIndexChanged={index => console.log(`Active index: ${index}`)}
                renderPrevButton={() => null}
                renderNextButton={() => null}
                itemWidth={itemWidth}
                itemHeight={itemHeight}
                activeSlideOffset={itemWidth * 0.1}
                activeSlideScale={0.8}
                inactiveSlideOpacity={0.8}
                // autoplay={true}
                contentContainerCustomStyle={styles.contentContainer}
                removeClippedSubviews={false}
            >
                {images.map((image, index) => (
                    <View key={index} style={styles.slide}>
                        {index - 1 > 0 && (
                            <Image
                                source={{ uri: images[index - 2] }}
                                style={[styles.imageLeftMost]}
                            />
                        )}
                        {index !== 0 && (
                            <Image source={{ uri: images[index - 1] }} style={[styles.imageLeft]} />
                        )}
                        <Image
                            source={{ uri: image }}
                            style={[styles.image, { width: itemHeight, height: itemWidth }]}
                        />
                        {index + 1 !== images.length && (
                            <Image source={{ uri: images[index + 1] }} style={[styles.imageRight]} />
                        )}
                        {index + 2 < images.length && (
                            <Image
                                source={{ uri: images[index + 2] }}
                                style={[styles.imageRightMost]}
                            />
                        )}
                    </View>
                ))}
            </Swiper>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 90,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {},
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    image: {
        resizeMode: 'cover',
        zIndex: 3,
    },
    imageLeft: {
        position: 'absolute',
        left: 10,
        zIndex: 2,
        width: 32,
        height: 32,
        // opacity: 0.8,
    },
    imageLeftMost: {
        position: 'absolute',
        left: 1,
        zIndex: 1,
        width: 25,
        height: 25,
        opacity: 0.5,
    },
    imageRight: {
        position: 'absolute',
        zIndex: 2,
        right: 10,
        width: 32,
        height: 32,
        // opacity: 0.8,
    },
    imageRightMost: {
        position: 'absolute',
        right: 1,
        zIndex: 1,
        width: 25,
        height: 25,
        opacity: 0.5,
    },
});

export default ImageSlider;