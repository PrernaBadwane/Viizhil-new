import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import HomeHeader from '@/app/commonComponts/HomeHeader'
import { MARGIN, PADDING } from '@/constants/Colors'

const OrderDetailsPage = () => {
    return (
        <>
            <View>
                <HomeHeader name='Vizhil Grocery'/>
                <View style={{ ...styles.container }}>
                    <View style={styles.card}>
                        <View>
                            <Text style={styles.name}>Prakash A</Text>
                            <Text style={styles.address}>16, Anna Nagar, Madurai</Text>
                            <Text style={styles.phone}>9985857742</Text>
                        </View>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>New Order</Text>
                        </View>
                    </View>
                    <View style={styles.cardcontainer}>
                        {/* Item 1 */}
                        <View style={styles.itemContainer}>
                            <Image source={require("../../assets/images/item2.png")} style={styles.image} />
                            <View style={styles.textContainer}>
                                <Text style={styles.cardname}>Gold Rice</Text>
                                <Text style={styles.quantity}>2 bags</Text>
                            </View>
                            <Text style={styles.price}>Rs 250</Text>
                        </View>

                        {/* Separator */}
                        <View style={styles.separator} />

                        {/* Item 2 */}
                        <View style={styles.itemContainer}>
                            <Image source={require("../../assets/images/item2.png")} style={styles.image} />
                            <View style={styles.textContainer}>
                                <Text style={styles.cardname}>Mama Gold Rice</Text>
                                <Text style={styles.quantity}>2 bags</Text>
                            </View>
                            <Text style={styles.price}>Rs 2250</Text>
                        </View>

                        {/* Separator */}
                        <View style={styles.separator} />

                        {/* Item 3 */}
                        <View style={styles.itemContainer}>
                            <Image source={require("../../assets/images/item2.png")} style={styles.image} />
                            <View style={styles.textContainer}>
                                <Text style={styles.cardname}>Rice</Text>
                                <Text style={styles.quantity}>2 bags</Text>
                            </View>
                            <Text style={styles.price}>Rs 250</Text>
                        </View>

                        {/* Separator */}
                        <View style={styles.separator} />

                        {/* Item 4 */}
                        <View style={styles.itemContainer}>
                            <Image source={require("../../assets/images/item2.png")} style={styles.image} />
                            <View style={styles.textContainer}>
                                <Text style={styles.cardname}>Tomatoes</Text>
                                <Text style={styles.quantity}>2 basket</Text>
                            </View>
                            <Text style={styles.price}>Rs 450</Text>
                        </View>

                        {/* Total Price Section */}
                        <View style={styles.totalContainer}>
                            <Text style={styles.totalText}>Total</Text>
                            <Text style={styles.totalPrice}>Rs 3299</Text>
                        </View>
                    </View>
                    <View style={styles.ordercontainer}>
                        <TouchableOpacity style={styles.button} onPress={() => alert("Order Processed!")}>
                            <Text style={styles.buttonText}>Process order</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    )
}

export default OrderDetailsPage

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: "#F9F9F9",
        padding: PADDING.largePad
    },
    card: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
    },
    address: {
        fontSize: 14,
        color: "#555",
    },
    phone: {
        fontSize: 14,
        color: "#555",
    },
    badge: {
        backgroundColor: "#E0F7E9",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#1E9E4A", // Green text color
    },
    cardcontainer: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        margin: 16,
        elevation: 3, // Shadow effect for Android
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 8,
    },
    textContainer: {
        flex: 1,
        marginLeft: 12,
    },
    cardname: {
        fontSize: 16,
        fontWeight: "bold",
    },
    quantity: {
        fontSize: 14,
        color: "gray",
    },
    price: {
        fontSize: 16,
        fontWeight: "bold",
    },
    separator: {
        height: 1,
        backgroundColor: "#eee",
    },
    totalContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderColor: "#eee",
    },
    totalText: {
        fontSize: 18,
        fontWeight: "bold",
        alignItems: 'center',
        left: 100,
    },
    totalPrice: {
        fontSize: 18,
        fontWeight: "bold",
    },
    ordercontainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop:MARGIN.largeMar
      },
      button: {
        backgroundColor: "#26B24B",
        width: "99%", 
        paddingVertical: 15,
        borderRadius: 50, 
        alignItems: "center",
        justifyContent: "center",
      },
      buttonText: {
        color: "white",
        fontSize: 20,
        fontWeight: "600",
      },
})