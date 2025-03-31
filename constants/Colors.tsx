const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};
export const COLORS = {
  GroceryPrimaryColor:'#376E46',
  PickerLabelColor:'#BEBEBE',
  PickerTextColor:'#000',
  fontBaseClr:'#1E1E1E',
}

export const PADDING = {
  padding:10,
  horizontal_sml:5,
  horizontal_med:8,
  horizontal_lg:13,
  vertical_sml:5,
  vertical_med:8,
  vertical_lg:13,

    // margins to be used for the overall application
    miniPad:8,
    smlPad:12,
    medPad:14,
    largePad:16,
}

export const MARGIN = {
  horizontal_sml:5,
  horizontal_med:8,
  horizontal_lg:13,
  vertical_sml:5,
  vertical_med:8,
  vertical_lg:13,
  
  // margins to be used for the overall application
  miniMar:8,
  smlMar:12,
  medMar:14,
  largeMar:16,
}


export const CommonStyles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 13,
    bottom:5
},
Addbutton:{
  height: 30,
  backgroundColor: "#376F46",
  justifyContent: "center",
  width: 70,
  alignItems: "center",
  // margin: 10,
  alignSelf: "flex-end",
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#376F46"
},
placeholdercolor:{
  fontSize:14,
  fontWeight:'500',
  color:'#2B2827'
},
lrgHead:{
  fontSize: 22,
  color: COLORS.fontBaseClr,
  fontWeight:'800'
},
mdText:{
  fontSize: 14,
  color: COLORS.fontBaseClr,
},
})


