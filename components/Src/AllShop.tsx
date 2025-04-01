import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBell, faChevronLeft, faChevronRight, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons'
import { CommonStyles, PADDING } from '@/constants/Colors'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ApiClient } from '@/components/Src/api/apiBaseUrl'

const index = () => {
    const [shopAllData, setShopAllData] = useState<any[]>([])
    const [shopId, setShopId] = useState(0)
    const [loading, setloading] = useState(true)

    useEffect(() => {
        gatAllShopData();
    }, [])

    const gatAllShopData = async () => {
        try {
            setloading(true);
            const Userid = 4665;

            const Shopid = await AsyncStorage.getItem("Id");
            if (Shopid) {
                setShopId(parseInt(Shopid));
            }

            const response = await ApiClient.get("/sp_View_GroceryShop?", {
                params: { UserId: `${Userid}` },
            });

            if (response.status === 200 && response.data?.data) {
                setShopAllData(response.data.data);
                console.log("Shop data fetched successfully", response.data.data);
            } else {
                console.error("Unexpected response format", response.data);
            }
        } catch (error) {
            console.error("Error fetching shop data:", error);
        } finally {
            setloading(false);
        }
    };

    const Item = ({ item }: any) => {
        return (
            <View style={[styles.card]}>
                <TouchableOpacity onPress={() => { router.push('/shopinfo') }}>
                    <View style={styles.row}>
                        <View style={styles.profileCircle}>
                            <Image source={{ uri: `https://cnt.vizhil.com/images/grocery/shop/logo/${item.Logo}` }} style={{ width: 100, height: 100, borderRadius: 50 }} />
                        </View>
                        <View style={styles.details}>
                            <Text style={styles.businessName}>{item.ShopName}</Text>
                            <Text style={styles.address}>{item.Description}</Text>
                            <View style={styles.row}>
                                <FontAwesomeIcon icon={faMapMarkerAlt} size={16} color="green" />
                                <Text style={styles.infoText}> {item.AreaName}</Text>
                            </View>
                            <View style={styles.row}>
                                <FontAwesomeIcon icon={faPhone} size={16} color="green" />
                                <Text style={styles.infoText}> +91 9997634561</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.separator} />
                    <Text style={styles.email}>Vizhilgrocery@Gmail.Com</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View>
            <View style={styles.headercontainer}>
                <View style={styles.subheadercontainer}>
                    <View style={styles.circle}>
                        <Image source={require('../../assets/images/Grocerylogo.png')} style={{ width: 25, height: 25 }} />
                    </View>
                    <Text style={styles.text}>All Shop</Text>
                </View>



                {/* Points Section After */}
                <View style={styles.pointscontainer}>
                    <View style={styles.points}>
                        <Image
                            source={require('../../assets/images/points.png')}
                            style={styles.pointsIcon}
                        />
                        <Text style={styles.pointsText}>20 Points</Text>
                        <FontAwesomeIcon icon={faChevronRight} size={17} color='#FFF' />
                    </View>
                </View>
                {/* Notification Icon First */}
                <View style={styles.Notification}>
                    <Image source={require('../../assets/images/Notification.png')} style={{ width: 25, height: 25 }} />
                </View>
            </View>
            <View style={{ ...styles.Add }}>
                <View style={{ ...CommonStyles.Addbutton }}>
                    <TouchableOpacity onPress={() => router.push('/storeinfo')}>
                        <Text style={{ color: "#fff" }}>Add</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{ flex: 1, }}>
                    <FlatList
                        scrollEnabled={false}
                        showsVerticalScrollIndicator={false}
                        data={shopAllData}
                        renderItem={({ item }) => <Item item={item} />}
                        keyExtractor={(item: any) => item.uid}
                    />
                </ScrollView>
            </View>

        </View>



    )
}

export default index

const styles = StyleSheet.create({
    headercontainer: {
        backgroundColor: '#FFFFFF',
        height: '40%',
        maxHeight: 120,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingTop: 30,
    },
    subheadercontainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    circle: {
        width: 45,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#EAEAEA',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2B2827',
    },
    pointscontainer: {
        alignItems: 'center',
        marginLeft: 30
    },
    points: {
        left: 10,
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: '#F24E1E',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        borderColor: '#F24E1E',
        paddingHorizontal: PADDING.horizontal_med,
    },
    pointsIcon: {
        width: 25,
        height: 25,
        marginRight: 5,
    },
    pointsText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
        marginRight: 8,
    },
    Notification: {
        justifyContent: 'flex-end'
    },
    Add: {
        padding: PADDING.smlPad,
        backgroundColor: '#F9F9F9',
        height: "100%"
    },
    Addbutton: {
        backgroundColor: "#376E46",
        justifyContent: "center",
        padding: 10,
        width: 60,
        height: 50,
        alignItems: "center",
        margin: 10,
        alignSelf: "flex-end",
        borderRadius: 12
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 15,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#FFFFFF',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    profileCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#D9D9D9',
        marginRight: 15,
    },
    details: {
        flex: 1,
    },
    businessName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    address: {
        fontSize: 14,
        color: '#777',
        marginBottom: 5,
    },
    infoText: {
        fontSize: 14,
        color: '#555',
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginVertical: 8,
    },
    email: {
        fontSize: 14,
        color: '#777',
        textAlign: 'center',
    },
});


