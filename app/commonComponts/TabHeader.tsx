import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'

const TabHeader = () => {
  return (
    <View style={styles.headerContainer}>
      {/* Left Back Button */}
      <TouchableOpacity style={styles.backButton}>
        <FontAwesomeIcon icon={faChevronLeft} size={20} color='#2B2827' />
      </TouchableOpacity>

      {/* Title and Location */}
      <View style={styles.textContainer}>
        <Text style={styles.storeName}>Guru Grocery</Text>
        <Text style={styles.location}>INJAMBAKKAM</Text>
      </View>


      {/* Right Menu Icon */}
      <TouchableOpacity style={styles.menuButton}>
        <FontAwesomeIcon icon={faEllipsisVertical} color='#000' />
      </TouchableOpacity>
    </View>
  )
}

export default TabHeader

const styles = StyleSheet.create({
  headerContainer: {
    height: '20%',
    maxHeight: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    paddingTop: 30,
    backgroundColor: "#fff",
  },
  backButton: {
    padding: 5,
  },
  textContainer: {
    flex: 1, // Takes available space
    marginLeft: 10,
  },
  storeName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  location: {
    fontSize: 12,
    color: "gray",
  },
  menuButton: {
    padding: 5,
  },
})