import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavigationHeader from '@/app/commonComponts/NavigationHeader'
import { MARGIN, PADDING } from '@/constants/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { VerificedGst } from './api/apiService'
import { ApiClient } from './api/apiBaseUrl'


const Verificationpage = () => {
    const [gst, setGst] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
    const [isGstVerified, setIsGstVerified] = useState(false);
    const [gstError, setGstError] = useState("");
    const [loading, setLoading] = useState(false);

    
    useEffect(() => {
        console.log("GST Verified State Updated:", isGstVerified);
      }, [isGstVerified]);
    
      const validateGst = (gst: string) => {
        const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
        return gstRegex.test(gst);
      };
    
      const handleVerifiedGst = async () => {
        const shopId = await AsyncStorage.getItem("AllshopId");
    
        if (!gst) {
          setGstError("GST number is required!");
          return;
        } else if (!validateGst(gst)) {
          setGstError("Invalid GST number!");
          return;
        }
    
        try {
          setLoading(true);
          const response = await VerificedGst(shopId, gst);
    
          if (response.success) {
            setIsGstVerified(true);
            setGstError("");
          } else {
            setGstError(response.message || "GST verification failed!");
          }
        } catch (error) {
          setGstError("Failed to verify GST. Please try again!");
          console.error("GST Verification Error:", error);
        } finally {
          setLoading(false);
        }
      };

    return (
        <SafeAreaView>
            <NavigationHeader name='Verification' />
            <View style={{ ...styles.container }}>
                <View>
                    <Text style={{ ...styles.textContainer }}>Enter your Verification Details Below</Text>
                </View>
                <View style={styles.gstcontainer}>
                    <Text style={styles.label}>GST Number :</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter GST no"
                            placeholderTextColor="#A0A0A0"
                            value={gst}
                            onChangeText={(text) => {
                                setGst(text)
                                setGstError("")
                                setIsGstVerified(false);
                            }}
                        />
                        {isGstVerified ?
                            <Image source={require('../../assets/images/check.png')} style={{ width: 25, height: 25, resizeMode: 'contain', }} />
                            :
                            <TouchableOpacity style={styles.verifyButton} onPress={handleVerifiedGst}>
                                <Text style={styles.verifyText}>Verify</Text>
                            </TouchableOpacity>
                        }
                    </View>
                    {gstError ? <Text style={styles.errorText}>{gstError}</Text> : null}
                </View>
                <View style={styles.gstcontainer}>
                    <Text style={styles.label}>Email ID : :</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            maxLength={15}
                            style={styles.input}
                            placeholder="Enter Your Email"
                            placeholderTextColor="#A0A0A0"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                        {isPhoneVerified ?
                            <Image source={require('../../assets/images/check.png')} style={{ width: 25, height: 25, resizeMode: 'contain', }} />
                            :
                            <TouchableOpacity style={styles.verifyButton}>
                                <Text style={styles.verifyText}>Verify</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
                <View style={styles.gstcontainer}>
                    <Text style={styles.label}>Phone Number :</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your Number"
                            placeholderTextColor="#A0A0A0"
                            value={phoneNumber}
                            onChangeText={(text) => setPhoneNumber(text)}
                        />
                        {isGstVerified ?
                            <Image source={require('../../assets/images/check.png')} style={{ width: 25, height: 25, resizeMode: 'contain', }} />
                            :
                            <TouchableOpacity style={styles.verifyButton}>
                                <Text style={styles.verifyText}>Verify</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>

            </View>

        </SafeAreaView>
    )
}

export default Verificationpage

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F9F9F9',
        height: "93%",
        padding: PADDING.largePad
    },
    textContainer: {
        fontSize: 20,
        color: "#2B2827",
        textAlign: "center",
        fontWeight: '700',
        margin: MARGIN.miniMar,
        right: 10,
    },
    gstcontainer: {
        marginVertical: 10,
        marginTop: MARGIN.medMar,
    },
    label: {
        fontSize: 15,
        fontWeight: '500',
        color: '#060606',
        marginBottom: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#B0B0B0',
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#FFF',
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 14,
        color: '#000',
    },
    verifyButton: {
        backgroundColor: '#28A745',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 6,
        height: 30,
        marginLeft: 10,
    },
    verifyText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
    errorText: {
        color: "red",
        marginTop: 5
    }

})