import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';

interface PropsTypes {
  action: () => void;
  btnTxt: string;
  loading?: boolean; // Optional loading prop
}

export default function PrimaryBtn(props: PropsTypes) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={props.action}
        disabled={props.loading}
      >
        {props.loading ? (
          <View style={styles.loaderContainer}>
            <Text style={styles.buttonText}>{props.btnTxt}</Text>
            <ActivityIndicator size="small" color="#81C784" style={styles.loader} />
          </View>
        ) : (
          <Text style={styles.buttonText}>{props.btnTxt}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', 
    marginBottom: 20,
  },
  button: {
    borderWidth: 2,
    borderColor: '#81C784', 
    borderRadius: 30, 
    paddingVertical: 12,
    paddingHorizontal: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', 
  },
  buttonText: {
    color: '#81C784', 
    fontSize: 18,
    fontWeight: 'bold',
  },
  loaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loader: {
    marginLeft: 10,
  },
});
