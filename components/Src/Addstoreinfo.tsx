import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import NavigationHeader from '@/app/commonComponts/NavigationHeader'
import { PADDING } from '@/constants/Colors'
import { Picker } from '@react-native-picker/picker'
import { RadioButton } from 'react-native-paper'
import PrimaryBtn from '@/appComponent/button/PrimaryButton'

const Addstoreinfo = () => {
    const [shopName, setShopName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selected, setSelected] = useState("Own Brand");
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
            <NavigationHeader name='Store Info' />
            <ScrollView>
                <View style={{ ...styles.container }}>

                    <TouchableOpacity>
                        <View style={styles.circle} />
                    </TouchableOpacity>
                    <View style={styles.textcontainer}>
                        <Text style={styles.label}>Shop Name :</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Your Shop Name"
                            placeholderTextColor="#BEBEBE"
                            value={shopName}
                            onChangeText={setShopName}
                        />
                    </View>
                    <View style={styles.textcontainer}>
                        <Text style={styles.label}>Contact Person :</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Your Contact Person"
                            placeholderTextColor="#BEBEBE"
                            value={shopName}
                            onChangeText={setShopName}
                        />
                    </View>
                    <View style={styles.picker}>
                        <Text style={styles.label}>Type of Category :</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={selectedCategory}
                                onValueChange={(itemValue: any) => setSelectedCategory(itemValue)}
                                style={styles.pickerstyle}
                                dropdownIconColor="#606060"
                            >
                                <Picker.Item label="Select category" value="" enabled={false} color="#A0A0A0" />
                                <Picker.Item label="Restaurant" value="restaurant" />
                                <Picker.Item label="Café" value="cafe" />
                                <Picker.Item label="Fast Food" value="fast_food" />
                            </Picker>
                        </View>
                    </View>
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
                    <View style={styles.textcontainer}>
                        <Text style={styles.label}>Brand Name :</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Brand Name"
                            placeholderTextColor="#BEBEBE"
                            value={shopName}
                            onChangeText={setShopName}
                        />
                    </View>
                    <View style={styles.picker}>
                        <Text style={styles.label}>Tax :</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={selectedCategory}
                                onValueChange={(itemValue: any) => setSelectedCategory(itemValue)}
                                style={styles.pickerstyle}
                                dropdownIconColor="#606060"
                            >
                                <Picker.Item label="Select Tax" value="" enabled={false} color="#A0A0A0" />
                                <Picker.Item label="0%" value="restaurant" />
                                <Picker.Item label="10%" value="cafe" />
                                <Picker.Item label="20%" value="fast_food" />
                            </Picker>
                        </View>
                    </View>
                    <View>
                        <PrimaryBtn action={handleSubmit} btnTxt="Submit" loading={loading} />
                    </View>
                </View>
            </ScrollView>
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
    textcontainer: {
        marginBottom: 15,
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
        marginBottom: 15,
    },
    pickerContainer: {
        height: 55,
        borderWidth: 1,
        borderColor: '#A0A0A0',
        borderRadius: 8,
        backgroundColor: '#FFF',
    },
    pickerstyle: {
        color: '#BEBEBE',
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
})