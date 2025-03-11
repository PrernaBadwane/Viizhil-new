import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import HomeHeader from '@/app/commonComponts/HomeHeader'
import { MARGIN, PADDING } from '@/constants/Colors'
import { RadioButton } from 'react-native-paper'
import PrimaryBtn from '@/appComponent/button/PrimaryButton'

const EditProfilePage = () => {
    const [gender, setGender] = useState('Male');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
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
            <HomeHeader name='Edit Profile' />
            <View style={{ ...styles.container }}>
                <View style={{ ...styles.circlecontainer }}>
                    <View style={{ ...styles.circle }}></View>
                    <View style={styles.profilecontainer}>
                        <Text style={styles.label}>First Name</Text>
                        <TextInput style={styles.input} placeholder="Enter first name" placeholderTextColor="#ccc" />

                        <Text style={styles.label}>Last Name</Text>
                        <TextInput style={styles.input} placeholder="Enter last name" placeholderTextColor="#ccc" />

                        <Text style={styles.label}>Gender</Text>
                        <View style={styles.radioGroup}>
                            {['Male', 'Female', 'Other'].map((option) => (
                                <View key={option} style={styles.radioItem}>
                                    <RadioButton
                                        value={option}
                                        status={gender === option ? 'checked' : 'unchecked'}
                                        onPress={() => setGender(option)}
                                        color="green"
                                    />
                                    <Text>{option}</Text>
                                </View>
                            ))}
                        </View>
                        <View style={styles.mobilecontainer}>
                            <Text style={styles.labelmobile}>Mobile Number</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.inputmobile}
                                    placeholder=""
                                    value={mobileNumber}
                                    onChangeText={setMobileNumber}
                                    keyboardType="phone-pad"
                                />
                                <TouchableOpacity>
                                    <Text style={styles.updateText}>Update</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.mobilecontainer}>
                            <Text style={styles.labelmobile}>Email</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.inputmobile}
                                    placeholder=""
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="phone-pad"
                                />
                                <TouchableOpacity>
                                    <Text style={styles.updateText}>Update</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{marginTop: MARGIN.largeMar}}>
                            <PrimaryBtn action={handleSubmit} btnTxt="Save" loading={loading} />
                        </View>
                    </View>

                </View>
            </View>

        </View>
    )
}

export default EditProfilePage

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#F9F9F9',
        padding: PADDING.largePad
    },
    circlecontainer: {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'white',
    },
    circle: {
        width: 120,
        height: 120,
        borderRadius: 70,
        backgroundColor: '#D9D9D9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5
    },
    profilecontainer: {
        marginTop: 20,
        padding: 20,
        width: '100%',
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3, // For Android shadow
    },
    label: {
        fontSize: 14,
        fontWeight: "500",
        marginBottom: 5,
        color: "#333",
    },
    input: {
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
        height: 40,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    radioGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: 'space-between'
    },
    radioItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    mobilecontainer: {
        marginVertical: 10,
    },
    labelmobile: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f3f3f3',
        borderRadius: 10,
        paddingHorizontal: 15,
        height: 45,
    },
    inputmobile: {
        flex: 1,
        fontSize: 16,
    },
    updateText: {
        color: 'green',
        fontWeight: 'bold',
    },
})