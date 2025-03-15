import { Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavigationHeader from '@/app/commonComponts/NavigationHeader'
import Colors, { CommonStyles, MARGIN, PADDING } from '@/constants/Colors'
import { Picker } from '@react-native-picker/picker'
import { RadioButton } from 'react-native-paper'
import PrimaryBtn from '@/appComponent/button/PrimaryButton'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCamera, faImages, faXmark } from '@fortawesome/free-solid-svg-icons'
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiClient } from './api/apiBaseUrl'
import { AddBrand, AddShop, UpdateBrand, UpdateShop } from './api/apiService'

const Addstoreinfo = () => {
    const [shopName, setShopName] = useState('');
    const [contactperson, setContactperson] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [brand, setbrand] = useState('');
    const [brandID, setbrandID] = useState('');
    const [taxId, setTaxId] = useState('');
    const [profileLogo, setProfileLogo] = useState('');
    const [profileLogoname, setProfileLogoname] = useState('');
    const [profileLogotype, setProfileLogotype] = useState('');
    const [selectedTax, setSelectedTax] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState([]);
    const [selectedCategoryType, setSelectedCategoryType] = useState([]);
    const [selected, setSelected] = useState("Own Brand");
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState({
        shopName: '',
        contactperson: '',
        brand: '',
        taxId: '',
        selectedBrand: '',
        selectedCategory: '',
        selectedCategoryType: ''
    });

    const ShopBrand = async () => {
        try {
            setLoading(true)
            let response: any = null
            if(editdata === true){
                response = await UpdateBrand({ BrandName: brand, BrandID: brandID, Status: true, })

            }else{
               response = await AddBrand({ BrandName: brand, Status: true, })
            }
            const status = response.status;
            const message = response.data.message;
            if (status === 200) {
                alert(message);
                setSelectedBrand(response.data.data.BrandID)
            } else {
                alert('Something went wrong');
            }
            setLoading(false)
        } catch (error) {
            console.error(error, 'ShopBrand')
        }
    }
    const getShopData = async () => {
        const shopId: any = await AsyncStorage.getItem('AllshoeId')
        const parsedData = JSON.parse(shopId)
        setShopName(parsedData.ShopName)
        setContactperson(parsedData.ContactPerson)
        setSelectedCategory(parsedData.Category)
        setbrand(parsedData.Brand)
        setbrandID(parsedData.BrandID)
        setTaxId(parsedData.TaxId)
        setSelectedBrand(parsedData.BrandID)
        setSelectedCategoryType(parsedData.Category)
        setProfileLogo("https://cnt.vizhil.com/images/grocery/shop/logo/" + parsedData.Logo)
        console.log(parsedData.Logo, 'logo')
    }

    const validateForm = () => {
        let errors: any = {};
        let isValid = true;

        if (!shopName.trim()) {
            errors.shopName = "Shop Name is required";
            isValid = false;
        }
        if (!contactperson.trim()) {
            errors.contactperson = "Contact Person is required";
            isValid = false;
        }
        if (!selectedCategory) {
            errors.selectedCategory = "Category is required";
            isValid = false;
        }
        if (selected === "Own Brand" && !brand.trim()) {
            errors.brand = "Brand Name is required";
            isValid = false;
        }
        if (selected === "Franchise Brand" && !brandID) {
            errors.selectedBrand = "Please select a brand";
            isValid = false;
        }
        if (!taxId) {
            errors.taxId = "Please select a tax";
            isValid = false;
        }

        setErrorMessage(errors);
        return isValid;
    };

    const AddShopDetails = async () => {
        try {
            const shopId:any = await AsyncStorage.getItem('AllshoeId');
            const UserId = "4665"; // Static User ID
    
            let formdata:any = new FormData();
            formdata.append("Id", parseInt(shopId || "0"));
            formdata.append("ShopName", shopName || "");
            formdata.append("ContactPerson", contactperson || "");
            formdata.append("Category", selectedCategory || "");
            formdata.append("Brand", brand || "");
            formdata.append("TaxId", taxId || 0);
            formdata.append("UserId", UserId);
    
            if (profileLogo && profileLogo.includes('https')) {
                formdata.append("Logo", {
                    uri: profileLogo,
                    name: profileLogoname,
                    type: profileLogotype
                });
            }
    
            console.log("🚀 Sending FormData:", [...formdata.entries()]); // Debugging FormData
    
            let response;
            if (shopId && shopId !== "0") {
                response = await UpdateShop(formdata);
            } else {
                response = await AddShop(formdata);
                await AsyncStorage.setItem('AllshoeId', JSON.stringify(response?.data?.data?.Id || 0));
            }
    
            console.log("🔍 API Response:", response); // Debug API response
    
            if (response && response.status === 200) {
                alert(response.data.message);
            } else {
                alert('Something went wrong');
            }
        } catch (error:any) {
            console.error("❌ Axios Error:", error.response ? error.response.data : error);
        } finally {
            setLoading(false);
        }
    };
    

    const handleShop = () => {
        if (validateForm()) {
            setLoading(true);

            // Call AddShopDetails function
            AddShopDetails();

            // Call getShopData function
            getShopData();

            ShopBrand()


            setTimeout(() => {
                setLoading(false);
                alert('Verification Submitted!');
            }, 2000);
        }
    };


    useEffect(() => {
        Taxdata();
        Branddata();
        Categorydata();

    }, [])

    const openCamera = async () => {
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();

        if (cameraPermission.status !== "granted") {
            alert("Sorry, we need camera permissions to make this work!");
            return;
        }
        try {
            let result: any = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                aspect: [1, 1],
                quality: 0.1,
                // base64: true,
            });
            const fileurinamesplit = result.assets[0].uri.split('/');
            const getfilename = fileurinamesplit[fileurinamesplit.length - 1];
            setProfileLogo(result.assets[0].uri);
            setProfileLogoname(getfilename);
            setProfileLogotype(result.assets[0].mimeType);
        } catch (error) { }
        setModalVisible(false);
    };
    const openGallery = async () => {
        const libraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (libraryPermission.status !== "granted") {
            alert("Sorry, we need photo library permissions to make this work!");
            return;
        }
        try {
            const image: any = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,

                allowsEditing: false,
                aspect: [1, 1],
                quality: 0.1,
            });
            const fileurinamesplit = image.assets[0].uri.split('/');
            const getfilename = fileurinamesplit[fileurinamesplit.length - 1];
            setProfileLogo(image.assets[0].uri);
            setProfileLogoname(getfilename);
            setProfileLogotype(image.assets[0].mimeType);
        } catch (error) {
            console.error(error, 'openGallery')
        }
        setModalVisible(false);
    }
    const Categorydata = async () => {
        try {
            setLoading(true)
            const response = await ApiClient.get('/sp_View_GroceryCategory?')
            const dt = response.data.data
            setSelectedCategoryType(dt)
        } catch (error) {
            console.error(error, 'Categorydata')
        } finally {
            setLoading(false)
        }
    }

    const Branddata = async () => {
        try {
            setLoading(true)
            const response = await ApiClient.get('/sp_View_GroceryBrand?')
            const dt = response.data.data
            const filteredData = dt.filter((item: any) => item.Status === true);
            setSelectedBrand(filteredData)
        } catch (error) {
            console.error(error, 'Branddata')
        } finally {
            setLoading(false)
        }
    }

    const Taxdata = async () => {
        try {
            setLoading(true)
            const response = await ApiClient.get('/list_api_services?table_name=ViewTaxMaster')
            const dt = response.data.data
            const sortedTax = dt.sort((a: any, b: any) => {
                return a.TaxPercentage - b.TaxPercentage
            })
            setSelectedTax(sortedTax)
            setLoading(false)
        } catch (error) {
            console.error(error, 'Taxdata')
        } finally {
            setLoading(false)
        }
    }


    return (
        <View style={{ flex: 1 }}>
            <NavigationHeader name='Store Info' />
            <ScrollView>
                <View style={{ ...styles.container }}>

                    <TouchableOpacity onPress={() => { setModalVisible(true); }} >
                        <View style={styles.circle}>
                            <Image source={{ uri: profileLogo }} style={{ ...styles.circlelogo }} />
                            <View style={{ ...styles.image }}>
                                <Image source={require('../../assets/images/cameraIcon.png')} style={{ ...styles.imagelogo }} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.textcontainer}>
                        <Text style={styles.label}>Shop Name :</Text>
                        <TextInput
                            style={{ ...styles.input, borderColor: errorMessage.shopName ? '#FF0000' : '#8E8E8E' }}
                            placeholder="Enter Your Shop Name"
                            placeholderTextColor="#BEBEBE"
                            value={shopName}
                            onChangeText={(text) => {
                                setShopName(text)
                                setErrorMessage({ ...errorMessage, shopName: '' });
                            }}
                        />
                    </View>
                    {errorMessage.shopName ? <Text style={{ ...CommonStyles.errorText }}>{errorMessage.shopName}</Text> : null}
                    <View style={styles.textcontainer}>
                        <Text style={styles.label}>Contact Person :</Text>
                        <TextInput
                            style={{ ...styles.input, borderColor: errorMessage.contactperson ? '#FF0000' : '#8E8E8E' }}
                            placeholder="Enter Your Contact Person"
                            placeholderTextColor="#BEBEBE"
                            value={contactperson}
                            onChangeText={(text) => {
                                setContactperson(text)
                                setErrorMessage({ ...errorMessage, contactperson: '' })
                            }}
                        />
                    </View>
                    {errorMessage.contactperson ? <Text style={{ ...CommonStyles.errorText }}>{errorMessage.contactperson}</Text> : null}
                    <View style={styles.picker}>
                        <Text style={styles.label}>Type of Category :</Text>
                        <View style={{ ...styles.pickerContainer, borderColor: errorMessage.selectedCategory ? '#FF0000' : '#A0A0A0' }}>
                            <Picker
                                selectedValue={selectedCategory}
                                onValueChange={(itemValue: any) => {
                                    setSelectedCategory(itemValue)
                                    setErrorMessage({ ...errorMessage, selectedCategory: '' })
                                }}
                                style={{ ...styles.pickerstyle }}
                                dropdownIconColor="#606060"
                            >
                                <Picker.Item label="Select category" value="" color='#BEBEBE' />
                                {selectedCategoryType.map((item: any, index: any) => (
                                    <Picker.Item key={index} label={item.CategoryName} value={item.Id} color='#000' />
                                ))}
                            </Picker>
                        </View>
                    </View>
                    {errorMessage.selectedCategory ? <Text style={{ ...CommonStyles.errorText }}>{errorMessage.selectedCategory}</Text> : null}
                    <View style={styles.brandcontainer}>
                        <Text style={styles.labebrand}>Brand type :</Text>
                        <View style={styles.toggleContainer}>
                            <TouchableOpacity
                                style={[styles.option, selected === "Own Brand" && styles.selectedOption]}
                                onPress={() => setSelected("Own Brand")}
                            >
                                <RadioButton
                                    value="Own Brand"
                                    status={selected === "Own Brand" ? "checked" : "unchecked"}
                                    onPress={() => setSelected("Own Brand")}
                                    color="green"
                                />
                                <Text style={[styles.optionText, selected === "Own Brand" && styles.selectedText]}>
                                    Own Brand
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.option, selected === "Franchise Brand" && styles.selectedOption]}
                                onPress={() => setSelected("Franchise Brand")}
                            >
                                <RadioButton
                                    value="Franchise Brand"
                                    status={selected === "Franchise Brand" ? "checked" : "unchecked"}
                                    onPress={() => setSelected("Franchise Brand")}
                                    color="green"
                                />
                                <Text style={[styles.optionText, selected === "Franchise Brand" && styles.selectedText]}>
                                    Franchise Brand
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {selected === "Own Brand" ? (
                        <View style={styles.textcontainer}>
                            <Text style={styles.label}>Brand Name :</Text>
                            <TextInput
                                style={{ ...styles.input, borderColor: errorMessage.brand ? '#FF0000' : '#8E8E8E' }}
                                placeholder="Enter Brand Name"
                                placeholderTextColor="#BEBEBE"
                                value={brand}
                                onChangeText={setbrand}
                            />
                        </View>
                    ) : selected === "Franchise Brand" ? (
                        <View style={styles.picker}>
                            <Text style={styles.label}>Brand Name :</Text>
                            <View style={{ ...styles.pickerContainer, borderColor: errorMessage.selectedBrand ? '#FF0000' : '#A0A0A0' }}>
                                <Picker
                                    selectedValue={brandID}
                                    onValueChange={(itemValue: any) => setbrandID(itemValue)}
                                    style={styles.pickerstyle}
                                    dropdownIconColor="#606060"
                                >
                                    <Picker.Item label="Select Brand" value="" enabled={false} color="#A0A0A0" />
                                    {selectedBrand.map((item: any, index: any) => (
                                        <Picker.Item key={index} label={item.BrandName} value={item.Id} />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                    ) : null}
                    {errorMessage.brand ? <Text style={{ ...CommonStyles.errorText }}>{errorMessage.brand}</Text> : null}
                    <View style={styles.picker}>
                        <Text style={styles.label}>Tax :</Text>
                        <View style={{ ...styles.pickerContainer, borderColor: errorMessage.taxId ? '#FF0000' : '#A0A0A0' }}>
                            <Picker
                                selectedValue={taxId}
                                onValueChange={(itemValue: any) => {
                                    setTaxId(itemValue)
                                    setErrorMessage({ ...errorMessage, taxId: '' })
                                }}
                                style={styles.pickerstyle}
                                dropdownIconColor="#606060"
                            >
                                <Picker.Item label="Select Tax" value="" enabled={false} color="#A0A0A0" />
                                {selectedTax.map((item: any, index: any) => (
                                    <Picker.Item key={index} label={item.TaxName} value={item.UID} />
                                ))}
                            </Picker>
                        </View>
                        {errorMessage.taxId ? <Text style={{ ...CommonStyles.errorText, marginTop: 10 }}>{errorMessage.taxId}</Text> : null}
                    </View>

                    <View style={{marginTop:MARGIN.largeMar}}>
                        <PrimaryBtn action={handleShop} btnTxt="Save" loading={loading} />
                    </View>
                </View>
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => { setModalVisible(false) }}
            >
                <View style={styles.modalContainer1}>
                    <TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }} onPress={() => { setModalVisible(false) }}>
                        <View style={styles.modalCloseButton}>
                            <FontAwesomeIcon icon={faXmark} size={18} color='#000' style={{ marginTop: 3 }} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select upload option</Text>
                        <TouchableOpacity
                            onPress={openCamera}
                            style={styles.modalOptionContainer}
                        >
                            <FontAwesomeIcon icon={faCamera} size={16} color='#000' style={{ marginTop: 3 }} />
                            <Text style={styles.modalText}>Take a photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={openGallery}
                            style={styles.modalOptionContainer}
                        >
                            <FontAwesomeIcon icon={faImages} size={16} color='#000' style={{ marginTop: 3 }} />
                            <Text style={styles.modalText}>Choose from gallery</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default Addstoreinfo

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#F9F9F9',
        padding: PADDING.largePad
    },
    circle: {
        width: 150,
        height: 150,
        borderRadius: 100,
        backgroundColor: '#D3D3D3',
        alignSelf: 'center',
        marginVertical: 20,
    },
    circlelogo: {
        width: 150,
        height: 150,
        borderRadius: 100
    },
    textcontainer: {
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#060606',
        marginBottom: 5,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#8E8E8E',
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 14,
        color: '#000',
        backgroundColor: '#FFF',
    },
    picker: {
        marginBottom: 10,
    },
    pickerContainer: {
        height: 55,
        borderWidth: 1,
        borderColor: '#A0A0A0',
        borderRadius: 8,
        backgroundColor: '#FFF',
    },
    pickerstyle: {
        alignItems: 'center'
    },
    brandcontainer: {
        marginBottom: 15,
    },
    labebrand: {
        fontSize: 16,
        marginBottom: 10,
    },
    toggleContainer: {
        flexDirection: "row",
        gap: 10,
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#8E8E8E",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        minWidth: 150,
        justifyContent: "flex-start",
    },
    selectedOption: {
        borderColor: "#26B24B",
    },
    optionText: {
        fontSize: 16,
        color: "#BEBEBE",
    },
    selectedText: {
        color: "black",
        fontWeight: "bold",
    },
    image: {
        width: 100,
        height: 100,
        flex: 1,
        left: 60,
    },
    imagelogo: {
        width: 40,
        height: 40,
        position: "absolute",
        right: 0,
        bottom: 30,
    },
    modalContainer1: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalCloseButton: {
        margin: 10,
        padding: 10,
        borderRadius: 100,
        backgroundColor: 'white'
    },
    modalContent: {
        backgroundColor: "white",
        color: "black",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    modalTitle: {
        fontSize: 16,
        margin: 20,
        textAlign: "center",
    },
    modalOptionContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        backgroundColor: "white",
        color: "black",
    },
    modalText: {
        fontSize: 14,
        margin: 20,
        textAlign: "center",
    },
})

function setProfileimage(uri: any) {
    throw new Error('Function not implemented.')
}
