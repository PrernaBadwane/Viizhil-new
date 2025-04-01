import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PointsPage from '@/components/Src/PointsPage'

const points = () => {
  return (
    <View style={{flex:1}}>
      <PointsPage />
    </View>
  )
}

export default points

const styles = StyleSheet.create({})