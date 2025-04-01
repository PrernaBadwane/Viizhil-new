import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GroceryProduct from '@/components/Src/GroceryProduct'

const grocery = () => {
  return (
    <View style={{flex: 1}}>
    <GroceryProduct   />
    </View>
  )
}

export default grocery

const styles = StyleSheet.create({})