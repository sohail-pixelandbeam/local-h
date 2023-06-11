
import React from "react";
import { View, Text, TouchableOpacity, TextInput, Modal, FlatList } from "react-native";



// import DownA from "./Svgs/DownA";
import { ArrowDown as PickerArrowDown } from "./Svgs";
import { fonts } from "../constants/fonts";
import { acolors } from "../constants/colors";
import GeneralStatusBar from "./GernalStatusBar";


interface dataType {
  title: "",
  value: ""
}

interface Props {
  data: any,
  selected: any,
  onValueChange: (i, v) => void,
  titleStyle: any,
  onPressModal: () => void
}

const PrivacyPicker = (props: Props) => {


  const [data, setData] = React.useState(props.data);
  const [filteredData, setFilteredData] = React.useState(props.data);
  const [modal, setModal] = React.useState(false);
  var temp = props.selected
  if (!temp.title) temp.title = 'Select'
  // console.log(temp)
  const [current, setCurrnet] = React.useState(temp);


  const do_filter = (str: any) => {
    str = str.toLowerCase();
    var all = data;
    var filtered_data = all.filter((v: any) => {
      var value = v?.title?.toString().toLowerCase()
      return value?.includes(str) ? true : false
    })
    setFilteredData(filtered_data);
  }



  const headerPicker = () => {
    return (
      <View style={{ backgroundColor: acolors.primary, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 15, paddingBottom: 10 }}>
        <TouchableOpacity
          style={{ marginLeft: 3, }}
          onPress={() => {
            // onPressModal()
            setModal(false)
          }}
        >
          <Text style={{ color: '#fff', fontFamily: fonts.Pre, }}>Close</Text>
        </TouchableOpacity>
        <Text style={{ color: "white", fontSize: 20, alignSelf: 'center', fontFamily: fonts.PRe, marginRight: 10 }}>Choose</Text>
        <View />


      </View>
    )
  }
  const fresh_start = () => {

    setFilteredData(props.data);
    setModal(true)

  }
  const search = () => {
    return (
      <View style={{
        backgroundColor: "#ccc",
        paddingVertical: 5,
        paddingHorizontal: 10,
        width: "100%",
      }}>
        <TextInput
          placeholder={"Search"}
          placeholderTextColor={"#7b7b7b"}
          autoCapitalize={"none"}
          onChangeText={(v) => {
            do_filter(v)
          }}
          style={{
            backgroundColor: "#fff",
            borderRadius: 15,
            paddingVertical: 5,
            paddingHorizontal: 10,
            fontSize: 14,
            fontFamily: fonts.PRe,
            color: "#7b7b7b"
          }}
        />
      </View>
    )
  }
  return (
    <View style={{ width: '100%', paddingRight: 1, }} >
      <TouchableOpacity
        onPress={() => {
          fresh_start()

        }}
        style={[{ width: "100%" }]}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 5 }}>
          <Text style={[{ color: acolors.grey, fontSize: 14, fontFamily: fonts.PSBo }, props.titleStyle]}>{current.title}</Text>
          <PickerArrowDown />
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modal}
        onRequestClose={() => {
          setModal(false)
        }}
      >
        <GeneralStatusBar barStyle={"light-content"} />

        <View>
          {headerPicker()}
          {search()}
          <FlatList
            data={filteredData}
            contentContainerStyle={{ paddingBottom: 150 }}
            keyExtractor={(item, index) => String(index)}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                selected={item.title === current.title}
                button

                onPress={() => {
                  setModal(false)
                  props.onValueChange(index, item);
                  setCurrnet(item)

                }}
              >
                <View style={{ paddingLeft: 10, marginTop: 5, borderBottomWidth: 0.5, padding: 10 }}>
                  <Text style={{ color: acolors.grey, fontSize: 20, fontFamily: fonts.Pre }}>
                    {item.title}
                  </Text>
                </View>
                <View>
                  {/* {(item.title === current.title) ? (
                    <Radio selected />
                  ) : (
                    <Radio selected={false} />
                  )} */}
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>);

};
export default PrivacyPicker;
