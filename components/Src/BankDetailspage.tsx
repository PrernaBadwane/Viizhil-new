import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import NavigationHeader from '@/app/commonComponts/NavigationHeader'
import { MARGIN, PADDING } from '@/constants/Colors'
import PrimaryBtn from '@/appComponent/button/PrimaryButton'

const BankDetailspage = () => {

    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert('Verification Submitted!');
        }, 2000);
    };


    return (
        <SafeAreaView>
            <View>
                <NavigationHeader name='Bank Details' />

                <View style={{ ...styles.container }}>
                <View style={{ ...styles.inputContainer }}>
                        <Text style={styles.label}>Account Holder Name :</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter the Account Number"
                            placeholderTextColor="#BEBEBE"
                        />
                    </View>
                    <View style={{ ...styles.inputContainer }}>
                        <Text style={styles.label}>Account Number :</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter the Account Number"
                            placeholderTextColor="#BEBEBE"
                        />
                    </View>
                    <View style={{ ...styles.inputContainer }}>
                        <Text style={styles.label}>Confirm Account Number :</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter the Confirm Account Number"
                            placeholderTextColor="#BEBEBE"
                        />
                    </View>
                    <View style={{ ...styles.inputContainer }}>
                        <Text style={styles.label}>IFSC Code :</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter the IFSC Code"
                            placeholderTextColor="#BEBEBE"
                        />
                    </View>
                    <View style={{ ...styles.savebutton }}>
                        <PrimaryBtn action={handleSubmit} btnTxt="Submit" loading={loading} />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default BankDetailspage

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F9F9F9',
        height: "89%",
        padding: PADDING.largePad
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 5,
        color: '#060606',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#8E8E8E',
        borderRadius: 6,
        paddingHorizontal: 10,
        fontSize: 14,
        color: '#000',
        backgroundColor: '#fff',
    },
    inputContainer: {
        marginTop: MARGIN.medMar
    },
    savebutton: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        width: '100%',
    }
})