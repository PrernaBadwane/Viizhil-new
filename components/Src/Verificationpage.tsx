import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import NavigationHeader from '@/app/commonComponts/NavigationHeader'
import { MARGIN, PADDING } from '@/constants/Colors'
import PrimaryBtn from '@/appComponent/button/PrimaryButton'

const Verificationpage = () => {
    const [gst, setGst] = useState('');

   
    return (
        <SafeAreaView>
            <NavigationHeader name='verification' />
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
                            onChangeText={(text) => setGst(text)}
                        />
                        <TouchableOpacity style={styles.verifyButton}>
                            <Text style={styles.verifyText}>Verify</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.gstcontainer}>
                    <Text style={styles.label}>Email ID : :</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Your Email"
                            placeholderTextColor="#A0A0A0"
                            value={gst}
                            onChangeText={(text) => setGst(text)}
                        />
                        <TouchableOpacity style={styles.verifyButton}>
                            <Text style={styles.verifyText}>Verify</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.gstcontainer}>
                    <Text style={styles.label}>Phone Number :</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your Number"
                            placeholderTextColor="#A0A0A0"
                            value={gst}
                            onChangeText={(text) => setGst(text)}
                        />
                        <TouchableOpacity style={styles.verifyButton}>
                            <Text style={styles.verifyText}>Verify</Text>
                        </TouchableOpacity>
                    </View>
                </View>
              
            </View>

        </SafeAreaView>
    )
}

export default Verificationpage

const styles = StyleSheet.create({
    container: {
        // backgroundColor: "red",
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
   
})