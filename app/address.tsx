import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Addresspage from '@/components/Src/Addresspage'

const address = () => {
  return (
    <View style={{flex:1}}>
      <Addresspage />
    </View>
  )
}

export default address

const styles = StyleSheet.create({})