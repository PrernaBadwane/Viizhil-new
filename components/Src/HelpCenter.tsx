import { ScrollView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import HomeHeader from '@/app/commonComponts/HomeHeader'
import { PADDING } from '@/constants/Colors'

const HelpCenter = () => {
    return (
        <View style={styles.mainContainer}>
            <HomeHeader name='Help Center' />
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    {/* Help Center Image and Text */}
                    <View style={styles.imagecontainer}>
                        <Image source={require('../../assets/images/helpcenter.png')} style={styles.image} />
                        <Text style={styles.heading}>In what way can we help?</Text>
                        <Text style={styles.subheading}>
                            Feel free to reach out to us with your inquiries
                        </Text>
                    </View>

                    {/* Input Fields */}
                    <View>
                        <Text style={styles.label}>Subject :</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ex; About app"
                            placeholderTextColor="#aaa"
                        />
                        <Text style={styles.label}>Message :</Text>
                        <TextInput
                            style={styles.textarea}
                            placeholder="Enter here"
                            placeholderTextColor="#aaa"
                            multiline
                        />
                    </View>

                    {/* Send Button */}
                    <View style={styles.savecontainer}>
                        <TouchableOpacity style={styles.sendButton}>
                            <Text style={styles.sendButtonText}>Sent now</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Contact Info */}
                    <View>
                        <Text style={styles.label}>Contact us :</Text>
                        <View style={styles.contactContainer}>
                            <View style={styles.contactRow}>
                                <Image source={require('../../assets/images/phone.png')} style={styles.contactIcon} />
                                <Text style={styles.contactText}>+91 9360326970</Text>
                            </View>

                            <View style={styles.contactRow}>
                                <Image source={require('../../assets/images/email.png')} style={styles.contactIcon} />
                                <Text style={styles.contactText}>support@vizhil.com</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default HelpCenter

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1, 
        paddingBottom: 20,
    },
    container: {
        backgroundColor: '#F9F9F9',
        padding: PADDING.largePad
    },
    imagecontainer: {
        alignItems: 'center',
        padding: 20,
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    heading: {
        fontSize: 18,
        fontWeight: '600',
        color: '#060606',
        textAlign: 'center',
    },
    subheading: {
        fontSize: 14,
        color: '#BEBEBE',
        textAlign: 'center',
        marginTop: 5,
        fontWeight: '500',
    },
    label: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5,
    },
    input: {
        height: 50,
        borderColor: '#D0D0D0',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        fontSize: 14,
        marginBottom: 15,
    },
    textarea: {
        height: 150,
        borderColor: '#D0D0D0',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontSize: 14,
        textAlignVertical: 'top',
    },
    savecontainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    sendButton: {
        backgroundColor: "#26B24B",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
    },
    sendButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
    contactContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20,
    },
    contactRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contactIcon: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
    contactText: {
        fontSize: 14,
        color: '#36A0E2',
    },
});
