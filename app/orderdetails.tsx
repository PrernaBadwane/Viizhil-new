import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import OrderDetailsPage from '@/components/Src/OrderDetailsPage'

const orderdetails = () => {
  return (
    <View style={{flex: 1}}>
     <OrderDetailsPage />
    </View>
  )
}

export default orderdetails

const styles = StyleSheet.create({})