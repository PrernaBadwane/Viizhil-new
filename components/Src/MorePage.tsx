import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { MARGIN, PADDING } from '@/constants/Colors'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { router } from 'expo-router'

const MorePage = () => {
    return (
        <View>
            <View style={{ ...styles.headercontainer }}>
                <View style={{ left: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}>More</Text>
                </View>
            </View>
            <View style={{flex: 1, backgroundColor: '#F9F9F9',height:"100%"}}>
                <ScrollView>
                    <View style={{ ...styles.container }}>
                        <View style={{ ...styles.circlecontainer }}>
                            <View style={{ ...styles.circle }}></View>
                        </View>
                        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/editprofile')}>
                            <View style={styles.iconTextContainer}>
                                <Image source={require('../../assets/images/editprofile.png')} />
                                <Text style={styles.menuText}>Edit Profile</Text>
                            </View>
                            <FontAwesomeIcon icon={faChevronRight} size={18} color='#2B2827' />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/changepassword')}>
                            <View style={styles.iconTextContainer}>
                                <Image source={require('../../assets/images/changepassword.png')} />
                                <Text style={styles.menuText}>Change Password</Text>
                            </View>
                            <FontAwesomeIcon icon={faChevronRight} size={18} color='#2B2827' />
                        </TouchableOpacity>
                        <View style={styles.line} />
                        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/shop')}>
                            <View style={styles.iconTextContainer}>
                                <Image source={require('../../assets/images/shop.png')} />
                                <Text style={styles.menuText}>My Shop</Text>
                            </View>
                            <FontAwesomeIcon icon={faChevronRight} size={18} color='#2B2827' />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem}>
                            <View style={styles.iconTextContainer}>
                                <Image source={require('../../assets/images/earning.png')} />
                                <Text style={styles.menuText}>Earning</Text>
                            </View>
                            <FontAwesomeIcon icon={faChevronRight} size={18} color='#2B2827' />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={()=> router.push('/refer')}>
                            <View style={styles.iconTextContainer}>
                                <Image source={require('../../assets/images/earning.png')} />
                                <Text style={styles.menuText}>Refer & Earns</Text>
                            </View>
                            <FontAwesomeIcon icon={faChevronRight} size={18} color='#2B2827' />
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={styles.menuItem} onPress={()=> router.push('/points')}>
                            <View style={styles.iconTextContainer}>
                                <Image source={require('../../assets/images/earning.png')} />
                                <Text style={styles.menuText}>Points</Text>
                            </View>
                            <FontAwesomeIcon icon={faChevronRight} size={18} color='#2B2827' />
                        </TouchableOpacity> */}
                        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/pastorder')}>
                            <View style={styles.iconTextContainer}>
                                <Image source={require('../../assets/images/pastorder.png')} />
                                <Text style={styles.menuText}>Past Order</Text>
                            </View>
                            <FontAwesomeIcon icon={faChevronRight} size={18} color='#2B2827' />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem}>
                            <View style={styles.iconTextContainer}>
                                <Image source={require('../../assets/images/learning.png')} />
                                <Text style={styles.menuText}>Learning Station</Text>
                            </View>
                            <FontAwesomeIcon icon={faChevronRight} size={18} color='#2B2827' />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem}>
                            <View style={styles.iconTextContainer}>
                                <Image source={require('../../assets/images/partner.png')} />
                                <Text style={styles.menuText}>Partner FAQs</Text>
                            </View>
                            <FontAwesomeIcon icon={faChevronRight} size={18} color='#2B2827' />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem}>
                            <View style={styles.iconTextContainer}>
                                <Image source={require('../../assets/images/compliance.png')} />
                                <Text style={styles.menuText}>Compliance</Text>
                            </View>
                            <FontAwesomeIcon icon={faChevronRight} size={18} color='#2B2827' />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/help')}>
                            <View style={styles.iconTextContainer}>
                                <Image source={require('../../assets/images/help.png')} />
                                <Text style={styles.menuText}>Help Center</Text>
                            </View>
                            <FontAwesomeIcon icon={faChevronRight} size={18} color='#2B2827' />
                        </TouchableOpacity>
                        <View style={styles.line} />
                        <TouchableOpacity style={styles.menuItem}>
                            <View style={styles.iconTextContainer}>
                                <Image source={require('../../assets/images/log.png')} />
                                <Text style={styles.menuText}>Logout</Text>
                            </View>
                            <FontAwesomeIcon icon={faChevronRight} size={18} color='#2B2827' />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default MorePage

const styles = StyleSheet.create({
    headercontainer: {
        backgroundColor: '#fff',
        height: '100%',
        maxHeight: 90,
        padding: PADDING.largePad,
        paddingTop: 40
    },
    container: {
        height: '100%',
        backgroundColor: '#F9F9F9',
        padding: PADDING.largePad
    },
    circle: {
        width: 140,
        height: 140,
        backgroundColor: '#D9D9D9',
        borderRadius: 90,
    },
    circlecontainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuItem: {
        // marginTop:MARGIN.largeMar,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    iconTextContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    menuText: {
        fontSize: 16,
        color: "#2B2827",
        marginLeft: 10,
        fontWeight: "700",
    },
    line: {
        height: 1,
        backgroundColor: "#888", // Adjust color as needed
        marginHorizontal: 10,
        marginVertical: 10,
        transform: [{ rotate: "1deg" }], // Slight slant effect
    },
})