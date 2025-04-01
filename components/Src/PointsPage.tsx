import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { CommonStyles, MARGIN, PADDING } from '@/constants/Colors'
import Svg, { Circle, Path } from 'react-native-svg'
import { router } from 'expo-router'

const PointsPage = () => {
  return (
    <View>
      <View style={{ ...styles.container }}>
        <Image source={require('../../assets/images/pointslogo.png')} style={{ width: "100%", height: "40%" }} />
        <View style={{ ...styles.points }}>
          <TouchableOpacity onPress={() => router.back()}>
          <FontAwesomeIcon icon={faChevronLeft} size={20} color='#FFF' />
          </TouchableOpacity>
          <Text style={{ color: '#FFF', fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>Points</Text>
        </View>
        <View style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: '#FFFF', height: '60%', bottom: 30 }}>
          <View style={{ ...styles.subcontainer }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {[...Array(10).keys()].map(i => (
                <View style={{ ...styles.containercard, }}>
                  <View style={{ ...styles.box }}>
                    <Svg width="60" height="60" viewBox="11 0 40 40" style={{ ...styles.leftsvg }}>
                      <Path
                        d="M30,20 L10,10 L10,30 Z"
                        fill="#F5F5F5"
                        stroke="none"
                      />
                    </Svg>
                    <View style={{ justifyContent: 'center',width:"20%"}}>
                      <Text style={{ ...CommonStyles.lrgHead, justifyContent: "center", color: "#FEC200",width:'80%' }}>0.5</Text>
                      <Text style={{ ...CommonStyles.mdText }}>points</Text>
                    </View>
                    <View style={styles.dividerContainer}>
                      <View style={{ height: "100%", width: "10%" }}>
                        <View style={{
                          borderWidth: 1,
                          borderColor: '#ADADAD',
                          width: '100%',
                          borderStyle: 'dashed',
                          height: "100%",
                        }} />
                      </View>
                    </View>
                    <View style={styles.imageSection}>
                      <Image
                        source={require('../../assets/images/pointsgift.png')}
                        resizeMode="contain"
                      />
                    </View>
                    <Svg width="60" height="60" viewBox="0 0 40 40" style={{ ...styles.rightsvg }}>
                      <Path
                        d="M10,20 L30,10 L30,30 Z"
                        fill="#F5F5F5"
                        stroke="none"
                      />
                    </Svg>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  )
}

export default PointsPage

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
  },
  points: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: "7%",
    left: 20,
  },
  subcontainer: {
    height: '100%',
    padding: PADDING.largePad,
    marginTop: MARGIN.largeMar,
    // backgroundColor: '#bbb',
  },
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    height: "35%",
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    width: '100%',
    marginTop: MARGIN.largeMar,
  },
  pointsSection: {
    // flex: 1,
    margin: MARGIN.miniMar,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointsNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFB400',
  },
  dividerContainer: {
    height: '100%',
    marginHorizontal: 20,
  },
  imageSection: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    left: 15,
  },
  rectStyle: {
    borderRadius: 10,
  },
  leftsvg: {
    right: 3,
    padding: PADDING.smlPad
  },
  rightsvg: {
    left: 18,
  },
  box: {
    width: "100%",
    height: "90%",
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: 'center',
    flexDirection: "row",
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  containercard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})