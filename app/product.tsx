import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AddProductList from '@/components/Src/StoreDetails/Addproductlist'

const product = () => {
  return (
    <View style={{flex:1}}>
     <AddProductList  />
    </View>
  )
}

export default product

const styles = StyleSheet.create({})