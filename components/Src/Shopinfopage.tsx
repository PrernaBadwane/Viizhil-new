import { Image, SafeAreaView, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import NavigationHeader from '@/app/commonComponts/NavigationHeader'
import { CommonStyles, MARGIN, PADDING } from '@/constants/Colors'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { router } from 'expo-router'

const Shopinfopage = () => {
  return (
    <>
      <SafeAreaView>
        <NavigationHeader name="Onboarding" />
        <ScrollView>
        <View style={{ ...styles.container }}>
          <TouchableOpacity onPress={()=>router.push('/(tabs)/home')}>
            <View style={{ ...CommonStyles.Addbutton}}>
              <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: '700' }}>Skip</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.cardcontainer}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Vizhil Onboarding</Text>
            </View>
            <View>
              <View style={{ ...styles.mainTextContainer }}>
                <Text style={{ ...styles.textare }}>We Are
                  <Text style={{ ...styles.boldText }}> Offering</Text>
                </Text>
              </View>
              <View style={{ ...styles.commissionText }}>
                <Text style={{ ...styles.percentageText }}>12% COMMISSION</Text>
              </View>
              <View style={{ ...styles.perOrder }}>
                <Text style={{ ...styles.perOrderText }}>Per order</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.subcardcontainer} onPress={()=>router.push('/storedetails')}>
            <View style={styles.iconContainer}>
              <Image source={require('../../assets/images/storedetails.png')} style={{ height: 30, width: 30, }} />
             
            </View>
            <Text style={styles.text}>Store Details</Text>
            <AnimatedCircularProgress
              size={33}
              width={2}
              fill={0}
              tintColor="#D3D3D3"
              backgroundColor="#F0F0F0"
              rotation={0}
              children={() => <View style={styles.textContainer}><Text style={styles.progressText}>0%</Text></View>}
            />
            <FontAwesomeIcon icon={faChevronRight} size={22} color='#2B2827' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.subcardcontainer} onPress={()=>router.push('/verification')}>
            <View style={styles.iconContainer}>
              <Image source={require('../../assets/images/verification.png')} style={{ height: 30, width: 30, }} />
             
            </View>
            <Text style={styles.text}>Verification</Text>
            <AnimatedCircularProgress
              size={33}
              width={2}
              fill={0}
              tintColor="#D3D3D3"
              backgroundColor="#F0F0F0"
              rotation={0}
              children={() => <View style={styles.textContainer}><Text style={styles.progressText}>0%</Text></View>}
            />
            <FontAwesomeIcon icon={faChevronRight} size={22} color='#2B2827' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.subcardcontainer} onPress={()=>router.push('/bankdetails')}>
            <View style={styles.iconContainer}>
              <Image source={require('../../assets/images/bankdetails.png')} style={{ height: 30, width: 30, }} />
             
            </View>
            <Text style={styles.text}>Bank Details</Text>
            <AnimatedCircularProgress
              size={33}
              width={2}
              fill={0}
              tintColor="#D3D3D3"
              backgroundColor="#F0F0F0"
              rotation={0}
              children={() => <View style={styles.textContainer}><Text style={styles.progressText}>0%</Text></View>}
            />
            <FontAwesomeIcon icon={faChevronRight} size={22} color='#2B2827' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.subcardcontainer} onPress={()=>router.push('/(drawer)')}>
            <View style={styles.iconContainer}>
              <Image source={require('../../assets/images/mystore.png')} style={{ height: 30, width: 30 }} />
             
            </View>
            <Text style={styles.text}>My Store</Text>
           
            <FontAwesomeIcon icon={faChevronRight} size={22} color='#2B2827' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.subcardcontainer} >
            <View style={styles.iconContainer}>
              <Image source={require('../../assets/images/logout.png')} style={{ height: 30, width: 30, }} />
             
            </View>
            <Text style={styles.text}>Logout</Text>
           
            <FontAwesomeIcon icon={faChevronRight} size={22} color='#2B2827' />
          </TouchableOpacity>
        </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default Shopinfopage

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
    height: "100%",
    padding: PADDING.largePad
  },
  skipbutton: {
    height: 30,
    backgroundColor: "#376F46",
    justifyContent: "center",
    width: 70,
    alignItems: "center",
    // margin: 10,
    alignSelf: "flex-end",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#376F46"
  },
  cardcontainer: {
    backgroundColor: "#BFFFD0",
    padding: 16,
    borderRadius: 10,
    width: "100%",
    height: 200,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 10,
  },
  badge: {
    backgroundColor: "#0D4D73",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  mainTextContainer: {
    margin: MARGIN.largeMar,
  },
  badgeText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  textare: {
    fontSize: 20,
    color: "#2B2827",
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 32,
  },
  commissionText: {
    bottom: 5,
    left: 10,

  },
  percentageText: {
    fontSize: 36,
    fontWeight: "bold",
    bottom: 15,
  },
  perOrder: {
    justifyContent: 'flex-end',
    bottom: 22,
    alignItems: 'flex-end'
  },
  perOrderText: {
    fontSize: 16,
    color: "#2B2827",
    // marginTop: 4,
  },
  subcardcontainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    width: '100%',
    height: 70,
    borderRadius: 10,
    shadowColor: "#FFFFFF",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 15,
    // marginHorizontal: 10,
  },
  iconContainer: {
    position: "relative",
    marginRight: 10,
  },
 
  text: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#222",
  },
  progressText: {
    fontSize: 10,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
})