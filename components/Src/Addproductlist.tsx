import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import NavigationHeader from '@/app/commonComponts/NavigationHeader';
import { MARGIN, PADDING } from '@/constants/Colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleCheck, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { RadioButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import PrimaryBtn from '@/appComponent/button/PrimaryButton';

// Categories list
const categories = [
    { id: "grocery", label: "Grocery" },
    { id: "vegetable", label: "Vegetable & Fruits" },
    { id: "fish", label: "Fish & meats" },
    { id: "household", label: "Household" },
];

const AddProductList = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedValue, setSelectedValue] = useState("");
    const [fields, setFields] = useState([
        { id: Date.now(), quantity: "", price: "", discount: "" }
    ]);

    // Function to add a new row
    const addField = () => {
        setFields([...fields, { id: Date.now(), quantity: "", price: "", discount: "" }]);
    };

    const removeField = (id: any) => {
        setFields(fields.filter((field) => field.id !== id));
    };

    return (
        <View style={{ flex: 1 }}>
            <NavigationHeader name="Product List" />
            <View style={styles.container}>
                {/* Category Selection */}
                <Text style={styles.title}>Category</Text>
                <View style={styles.gridContainer}>
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            style={[
                                styles.radioContainer,
                                selectedCategory === category.id && styles.selectedButton,
                            ]}
                            onPress={() => setSelectedCategory(category.id)}
                        >
                            {selectedCategory === category.id ?
                                <FontAwesomeIcon icon={faCircleCheck} size={18} color='#26B24B' style={{ marginRight: 5 }} />
                                :
                                <RadioButton

                                    value={category.id}
                                    status={selectedCategory === category.id ? "checked" : "unchecked"}
                                    onPress={() => setSelectedCategory(category.id)}
                                />
                            }

                            <Text style={{ ...styles.label, fontWeight: selectedCategory === category.id ? "bold" : "400" }}>{category.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <ScrollView >
                    <View style={{ marginTop: MARGIN.largeMar }}>
                        <Text style={styles.pickerlabel}>Sub Category</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={selectedValue}
                                onValueChange={(itemValue) => setSelectedValue(itemValue)}
                                // style={styles.picker}
                                mode="dropdown" // Ensures it looks like a dropdown
                            >
                                <Picker.Item label="Rice" value="rice" />
                                <Picker.Item label="Wheat" value="wheat" />
                                <Picker.Item label="Pulses" value="pulses" />
                            </Picker>
                        </View>
                    </View>
                    <View style={{ marginTop: MARGIN.largeMar }}>
                        <Text style={styles.pickerlabel}>Child Category</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={selectedValue}
                                onValueChange={(itemValue) => setSelectedValue(itemValue)}
                                // style={styles.picker}
                                mode="dropdown" // Ensures it looks like a dropdown
                            >
                                <Picker.Item label="Rice" value="rice" />
                                <Picker.Item label="Wheat" value="wheat" />
                                <Picker.Item label="Pulses" value="pulses" />
                            </Picker>
                        </View>
                    </View>

                    {/* ScrollView for Dynamic Fields */}

                    {fields.map((field, index) => (
                        <View key={field.id} style={styles.productContainer}>
                            {/* Quantity Picker */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.pickerLabel}>Quantity</Text>
                                <View style={styles.pickerWrapper}>
                                    <Picker
                                        selectedValue={field.quantity}
                                        onValueChange={(itemValue) => {
                                            const newFields = [...fields];
                                            newFields[index].quantity = itemValue;
                                            setFields(newFields);
                                        }}
                                        mode="dropdown"
                                    >
                                        <Picker.Item label="Select Quantity" value="" />
                                        <Picker.Item label="1" value="1" />
                                        <Picker.Item label="2" value="2" />
                                        <Picker.Item label="3" value="3" />
                                    </Picker>
                                </View>
                            </View>

                            {/* Price Input */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.pickerLabel}>Price (₹)</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Price"
                                    keyboardType="numeric"
                                    value={field.price}
                                    onChangeText={(text) => {
                                        const newFields = [...fields];
                                        newFields[index].price = text;
                                        setFields(newFields);
                                    }}
                                />
                            </View>

                            {/* Discount Input */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.pickerLabel}>Discount (%)</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Discount"
                                    keyboardType="numeric"
                                    value={field.discount}
                                    onChangeText={(text) => {
                                        const newFields = [...fields];
                                        newFields[index].discount = text;
                                        setFields(newFields);
                                    }}
                                />
                            </View>
                        </View>
                    ))}
                    <View style={{ ...styles.saveContainer }}>

                        <View style={styles.addContainer}>
                            <TouchableOpacity style={styles.addButton} onPress={addField}>
                                <FontAwesomeIcon icon={faPlus} size={16} color="#fff" style={styles.icon} />
                                <Text style={styles.addButtonText}>Add Quantity</Text>
                            </TouchableOpacity>
                        </View>
                        {fields.length > 1 && (
                            <View style={styles.addContainer}>
                                <TouchableOpacity
                                    style={styles.remove}
                                    onPress={() => removeField(fields[fields.length - 1].id)}
                                >
                                    <Text style={styles.removed}>Remove</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                </ScrollView>
            </View>
            <View style={styles.floatingButtonContainer}>
                <TouchableOpacity style={styles.floatingButton} onPress={addField}>
                    <FontAwesomeIcon icon={faPlus} size={24} color="green" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AddProductList;

const styles = StyleSheet.create({
    container: {
        padding: PADDING.largePad,
        backgroundColor: '#F9F9F9',
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 10,
    },
    gridContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        alignItems: "center",
    },
    radioContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: PADDING.miniPad,
        backgroundColor: "#fff",
        borderRadius: 10,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        height: 40,
        minWidth: 120,
        justifyContent: "center",
    },
    selectedButton: {
        borderColor: "#26B24B",
        borderWidth: 1.5,
    },
    label: {
        fontSize: 16,
        fontWeight: "300",
        color: '#060606',
    },
    productContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: MARGIN.largeMar,
        paddingVertical: 5,
        marginTop: 10,

    },
    inputGroup: {
        flex: 1,
        marginHorizontal: 5,
    },
    pickerLabel: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 5,
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: "#A0A0A0",
        borderRadius: 5,
        backgroundColor: "#fff",
        height: 45,
        justifyContent: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#A0A0A0",
        borderRadius: 5,
        padding: 10,
        height: 45,
        backgroundColor: "#fff",
    },
    addContainer: {
        marginRight: 10,

        // marginTop: MARGIN.largeMar,
    },
    addButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#2E6E4C",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    addButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "500",
    },
    icon: {
        marginRight: 5,
    },
    removeButton: {
        marginLeft: 10,
        padding: 10,
    },
    saveContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    pickerContainer: {
        height: 50,
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#8E8E8E",
        borderRadius: 8,
        overflow: "hidden",
        backgroundColor: "#fff",
    },
    pickerlabel: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 5,
        color: '#060606',
    },
    floatingButtonContainer: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: "#fff",
        borderRadius: 30,
        width: 55,
        height: 55,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5, // Shadow for Android
        shadowColor: "#000", // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    floatingButton: {
        justifyContent: "center",
        alignItems: "center",
    },
    remove: {
        borderWidth: 1,
        borderColor: "#CC2900",
        flexDirection: "row",
        alignItems: "center",
        // backgroundColor: "#2E6E4C",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    removed: {
        color: '#CC2900',
        fontSize: 14,
        fontWeight: "500",
    }
});
