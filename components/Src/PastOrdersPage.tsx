import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import NavigationHeader from '@/app/commonComponts/NavigationHeader'
import { PADDING } from '@/constants/Colors'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

const PastOrdersPage = () => {
    const [selected, setSelected] = useState('Today');
    return (
        <View style={{ flex: 1 }}>
            <NavigationHeader name="Past Order" />
            <View style={{ ...styles.container }}>
                <View style={{
                    height: 50,
                    justifyContent: 'center',
                    width: '93%'
                }}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.scrollViewcontainer}
                    >
                        <View style={{ height: 40, flexDirection: 'row', justifyContent: 'center', }}>

                            <TouchableOpacity
                                style={[styles.button, selected === 'Today' && styles.selectedButton]}
                                onPress={() => setSelected('Today')}
                            >
                                <Text style={[styles.buttonText, selected === 'Today' && styles.selectedText]}>
                                    Today
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: 40, flexDirection: 'row', justifyContent: 'center', }}>

                            <TouchableOpacity
                                style={[styles.button, selected === 'This week' && styles.selectedButton]}
                                onPress={() => setSelected('This week')}
                            >
                                <Text style={[styles.buttonText, selected === 'This week' && styles.selectedText]}>
                                    This week
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: 40, flexDirection: 'row', justifyContent: 'center', }}>

                            <TouchableOpacity
                                style={[styles.button, selected === 'This Month' && styles.selectedButton]}
                                onPress={() => setSelected('This Month')}
                            >
                                <Text style={[styles.buttonText, selected === 'This Month' && styles.selectedText]}>
                                    This Month
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: 40, flexDirection: 'row', justifyContent: 'center', }}>

                            <TouchableOpacity
                                style={[styles.button, selected === 'Last Month' && styles.selectedButton]}
                                onPress={() => setSelected('Last Month')}
                            >
                                <Text style={[styles.buttonText, selected === 'Last Month' && styles.selectedText]}>
                                    Last Month
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>

                </View>
                <View style={{ ...styles.iconContainer }}>
                    <Image source={require('../../assets/images/filterpast.png')} style={{ width: 25, height: 25 }} />
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {[...Array(10)].map((_, index) => (
                        <View style={styles.cardContainer}>
                            <View style={{ padding: 15 }}>
                                <View style={styles.statusContainer}>
                                    <Text style={styles.statusText}>DELIVERED</Text>
                                </View>
                                <Text style={styles.orderId}>#4642</Text>
                                <View style={styles.orderDetails}>
                                    <Text style={styles.orderInfo}>08-04-2024 08:41 PM | Chicken Tik..</Text>
                                    <Text style={styles.orderPrice}>₹878.06</Text>
                                </View>
                            </View>
                            <View style={{ ...styles.cardbutton }}>
                                <FontAwesomeIcon icon={faCircleCheck} size={22} color="#4CAF50" />
                                <Text style={styles.statusMessage}>Food Ready Correct</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    )
}

export default PastOrdersPage

const styles = StyleSheet.create({
    container: {
        height: '90%',
        // backgroundColor: 'red',
        padding: PADDING.largePad
    },
    scrollViewcontainer: {
        flexDirection: 'row',
        // paddingVertical: 10,
    },
    button: {
        paddingVertical: 7,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        marginHorizontal: 5,
        height: 40
    },
    selectedButton: {
        backgroundColor: '#376E46',
        borderColor: '#376E46',
    },
    buttonText: {
        fontSize: 16,
        color: '#000',
        fontWeight: '500'
    },
    selectedText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    iconContainer: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        position: 'absolute',
        top: 10,
        right: 0,
        padding: 10
    },
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        // padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 1,
        marginTop: 10,
    },
    statusContainer: {
        backgroundColor: '#F7C501',
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderRadius: 8,
        height: 35,
        alignSelf: 'flex-start',
    },
    statusText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '800',
        alignSelf: 'center'
    },
    orderDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginTop: 10,
        justifyContent: 'space-between',
    },
    orderId: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
    },
    orderInfo: {
        fontSize: 14,
        color: '#666',
        flex: 1,
        marginHorizontal: 5,
    },
    orderPrice: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    bottomStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E0F8E0',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: '100%'
    },
    checkIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    statusMessage: {
        color: '#4CAF50',
        fontSize: 16,
        padding: 5,
        marginLeft: 5,
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    cardbutton: {
        backgroundColor: '#E2FCFF',
        padding: 10,
        borderBottomEndRadius: 10,
        borderBottomLeftRadius: 10,
        height: 50,
        justifyContent: 'center',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    }
})