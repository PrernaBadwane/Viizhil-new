import { COLORS } from '@/constants/Colors';
import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet,Clipboard } from 'react-native';
// import Clipboard from "react-native-clip"

interface OtpProps {
  value: any,
  onChangeText: any,
  error: any,
  clearOTP: any
  onSubmitEditing:any
}

const SixDigitInput = (props: OtpProps) => {
  const [codes, setCodes] = useState(['', '', '', '', '', '']);
  const inputs = Array(6).fill(0).map((_, i) => useRef(null));

  const handleChangeText = (text: string, index: number) => {
    // Ensure only digits are entered
    const regex = /^[0-9]*$/;
    if (regex.test(text)) {
      const newCodes = [...codes];
      newCodes[index] = text;
      setCodes(newCodes);
      const fullCode = newCodes.join('');
      props.onChangeText(fullCode);
      // props.error("")
      // Move focus to the next input
      if (text !== '' && index < 5) {
        inputs[index + 1].current.focus();
      } else if (text === '' && index > 0) {
        inputs[index - 1].current.focus();
      }
    }
  };
  const handlePasteFromClipboard = async (index: number) => {
    try {
      const clipboardText = await Clipboard.getString();
      if (clipboardText.length === 6 && /^\d+$/.test(clipboardText)) {
        const newCodes = clipboardText.split('').slice(0, 6);
        setCodes(newCodes);
        props.onChangeText(clipboardText);
        if (index < 5) {
          inputs[index + 1].current?.focus();
        }
      }
    } catch (error) {
      console.error('Error pasting from clipboard:', error);
    }
  };
  useEffect(()=>{
handlePasteFromClipboard();
  },[])
  const handleBackspace = (index) => {
    // Move focus to the previous input when backspace is pressed
    if (index > 0 && codes[index] === '') {
      inputs[index - 1].current.focus();
    }
  };

  useEffect(() => {
    // Automatically focus the first input when the component mounts
    inputs[0].current.focus();
  }, []);

  useEffect(() => {
    if (props.clearOTP === '1') {
      setCodes(['', '', '', '', '', '']);
      // Reset focus to the first input after clearing OTP
      inputs[0].current.focus();
    }
  }, [props.clearOTP]);

  function onSubmitEditing() {
    props.onSubmitEditing()
  }

  return (
    <View style={styles.container}>
      {codes.map((code, index) => (
        <TextInput
          autoComplete="sms-otp" // android
          textContentType="oneTimeCode" // ios
          key={index}
          ref={inputs[index]}
          style={[
            styles.input,
            props.error && { borderColor: 'red' }, // Change border color to red when isError is true
          ]}
          onChangeText={(text) => handleChangeText(text, index)}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace') {
              handleBackspace(index);
            }
          }}
          value={code}
          keyboardType="numeric"
          maxLength={1}
          onSubmitEditing={onSubmitEditing}
        />
      ))}
    </View>
  );
};

export default SixDigitInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    // borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    width: 50, // Adjust width as needed
    textAlign: 'center',
    marginHorizontal: 4,
    backgroundColor:'#E7E7E7'
  },
});
