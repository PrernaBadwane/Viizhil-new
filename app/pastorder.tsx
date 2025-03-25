import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PastOrdersPage from '@/components/Src/PastOrdersPage'

const pastorder = () => {
  return (
    <View style={{flex: 1}}>
     <PastOrdersPage />
    </View>
  )
}

export default pastorder

const styles = StyleSheet.create({})