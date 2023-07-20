import { Platform, StyleSheet } from 'react-native';
import { getWidth, getHeight } from '../../../utils/functions';
import { fonts } from '../../../constants/fonts';
import { acolors } from '../../../constants/colors';


export const styles = StyleSheet.create({
  contaner: { flex: 1, backgroundColor: '#FFFFFF' },
  Nuvv: {
    fontFamily: fonts.PBo,
    fontSize: 32, color: '#FFFFFF',
    textAlign: 'center',
    alignItems: 'center', alignSelf: 'center'
  },
  footer: {
    flexDirection: 'row',
    height: 60,
    alignSelf: 'center',
    padding: 5,
    paddingHorizontal: 10,
    width: getWidth(95),


  },


  inputContainer: {
    elevation: 2,
    shadowOpacity: 0.6,
    shadowColor: '#dedede',
    shadowRadius: 2,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    backgroundColor: '#ffff',
    width: getWidth(79),
    borderRadius: 10,
    // borderWidth: 0.5,
    height: 50,
    marginLeft: getWidth(2),
    flexDirection: 'row',
    alignItems: 'center',
  },

  // inputContainer: {
  //   borderBottomColor: '#F5FCFF',
  //   // backgroundColor: '#2A0B3705',
  //   backgroundColor: 'rgba(42, 11, 55, 0.1)',
  //   borderRadius: 5,
  //   height: 45,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   flex: 1,

  // },

  // inputs: {
  //   height: 40,
  //   marginLeft: 16,
  //   flex: 1,
  // },

  inputs: {
    height: 40,
    marginLeft: 16,
    color: '#222222',
    fontFamily: fonts.PRe,
    borderBottomColor: '#2A0B3705',

    flex: 1,
    // paddingTop: Platform.OS == 'android' ? getHeight(1) : getHeight(0.25)
  },

  // btnSend: {
  //   backgroundColor: 'white',
  //   width: 25,
  //   height: 40,
  //   borderRadius: 10,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },

  btnSend: {
    width: 40,
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: 5,

    marginTop: getHeight(2)
  },


  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    width: getWidth(90),
    height: getHeight(50),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    marginLeft: getWidth(75),
    marginTop: getHeight(1)
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#ffffff',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',


  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 13,
    margin: 3,
  },
  senderBubble: {
    paddingHorizontal: 15, paddingVertical: 15, borderRadius: 10,
    backgroundColor: '#ffffff',
    maxWidth: getWidth(50),
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
    elevation: 2,
    shadowOpacity: 0.6,
    shadowColor: '#dedede',
    shadowRadius: 2,
    shadowOffset: {
      width: 2,
      height: 2,
    }
  },
  recieverBubble: {
    paddingHorizontal: 15, paddingVertical: 15, borderRadius: 10, backgroundColor: acolors.primaryLight,
    maxWidth: getWidth(50),
    alignSelf: 'flex-start',
    borderTopLeftRadius: 0
  },
  senderText: {
    fontFamily: fonts.PMe,
    fontSize: 14,
    color: '#03030B'
  },
  recieverText: {
    fontFamily: fonts.PMe,
    fontSize: 14,
    color: 'white',
  },
  username: {
    fontFamily: fonts.PMe,
    fontSize: 10,
    color: '#03030B',
    marginBottom: getHeight(0.5)
  },
  groupInfoContainer: {
    alignSelf: 'center',
    width: "80%",
    paddingVertical: 10,
    backgroundColor: '#DBDCF8',
    borderRadius: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  pendingMemberText: {
    color: '#03030B',
    fontFamily: fonts.PMe,
    fontSize: 12,
  },
  joinedMemberText: {
    color: '#494761',
    fontFamily: fonts.PMe,
    fontSize: 12,
  },
  dateText: {
    color: '#494761',
    fontFamily: fonts.PMe,
    fontSize: 12,
  },
  joinGroupText: {
    color: 'white',
    fontSize: 15,
    fontFamily: fonts.PMe,
    alignSelf: 'center',
  }
});