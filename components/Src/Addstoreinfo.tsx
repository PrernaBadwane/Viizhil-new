import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import NavigationHeader from '@/app/commonComponts/NavigationHeader'
import { PADDING } from '@/constants/Colors'
import { Picker } from '@react-native-picker/picker'

const Addstoreinfo = () => {
    const [shopName, setShopName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    return (
        <View style={{ flex: 1 }}>
            <NavigationHeader name='Store Info' />
            <View style={{ ...styles.container }}>
                <ScrollView>

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
                                onValueChange={(itemValue:any) => setSelectedCategory(itemValue)}
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
                </ScrollView>
            </View>
        </View>
    )
}

export default Addstoreinfo

const styles = StyleSheet.create({
    container: {
        height: '100%',
        // backgroundColor: 'red',
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
        borderWidth: 1,
        borderColor: '#A0A0A0', // Gray border
        borderRadius: 8, // Rounded corners
        backgroundColor: '#FFF', // White background
      },
      pickerstyle: {
        height: 50,
        color: '#000', // Text color
      },
})