import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { acolors } from '../constants/colors';

const CarouselDots = (props) => {
  const dots = [];
  for (let index = 0; index < props.count; index++) {
    if (props.selectedIndex === index) {
      dots.push(
        <View key={index + 1} style={[styles.dotsContainer,
        { marginLeft: 13, marginRight: 16 }]}>
          <View style={{
            backgroundColor: acolors.primary,
            alignSelf: 'center',
            width: 34,
            height: 6,
            borderRadius: 6,
          }} />
        </View>
      );
    } else {
      <View style={{ borderColor: 'white' }} />
      dots.push(
        <View key={index + 1}
          style={[styles.dotsContainer]}>
          <View style={{
            width: 20,
            height: 4,
            backgroundColor: 'grey',
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center'
          }} />
        </View>
      );
    }
  }
  return (
    <View style={{ ...styles.container, ...props.style }}>
      <View style={{ flexDirection: 'row' }}>
        {dots}
      </View>
      <Text>{props.label}</Text>
      {/* {(props.selectedIndex <= 1 || props.showSkip) && (<View>
        <TouchableOpacity
          onPress={props.skipPress}
        >
          <Text style={{ color: 'yellow', fontSize: 14, fontFamily: 'Roboto-Bold' }}>Skip</Text>
        </TouchableOpacity>
      </View>)} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    marginHorizontal: 25,
    marginTop: 15,
    marginBottom: 15,
    height: 'auto',
  },

  labelText: {},
  dotsContainer: {
    marginRight: 4,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: 'center',
  },
});

export default CarouselDots;
