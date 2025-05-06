import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Image,TouchableOpacity } from 'react-native';

interface CustomTextInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  isPhone?: boolean;
  isSignUp?: boolean;
  imgPath?:string;
  countryCode?:string;
  onCodeClick?:()=>void;
  keyboardType?:string;
  editable?:boolean;
  disabled?:boolean;
}

export default function CustomTextInput({ placeholder, value, onChangeText, isPhone, isSignUp ,imgPath,countryCode,onCodeClick,keyboardType,editable,disabled}: CustomTextInputProps) {

  const handleChangeText = (input: string) => {
    if (onChangeText) {
      onChangeText(input);
    }
  };

  return (
    <View style={isSignUp ? styles.container : styles.container2}>
      {isPhone &&
        <TouchableOpacity disabled={disabled} onPress={onCodeClick} style={styles.codeContainer}>
          <Text style={styles.countryCode}>{countryCode}</Text>
        </TouchableOpacity>
      }
      {isSignUp && (!isPhone)&& <Image source={imgPath} style={styles.icon} resizeMode='contain' />
      }
      <TextInput
        style={{...styles.input,color:editable?'black':'gray'}}
        placeholder={placeholder}
        value={value}
        onChangeText={handleChangeText}
        placeholderTextColor="gray"
        keyboardType={keyboardType}
        editable={editable}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderRadius: 5,
    width: '100%'
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#F3F3F3'
  },
  container2: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1E1E1E",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginVertical: 10
  },
  codeContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 10,
    borderRightWidth: 1,
    borderRightColor: "#ccc",
  },
  countryCode: {
    fontSize: 16,
    fontWeight: "400",
    color: 'gray'
  },
  icon: {
    width: 20, // Adjust the width as per your needs
    height: 20, // Adjust the height as per your needs
    marginRight: 10, // Space between the icon and the input
  },
});
