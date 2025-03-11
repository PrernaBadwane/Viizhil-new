import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import HomeHeader from '@/app/commonComponts/HomeHeader'
import { MARGIN, PADDING } from '@/constants/Colors'
import PrimaryBtn from '@/appComponent/button/PrimaryButton'

const ChangePasswordpage = () => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert('Verification Submitted!');
        }, 2000);
    };
    return (
        <View>
            <HomeHeader name='Change password' />
            <View style={{ ...styles.container }}>
                <View>
                    <Text style={{ ...styles.textContainer }}>Set the new Password for your account as you
                        can login and access all the features.</Text>
                    <View>
                        <View style={styles.Inputcontainer}>
                            <Text style={styles.label}>Old Password</Text>
                            <TextInput
                                style={styles.input}
                                secureTextEntry={true}
                                placeholder=""
                            />
                        </View>
                    </View>
                    <View>
                        <View style={styles.Inputcontainer}>
                            <Text style={styles.label}>New Password</Text>
                            <TextInput
                                style={styles.input}
                                secureTextEntry={true}
                                placeholder=""
                            />
                        </View>
                    </View>
                    <View>
                        <View style={styles.Inputcontainer}>
                            <Text style={styles.label}>New Password</Text>
                            <TextInput
                                style={styles.input}
                                secureTextEntry={true}
                                placeholder=""
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.savecontainer}>
                  
                    <View style={styles.savebutton}>
                        <PrimaryBtn action={handleSubmit} btnTxt="Save" loading={loading} />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ChangePasswordpage

const styles = StyleSheet.create({
    container: {
        height: '80%',
        backgroundColor: '#F9F9F9',
        // backgroundColor: 'red',
        padding: PADDING.largePad
    },
    textContainer: {
        color: '#747474',
        fontSize: 16,
        fontWeight: '600'
    },
    Inputcontainer: {
        // marginBottom: 20,
        marginTop: MARGIN.largeMar
    },
    label: {
        fontSize: 14,
        color: '#1E1E1E',
        marginBottom: 10,
        fontWeight: '600',
    },
    input: {
        height: 50,
        backgroundColor: '#F3F3F3',
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    savecontainer: {
        // flex: 1, // Takes full height
        // justifyContent: 'flex-end', // Pushes content to the bottom
    },
    savebutton: {
       marginTop:'80%'
    },

})