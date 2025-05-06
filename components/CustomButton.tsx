import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'


interface CustomButtonProps {
  onPress?: () => void;
  isRegister?: boolean;
  signupLabel?: string;
  buttonLabel?: string;
  disabled?: boolean;
  loading?: boolean;
}
export default function CustomButton({ onPress, isRegister, signupLabel, buttonLabel, disabled, loading }: CustomButtonProps) {
  return (
    <View style={{ marginVertical: 8 }}>
      {isRegister ? <TouchableOpacity style={styles.button1} onPress={onPress}>

        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>{signupLabel}</Text>
        </View>
      </TouchableOpacity> : <TouchableOpacity disabled={disabled} style={styles.button2} onPress={onPress}>
        {loading ? <ActivityIndicator size={30} color="#FFF" /> :
          <Text style={{ color: '#FFFFFF', fontFamily: 'Urbanist', fontWeight: '700', fontSize: 18 }}>{buttonLabel}</Text>
        }
      </TouchableOpacity>}

    </View>
  )
}

const styles = StyleSheet.create({
  button1: {
    height: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#FF9800',
  },
  button2: {
    height: 50,
    backgroundColor: '#F47927',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#FF9800',
    fontFamily: 'Urbanist',
    fontWeight: '600',
    fontSize: 18,
  },
  icon: {
    width: 25,  // Set the size of the icon
    height: 25, // Set the size of the icon
    marginRight: 10, // Space between icon and text
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});