import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Documentupload from '@/components/Src/StoreDetails/DocumentUpload/Documentupload'

const upload = () => {
  return (
    <View style={{flex:1}}>
      <Documentupload />
    </View>
  )
}

export default upload

const styles = StyleSheet.create({})