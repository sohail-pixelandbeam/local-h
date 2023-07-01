import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import CarouselDots from './CarouselDots';
import { BackIcon } from './Svgs';



const { width: screenWidth } = Dimensions.get("window");


const ImageSliderModal = ({
    data,
    isVisible = false,
    initialScrollIndex = 0,
    onClose = () => { }
}) => {

    const ref = React.useRef();
    console.log('initialScrollIndex',initialScrollIndex)
    const [indicator, setIndicator] = useState(initialScrollIndex);


    const onScrollEnd2 = (e) => {
        let contentOffset = e.nativeEvent.contentOffset;
        let viewSize = e.nativeEvent.layoutMeasurement;
        let pageNum = Math.floor(contentOffset.x / viewSize.width);
        setIndicator(pageNum);
    };

    useEffect(()=>{
        setIndicator(initialScrollIndex)
    },[initialScrollIndex])

    return (
        <ReactNativeModal
            isVisible={isVisible}
            style={{ margin: 0 }}
        >
            
            <View style={{ backgroundColor: 'black', height: "100%" }}>
                
                <FlatList
                    ref={ref}
                    data={data}
                    initialScrollIndex={initialScrollIndex}
                    pagingEnabled
                    onMomentumScrollEnd={(e) => onScrollEnd2(e)}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={1900}
                    getItemLayout={(data, index) => (
                        { length: screenWidth, offset: screenWidth * index, index }
                    )}
                    renderItem={({ item }) => {
                        return (
                            <View
                                style={{
                                    width: screenWidth,
                                    paddingBottom: 10,
                                    paddingBottom: 10,
                                    alignSelf: "center",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Image
                                    // source={require('../../../static_assets/image.png')}
                                    source={{ uri: item }}
                                    style={{ height: 300, resizeMode: 'cover', top: 0, width: "100%" }}
                                />

                            </View>
                        );
                    }}
                />
                <CarouselDots
                    selectedIndex={indicator}
                    count={data?.length}
                    style={{ alignSelf: "center", marginTop: 0 }}
                />
                <TouchableOpacity
                    style={{ position: 'absolute', top: 20, left: 0, padding: 20 }}
                    onPress={() => onClose()}
                >
                    <BackIcon />
                </TouchableOpacity>
            </View>
        </ReactNativeModal>
    );
};

const styles = StyleSheet.create({

});

export default ImageSliderModal;