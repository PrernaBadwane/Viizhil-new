import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import NavigationHeader from '@/app/commonComponts/NavigationHeader';
import { MARGIN, PADDING } from '@/constants/Colors';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Picker } from '@react-native-picker/picker';
import PrimaryBtn from '@/appComponent/button/PrimaryButton';
import { ApiClient } from './api/apiBaseUrl';

const AddressPage = () => {
    const [expanded, setExpanded] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const [loading, setLoading] = useState(false);
    const [countryList, setCountryList] = useState([])
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [areaList, setAreaList] = useState([]);

    const handleSubmit = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert('Verification Submitted!');
        }, 2000);
    };


    useEffect(() => {
        GetAllCountry();
        GetAllState();
        GetAllCity();
        GetAllArea();
    }, [])

    

    const GetAllCountry = async () => {
        try {
            const response = await ApiClient.post("/list_api_services?table_name=ViewCurrency")
            if (response.data && response.data.data) {
                // const Country = response.data.data.filter((v:any)=>v.UID != 0);
                setCountryList(response.data.data);
                // setCountryList(Country)
               
            }
        } catch (error) {
            console.error("Error fetching countries:", error);
        }
    }

    const GetAllState = async () => {
        try {
            const response = await ApiClient.post("/list_api_services?table_name=ViewState")
            if (response.data && response.data.data) {
                setStateList(response.data.data); 
            }
        } catch (error) {
            console.error("Error fetching states:", error);
        }
    }

    const GetAllCity = async () => {
        try {
            const response = await ApiClient.post("/list_api_services?table_name=ViewCity")
            if (response.data && response.data.data) {
                setCityList(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    }

    const GetAllArea = async () => {
        try {
            const response = await ApiClient.post("/list_api_services?table_name=ViewArea")
            if (response.data && response.data.data) {
                const data = response.data.data;
                setAreaList(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching areas:", error);
        }
    }

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
                            <TextInput style={styles.input} placeholder="Door No" keyboardType='numeric' />

                            <Text style={styles.label}>Street Name / Landmark:</Text>
                            <TextInput style={styles.input} placeholder="Street Name / Landmark" />

                            {/* Country Picker */}
                            <Text style={styles.label}>Country:</Text>
                            <View style={styles.pickerContainer}>
                                <Picker selectedValue={selectedCountry} onValueChange={(itemValue) => setSelectedCountry(itemValue)} style={styles.pickerStyle} dropdownIconColor="#606060">
                                    <Picker.Item label="Select Country" value="" enabled={false} color="#A0A0A0" />
                                    {countryList.map((country: any, index: any) => (
                                        <Picker.Item key={index} label={country.Country} value={country.UID} color='#000'/>
                                    ))}
                                </Picker>
                            </View>

                            {/* State Picker */}
                            <Text style={styles.label}>State:</Text>
                            <View style={styles.pickerContainer}>
                                <Picker selectedValue={selectedState} onValueChange={(itemValue) => setSelectedState(itemValue)} style={styles.pickerStyle} dropdownIconColor="#606060">
                                    <Picker.Item label="Select State" value="" enabled={false} color="#A0A0A0" />
                                    {stateList.map((state:any, index) => (
                                    <Picker.Item key={index} label={state.StateName} value={state.StateID} color='#000'/>
                                    ))}
                                </Picker>
                            </View>

                            {/* City Picker */}
                            <Text style={styles.label}>City:</Text>
                            <View style={styles.pickerContainer}>
                                <Picker selectedValue={selectedCity} onValueChange={(itemValue) => setSelectedCity(itemValue)} style={styles.pickerStyle} dropdownIconColor="#606060">
                                    <Picker.Item label="Select City" value="" enabled={false} color="#A0A0A0" />
                                    {cityList.map((city:any, index) => (
                                    <Picker.Item label={city.City} value={city.CityID} key={index} color='#000'/>
                                    ))}
                                </Picker>
                            </View>

                            {/* Area Picker */}
                            <Text style={styles.label}>Area:</Text>
                            <View style={styles.pickerContainer}>
                                <Picker selectedValue={selectedArea} onValueChange={(itemValue) => setSelectedArea(itemValue)} style={styles.pickerStyle} dropdownIconColor="#606060">
                                    <Picker.Item label="Select Area" value="" enabled={false} color="#A0A0A0" />
                                    {areaList.map((area:any, index) => (
                                    <Picker.Item label={area.AreaName} value={area.UID} key={index} color='#000'/>
                                    ))}
                                </Picker>
                            </View>

                            <Text style={styles.label}>Postal Code:</Text>
                            <TextInput style={styles.input} placeholder="Door No" keyboardType='numeric' />

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
                                    {countryList.map((country: any, index: any) => (
                                        <Picker.Item key={index} label={country.Country} value={country.UID} color='#000'/>
                                    ))}
                                   
                                </Picker>
                            </View>

                            {/* State Picker */}
                            <Text style={styles.label}>State:</Text>
                            <View style={styles.pickerContainer}>
                                <Picker selectedValue={selectedState} onValueChange={(itemValue) => setSelectedState(itemValue)} style={styles.pickerStyle} dropdownIconColor="#606060">
                                    <Picker.Item label="Select State" value="" enabled={false} color="#A0A0A0" />
                                    {stateList.map((state:any, index) => (
                                    <Picker.Item key={index} label={state.StateName} value={state.StateID} color='#000'/>
                                    ))}
                                   
                                </Picker>
                            </View>

                            {/* City Picker */}
                            <Text style={styles.label}>City:</Text>
                            <View style={styles.pickerContainer}>
                                <Picker selectedValue={selectedCity} onValueChange={(itemValue) => setSelectedCity(itemValue)} style={styles.pickerStyle} dropdownIconColor="#606060">
                                    <Picker.Item label="Select City" value="" enabled={false} color="#A0A0A0" />
                                    {cityList.map((city:any, index) => (
                                    <Picker.Item label={city.City} value={city.CityID} key={index} color='#000'/>
                                    ))}
                                    
                                </Picker>
                            </View>

                            {/* Area Picker */}
                            <Text style={styles.label}>Area:</Text>
                            <View style={styles.pickerContainer}>
                                <Picker selectedValue={selectedArea} onValueChange={(itemValue) => setSelectedArea(itemValue)} style={styles.pickerStyle} dropdownIconColor="#606060">
                                    <Picker.Item label="Select Area" value="" enabled={false} color="#A0A0A0" />
                                    {areaList.map((area:any, index) => (
                                    <Picker.Item label={area.AreaName} value={area.UID} key={index} color='#000'/>
                                    ))}
                                   
                                </Picker>
                            </View>

                            <Text style={styles.label}>Postal Code:</Text>
                            <TextInput style={styles.input} placeholder="Door No" keyboardType='numeric' />

                            <View style={styles.locationcontainer}>
                                {/* Locate Me Button */}
                                <TouchableOpacity style={{ ...styles.button, marginTop: 25 }}>
                                    <Text style={styles.buttonText}>Locate Me</Text>
                                </TouchableOpacity>

                                {/* Latitude Section */}
                                <View style={styles.column}>
                                    <Text style={styles.locationlabel}>Latitude:</Text>
                                    <View style={styles.button}>
                                        <Text style={styles.buttonText}>9.000</Text>
                                    </View>
                                </View>

                                {/* Longitude Section */}
                                <View style={styles.column}>
                                    <Text style={styles.locationlabel}>Longitude:</Text>
                                    <View style={styles.button}>
                                        <Text style={styles.buttonText}>79.11</Text>
                                    </View>
                                </View>
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
        margin: MARGIN.miniMar
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
    locationcontainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        marginTop: 10,
    },
    column: {
        alignItems: "center",
    },
    locationlabel: {
        fontSize: 14,
        fontWeight: "500",
        marginBottom: 5,
    },
    button: {
        backgroundColor: "#26B24B",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        width: "35%",
        alignItems: "center",
        minWidth: 80,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});
