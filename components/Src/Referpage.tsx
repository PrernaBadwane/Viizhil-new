import { StyleSheet, Text, TouchableOpacity, View, Image, Alert,Clipboard } from 'react-native'
import React from 'react'
import HomeHeader from '@/app/commonComponts/HomeHeader'
import { PADDING } from '@/constants/Colors'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faShareNodes } from '@fortawesome/free-solid-svg-icons'

const Referpage = () => {
    const referralCode = "AB25RT";

    // Function to copy referral code
    const copyToClipboard = () => {
      Clipboard.setString(referralCode);
      Alert.alert("Copied!", "Referral code copied to clipboard.");
    };
    return (
        <View>
            <HomeHeader name='Refer & Earns' />
            <View style={{ ...styles.container }}>
                <TouchableOpacity>
                    <View style={{ ...styles.Earnings }}>
                        <Text style={{ color: "#FFF", fontWeight: '700' }}>My Earnings</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.subcontainer}>
                    {/* Top Illustration */}
                    <Image source={require('../../assets/images/Refers.png')} style={styles.illustration} />

                    {/* Referral Message */}
                    <Text style={styles.title}>Earn upto ₹50 per friend you invite to Vizhil</Text>

                    {/* Referral Code Section */}
                    <View style={styles.codeContainer}>
                        <Text style={styles.codeLabel}>YOUR REFERRAL CODE</Text>
                        <TouchableOpacity style={styles.codeBox} onPress={copyToClipboard}>
                            <Text style={styles.referralCode}>{referralCode}</Text>
                        </TouchableOpacity>
                        <Text style={styles.tapToCopy}>TAP TO COPY</Text>
                    </View>

                    {/* Refer Now Button */}
                    <TouchableOpacity style={styles.referButton}>
                    <FontAwesomeIcon icon={faShareNodes} color='#FFF' />
                        <Text style={styles.referText}> REFER NOW</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Referpage

const styles = StyleSheet.create({
    container: {
        height: '100%',
        // backgroundColor: 'red',
        padding: PADDING.largePad
    },
    Earnings: {
        height: 35,
        backgroundColor: "#0063DD",
        justifyContent: "center",
        width: "30%",
        alignItems: "center",
        margin: 10,
        alignSelf: "flex-end",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#0063DD'
        // bottom: 10
    },
    subcontainer: {
        flex: 1,
        // backgroundColor: "#fff",
        alignItems: "center",
        paddingTop: 40,
        paddingHorizontal: 20,
      },
      illustration: {
        width: "100%",
        height: 200,
        resizeMode: "contain",
        marginBottom: 20,
      },
      title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        marginBottom: 20,
      },
      codeContainer: {
        alignItems: "center",
        marginBottom: 20,
      },
      codeLabel: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
      },
      codeBox: {
        backgroundColor: "#FDF1DC",
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 10,
        borderColor: "#BFA67A",
        borderWidth: 1,
      },
      referralCode: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
      },
      tapToCopy: {
        fontSize: 12,
        color: "#E9A825",
        marginTop: 5,
        textTransform: "uppercase",
      },
      referButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#007BFF",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
      },
      referText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
        marginLeft: 8,
      },
})