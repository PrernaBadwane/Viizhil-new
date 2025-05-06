import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AddressPage from '@/components/Src/StoreDetails/AddressPage/Addresspage'

const address = () => {
  return (
    <View style={{flex:1}}>
      <AddressPage />
    </View>
  )
}

export default address

const styles = StyleSheet.create({})