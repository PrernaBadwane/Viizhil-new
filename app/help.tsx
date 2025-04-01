import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HelpCenter from '@/components/Src/HelpCenter'

const help = () => {
    return (
        <View style={{flex: 1}}>
            <HelpCenter />
        </View>
    )
}

export default help

const styles = StyleSheet.create({})