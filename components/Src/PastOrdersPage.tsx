import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import NavigationHeader from '@/app/commonComponts/NavigationHeader'
import { PADDING } from '@/constants/Colors'
import { faCircleCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

const PastOrdersPage = () => {
    const [selected, setSelected] = useState('Today');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedModal, setSelectedModal] = useState("Delivered"); 

    const filters = [
        "Delivered",
        "Edited",
        "Customer Canceled",
        "Restaurant Cancelled",
        "Swiggy Cancelled",
        "Delayed Prep Time"
    ];
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
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Image source={require('../../assets/images/filterpast.png')} style={{ width: 25, height: 25 }} />
                    </TouchableOpacity>
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
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                style={styles.closeButton}
                            >
                                <Text style={styles.closeText}>
                                <FontAwesomeIcon icon={faXmark} size={20} color="#333" />
                                </Text>
                            </TouchableOpacity>

                            <Text style={styles.modalTitle}>More Filters</Text>
                            <Text style={styles.modalSubtitle}>Order Status</Text>
                            <View style={styles.buttoncontainer}>
                                {filters.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={[
                                            styles.modalbutton,
                                            selectedModal === item && styles.modalselectedButton
                                        ]}
                                        onPress={() => setSelectedModal(item)}
                                    >
                                        <Text style={[styles.modalbuttonText, selectedModal === item && styles.modalselectedText]}>
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>
                </Modal>
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
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "flex-end",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: PADDING.largePad,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: "100%",
        // alignItems: "center",
    },
    closeButton: {
        position: "absolute",
        top: -50,
        right: 20,
        backgroundColor: "#fff",
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
    },
    closeText: {
        fontSize: 20,
        color: "#333",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "600",
    },
    modalSubtitle: {
        fontSize: 16,
        color: "#4B4B4B",
        fontWeight: "600",
        marginBottom: 10,
        marginTop: 10,
    },
    buttoncontainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        justifyContent: "flex-start",
    },
    modalbutton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "white",
    },
    modalselectedButton: {
        backgroundColor: "#376E46", 
        borderColor: "#376E46",
    },
    modalbuttonText: {
        fontSize: 14,
        color: "black",
    },
    modalselectedText: {
        color: "white",
        fontWeight: "bold",
    }
})