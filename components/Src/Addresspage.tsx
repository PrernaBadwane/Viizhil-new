import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import NavigationHeader from '@/app/commonComponts/NavigationHeader';
import { MARGIN, PADDING } from '@/constants/Colors';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Picker } from '@react-native-picker/picker';
import PrimaryBtn from '@/appComponent/button/PrimaryButton';

const AddressPage = () => {
    const [expanded, setExpanded] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert('Verification Submitted!');
        }, 2000);
    };

    return (
        <View style={{ flex: 1 }}>
            <NavigationHeader name='Address' />
            <ScrollView 
                style={styles.container} 
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ paddingBottom: 20 }} 
            >
                <View style={styles.addressContainer}>
                    {/* Header */}
                    <TouchableOpacity style={styles.header} onPress={() => setExpanded(!expanded)}>
                        <View style={styles.headerLeft}>
                            <Image source={require('../../assets/images/billingaddress.png')} style={{ height: 20, width: 20 }} />
                            <Text style={styles.headerText}>Grocery Billing Address</Text>
                        </View>
                        {expanded ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} size={18} />}
                    </TouchableOpacity>

                    {/* Expandable Content */}
                    {expanded && (
                        <View style={styles.content}>
                            <Text style={styles.label}>Shop Name:</Text>
                            <TextInput style={styles.input} placeholder="Enter Your Restaurant Name" />

                            <Text style={styles.label}>Door No:</Text>
                            <TextInput style={styles.input} placeholder="Door No" />

                            <Text style={styles.label}>Street Name / Landmark:</Text>
                            <TextInput style={styles.input} placeholder="Street Name / Landmark" />

                            {/* Country Picker */}
                            <Text style={styles.label}>Country:</Text>
                            <View style={styles.pickerContainer}>
                                <Picker selectedValue={selectedCountry} onValueChange={(itemValue) => setSelectedCountry(itemValue)} style={styles.pickerStyle} dropdownIconColor="#606060">
                                    <Picker.Item label="Select Country" value="" enabled={false} color="#A0A0A0" />
                                    <Picker.Item label="India" value="india" />
                                    <Picker.Item label="USA" value="usa" />
                                    <Picker.Item label="UK" value="uk" />
                                </Picker>
                            </View>

                            {/* State Picker */}
                            <Text style={styles.label}>State:</Text>
                            <View style={styles.pickerContainer}>
                                <Picker selectedValue={selectedState} onValueChange={(itemValue) => setSelectedState(itemValue)} style={styles.pickerStyle} dropdownIconColor="#606060">
                                    <Picker.Item label="Select State" value="" enabled={false} color="#A0A0A0" />
                                    <Picker.Item label="Tamil Nadu" value="tamil_nadu" />
                                    <Picker.Item label="California" value="california" />
                                    <Picker.Item label="New York" value="new_york" />
                                </Picker>
                            </View>

                            {/* City Picker */}
                            <Text style={styles.label}>City:</Text>
                            <View style={styles.pickerContainer}>
                                <Picker selectedValue={selectedCity} onValueChange={(itemValue) => setSelectedCity(itemValue)} style={styles.pickerStyle} dropdownIconColor="#606060">
                                    <Picker.Item label="Select City" value="" enabled={false} color="#A0A0A0" />
                                    <Picker.Item label="Chennai" value="chennai" />
                                    <Picker.Item label="Los Angeles" value="los_angeles" />
                                    <Picker.Item label="New York City" value="nyc" />
                                </Picker>
                            </View>

                            {/* Area Picker */}
                            <Text style={styles.label}>Area:</Text>
                            <View style={styles.pickerContainer}>
                                <Picker selectedValue={selectedArea} onValueChange={(itemValue) => setSelectedArea(itemValue)} style={styles.pickerStyle} dropdownIconColor="#606060">
                                    <Picker.Item label="Select Area" value="" enabled={false} color="#A0A0A0" />
                                    <Picker.Item label="T Nagar" value="t_nagar" />
                                    <Picker.Item label="Downtown" value="downtown" />
                                    <Picker.Item label="Brooklyn" value="brooklyn" />
                                </Picker>
                            </View>

                            {/* Submit Button */}
                            <View style={styles.savebutton}>
                                <PrimaryBtn action={handleSubmit} btnTxt="Submit" loading={loading} />
                            </View>
                        </View>
                    )}
                </View>
                <View style={styles.addressContainer}>
                    {/* Header */}
                    <TouchableOpacity style={styles.header} onPress={() => setExpanded(!expanded)}>
                        <View style={styles.headerLeft}>
                            <Image source={require('../../assets/images/pickup.png')} style={{ height: 20, width: 20 }} />
                            <Text style={styles.headerText}>Grocery Pickup Address</Text>
                        </View>
                        {expanded ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} size={18} />}
                    </TouchableOpacity>

                    {/* Expandable Content */}
                    {expanded && (
                        <View style={styles.content}>
                            <Text style={styles.label}>Shop Name:</Text>
                            <TextInput style={styles.input} placeholder="Enter Your Restaurant Name" />

                            <Text style={styles.label}>Door No:</Text>
                            <TextInput style={styles.input} placeholder="Door No" />

                            <Text style={styles.label}>Street Name / Landmark:</Text>
                            <TextInput style={styles.input} placeholder="Street Name / Landmark" />

                            {/* Country Picker */}
                            <Text style={styles.label}>Country:</Text>
                            <View style={styles.pickerContainer}>
                                <Picker selectedValue={selectedCountry} onValueChange={(itemValue) => setSelectedCountry(itemValue)} style={styles.pickerStyle} dropdownIconColor="#606060">
                                    <Picker.Item label="Select Country" value="" enabled={false} color="#A0A0A0" />
                                    <Picker.Item label="India" value="india" />
                                    <Picker.Item label="USA" value="usa" />
                                    <Picker.Item label="UK" value="uk" />
                                </Picker>
                            </View>

                            {/* State Picker */}
                            <Text style={styles.label}>State:</Text>
                            <View style={styles.pickerContainer}>
                                <Picker selectedValue={selectedState} onValueChange={(itemValue) => setSelectedState(itemValue)} style={styles.pickerStyle} dropdownIconColor="#606060">
                                    <Picker.Item label="Select State" value="" enabled={false} color="#A0A0A0" />
                                    <Picker.Item label="Tamil Nadu" value="tamil_nadu" />
                                    <Picker.Item label="California" value="california" />
                                    <Picker.Item label="New York" value="new_york" />
                                </Picker>
                            </View>

                            {/* City Picker */}
                            <Text style={styles.label}>City:</Text>
                            <View style={styles.pickerContainer}>
                                <Picker selectedValue={selectedCity} onValueChange={(itemValue) => setSelectedCity(itemValue)} style={styles.pickerStyle} dropdownIconColor="#606060">
                                    <Picker.Item label="Select City" value="" enabled={false} color="#A0A0A0" />
                                    <Picker.Item label="Chennai" value="chennai" />
                                    <Picker.Item label="Los Angeles" value="los_angeles" />
                                    <Picker.Item label="New York City" value="nyc" />
                                </Picker>
                            </View>

                            {/* Area Picker */}
                            <Text style={styles.label}>Area:</Text>
                            <View style={styles.pickerContainer}>
                                <Picker selectedValue={selectedArea} onValueChange={(itemValue) => setSelectedArea(itemValue)} style={styles.pickerStyle} dropdownIconColor="#606060">
                                    <Picker.Item label="Select Area" value="" enabled={false} color="#A0A0A0" />
                                    <Picker.Item label="T Nagar" value="t_nagar" />
                                    <Picker.Item label="Downtown" value="downtown" />
                                    <Picker.Item label="Brooklyn" value="brooklyn" />
                                </Picker>
                            </View>

                            {/* Submit Button */}
                            <View style={styles.savebutton}>
                                <PrimaryBtn action={handleSubmit} btnTxt="Submit" loading={loading} />
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

export default AddressPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: PADDING.largePad,
        backgroundColor: '#F9F9F9',
    },
    addressContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
        overflow: 'hidden',
        margin:MARGIN.miniMar
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: PADDING.medPad,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#333',
    },
    content: {
        paddingHorizontal: 15,
        paddingBottom: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        marginTop: 10,
        color: '#060606',
    },
    input: {
        backgroundColor: '#F9F9F9',
        padding: PADDING.smlPad,
        borderRadius: 5,
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#BEBEBE',
    },
    pickerContainer: {
        height: 50,
        backgroundColor: '#F9F9F9',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        marginTop: 5,
    },
    pickerStyle: {
        color: '#333',
        fontSize: 14,
    },
    savebutton: {
        marginTop: MARGIN.largeMar,
    },
});
