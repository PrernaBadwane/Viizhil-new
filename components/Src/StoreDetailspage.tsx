import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import NavigationHeader from '@/app/commonComponts/NavigationHeader'
import { PADDING } from '@/constants/Colors'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronRight, faStore } from '@fortawesome/free-solid-svg-icons'
import { router } from 'expo-router'

const StoreDetailspage = () => {
  return (
    <SafeAreaView>
      <NavigationHeader name='Store Details' />
      <View style={{ ...styles.container }}>
        <TouchableOpacity style={styles.card} onPress={()=>router.push('/storeinfo')}>
          <View>
            <Image source={require('../../assets/images/storepage.png')} style={{ width: 30, height: 30 }} />
          </View>
          <Text style={styles.text}>Store Info</Text>
          <View style={styles.chevronContainer}>
            <FontAwesomeIcon icon={faChevronRight} size={14} color="#000" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={()=>{router.push('/upload')}}>
          <View>
            <Image source={require('../../assets/images/documentupload.png')} style={{ width: 30, height: 30 }} />
          </View>
          <Text style={styles.text}>Document upload</Text>
          <View style={styles.chevronContainer}>
            <FontAwesomeIcon icon={faChevronRight} size={14} color="#000" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={()=>router.push('/address')}>
          <View>
            <Image source={require('../../assets/images/address.png')} style={{ width: 30, height: 30 }} />
          </View>
          <Text style={styles.text}>Address</Text>
          <View style={styles.chevronContainer}>
            <FontAwesomeIcon icon={faChevronRight} size={14} color="#000" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={()=>router.push('/product')}>
          <View>
            <Image source={require('../../assets/images/productlist.png')} style={{ width: 30, height: 30 }} />
          </View>
          <Text style={styles.text}>Product list</Text>
          <View style={styles.chevronContainer}>
            <FontAwesomeIcon icon={faChevronRight} size={14} color="#000" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default StoreDetailspage

const styles = StyleSheet.create({
  container: {
    height: "90%",
    backgroundColor: '#F9F9F9',
    padding: PADDING.largePad
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF', // White background
    padding: 15,
    borderRadius: 12, // Rounded corners
    shadowColor: '#000', // Subtle shadow for elevation effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android shadow
    marginVertical: 10,
  },
  text: {
    flex: 1, // Take available space between icons
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10, // Space from icon
    color: '#000', // Black text
  },
  chevronContainer: {
    padding: 5, // Small padding for better touch feedback
  },
})