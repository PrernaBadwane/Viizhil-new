import { FlatList, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import { PADDING } from '@/constants/Colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { router } from 'expo-router';

const Homepage = () => {
    const [isOnline, setIsOnline] = useState(true);
    const [selectedTab, setSelectedTab] = useState("Pendings");


    return (
        <>
            <View style={styles.headerContainer}>
                <View style={styles.leftContainer}>
                    <View style={styles.profileIcon} />
                    <Text style={styles.storeName}>Vizhil Grocery</Text>
                </View>
                <View style={styles.rightContainer}>
                    <View style={styles.locationContainer}>
                        <FontAwesome5 name="location-arrow" size={16} color="#2E8B57" />
                        <Text style={styles.location}>Anna Nagar</Text>
                    </View>
                    <Text style={styles.city}>Madurai</Text>
                </View>
            </View>
            <View style={styles.tabcontainer}>
                <Text style={styles.statusText}>You are Online</Text>

                <View style={styles.toggleContainer}>
                    <Text style={styles.toggleText}>{isOnline ? 'On' : 'Off'}</Text>
                    <Switch
                        value={isOnline}
                        onValueChange={(value: any) => setIsOnline(value)}
                        trackColor={{ false: '#ccc', true: '#ccc' }}
                        thumbColor={isOnline ? '#666' : '#aaa'}
                    />
                </View>
                <Text style={styles.checkText}>CHECK ON VIZHIL</Text>
            </View>
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.button, selectedTab === "Pendings" && styles.selectedButton]}
                    onPress={() => setSelectedTab("Pendings")}
                >
                    <View style={styles.innerView}>
                        <Text style={[styles.textHead, selectedTab === "Pendings" && styles.selectedText,
                        ]}>
                            New order
                        </Text>
                        <Text style={[styles.textHead, selectedTab === "Pendings" && styles.selectedText]}>
                            (0)
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, selectedTab === "InPreparation" && styles.selectedButton]}
                    onPress={() => setSelectedTab("InPreparation")}
                >
                    <View style={styles.innerView}>
                        <Text style={[styles.textHead, selectedTab === "InPreparation" && styles.selectedText]}>
                            Package
                        </Text>
                        <Text style={[styles.textHead, selectedTab === "InPreparation" && styles.selectedText]}>
                            (0)
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, selectedTab === "Completed" && styles.selectedButton]}
                    onPress={() => setSelectedTab("Completed")}
                >
                    <View style={styles.innerView}>
                        <Text style={[styles.textHead, selectedTab === "Completed" && styles.selectedText]}>
                            In Transit
                        </Text>
                        <Text style={[styles.textHead, selectedTab === "Completed" && styles.selectedText]}>
                            (0)
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, selectedTab === "Dispatched" && styles.selectedButton]}
                    onPress={() => setSelectedTab("Dispatched")}
                >
                    <View style={styles.innerView}>
                        <Text style={[styles.textHead, selectedTab === "Dispatched" && styles.selectedText]}>
                            Completed
                        </Text>
                        <Text style={[styles.textHead, selectedTab === "Dispatched" && styles.selectedText]}>
                            (0)
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, selectedTab === "Delivered" && styles.selectedButton]}
                    onPress={() => setSelectedTab("Delivered")}
                >
                    <View style={styles.innerView}>
                        <Text style={[styles.textHead, selectedTab === "Delivered" && styles.selectedText]}>
                            Cancelled
                        </Text>
                        <Text style={[styles.textHead, selectedTab === "Delivered" && styles.selectedText]}>
                            (0)
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <ScrollView>
                    <TouchableOpacity style={styles.card} onPress={()=>{router.push('/orderdetails')}}>
                        <View>
                            <Text style={styles.orderId}>Order Id #122332</Text>
                            <Text style={styles.time}>Today | 9:00 am</Text>
                        </View>
                        <View style={styles.rightSection}>
                            <Text style={styles.itemCount}>3 Items</Text>
                            <FontAwesomeIcon icon={faChevronRight} size={20} color="#000" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}>
                        <View>
                            <Text style={styles.orderId}>Order Id #122332</Text>
                            <Text style={styles.time}>Today | 9:00 am</Text>
                        </View>
                        <View style={styles.rightSection}>
                            <Text style={styles.itemCount}>3 Items</Text>
                            <FontAwesomeIcon icon={faChevronRight} size={20} color="#000" />
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>

        </>
    );
};

export default Homepage;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: "20%",
        maxHeight: 100,
        paddingTop: 30,
        backgroundColor: '#f8fcf8',
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#d3d3d3',
        marginRight: 8,
    },
    storeName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#222',
    },
    rightContainer: {
        alignItems: 'flex-end',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    location: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#222',
        marginLeft: 4,
    },
    city: {
        fontSize: 12,
        color: '#555',
    },
    tabcontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#66A35C',
        height: "10%",
        maxHeight: 60,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    statusText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '700',
    },
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 5,
        height: 30,
    },
    toggleText: {
        fontSize: 16,
        fontWeight: '800',
        marginLeft: 5,
    },
    checkText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '800',
    },
    container: {
        height: "100%",
        backgroundColor: '#F9F9F9',
        padding: PADDING.largePad
    },
    tabContainer: {
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    innerView: {
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        maxHeight: 70,
        minWidth: 70,
    },
    textHead: {
        fontSize: 11,
        textAlign: "center",
        color: "#5C5C5C",
        fontWeight: '500',
    },
    button: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        minWidth: 70,
        height: 50,
        maxHeight: 70,
    },
    selectedButton: {
        justifyContent: "center",
        alignItems: "center",
        minWidth: 70,
        height: 50,
        maxHeight: 70,
        backgroundColor: "#FF6C41",
    },
    selectedText: {
        color: "#FFF",
        fontSize: 11,
        fontWeight: "700",
    },
    card: {
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
    },
    orderId: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#222",
    },
    time: {
        fontSize: 14,
        color: "#5C5C5C",
        marginTop:5,
        fontWeight:'600',
    },
    rightSection: {
        flexDirection: "row",
        alignItems: "center",
    },
    itemCount: {
        fontSize: 14,
        color: "gray",
        marginRight: 5,
    },
});

