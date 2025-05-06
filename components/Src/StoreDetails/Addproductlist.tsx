import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import NavigationHeader from "@/app/commonComponts/NavigationHeader";
import { MARGIN, PADDING } from "@/constants/Colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCircleCheck,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { RadioButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import PrimaryBtn from "@/appComponent/button/PrimaryButton";

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
    { id: Date.now(), quantity: "", price: "", discount: "" },
  ]);
  const [productList, setProductList] = useState([
    {
      id: 1,
      productName: "India Gate Basmati Rice Dubar",
      weight: "1 kg",
      selected: false,
      quantity: "",
      price: "",
      discount: "",
    },
    {
      id: 2,
      productName: "Fortune Sunflower Oil",
      weight: "1 L",
      selected: true,
      quantity: "2",
      price: "130",
      discount: "5",
    },
    {
      id: 3,
      productName: "Aashirvaad Atta",
      weight: "5 kg",
      selected: false,
      quantity: "",
      price: "",
      discount: "",
    },
  ]);

  const toggleSelection = (index: number) => {
    const updatedList = [...productList];
    updatedList[index].selected = !updatedList[index].selected;
    setProductList(updatedList);
  };

  const handleChange = (index: number, field: string, value: string) => {
    const updatedList = [...productList];
    updatedList[index][field] = value;
    setProductList(updatedList);
  };
  // Function to add a new row
  const addField = () => {
    setFields([
      ...fields,
      { id: Date.now(), quantity: "", price: "", discount: "" },
    ]);
  };

  const removeField = (id: any) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  return (
    <View style={{ flex: 1 }}>
      <NavigationHeader name="Product List" />

      <View style={styles.container}>
        {/* Category Selection */}
        <ScrollView>
          <Text style={styles.title}>Category</Text>
          <View style={{marginBottom:90}}> 
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
                {selectedCategory === category.id ? (
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    size={18}
                    color="#26B24B"
                    style={{ marginRight: 5 }}
                  />
                ) : (
                  <RadioButton
                    value={category.id}
                    status={
                      selectedCategory === category.id ? "checked" : "unchecked"
                    }
                    onPress={() => setSelectedCategory(category.id)}
                  />
                )}

                <Text
                  style={{
                    ...styles.label,
                    fontWeight:
                      selectedCategory === category.id ? "bold" : "400",
                  }}
                >
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

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
          {productList.map((product, index) => (
            <View key={product.id} style={styles.productCard}>
              <View style={styles.productHeader}>
                <Text style={styles.productTitle}>{product.productName}</Text>
                <Text style={styles.productWeight}>{product.weight}</Text>
                <RadioButton
                  value={index.toString()}
                  status={product.selected ? "checked" : "unchecked"}
                  onPress={() => toggleSelection(index)}
                  color={product.selected ? "#26B24B" : undefined}
                />
              </View>

              {product && (
                <View style={styles.productContainer}>
                  <View style={styles.inputGroup}>
                    <Text style={styles.pickerLabel}>Quantity</Text>
                    <View style={styles.pickerWrapper}>
                      <Picker
                        selectedValue={product.quantity}
                        onValueChange={(itemValue) =>
                          handleChange(index, "quantity", itemValue)
                        }
                        mode="dropdown"
                      >
                        <Picker.Item label="Select Quantity" value="" />
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                      </Picker>
                    </View>
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.pickerLabel}>Price (₹)</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Price"
                      keyboardType="numeric"
                      value={product.price}
                      onChangeText={(text) =>
                        handleChange(index, "price", text)
                      }
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.pickerLabel}>Discount (%)</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Discount"
                      keyboardType="numeric"
                      value={product.discount}
                      onChangeText={(text) =>
                        handleChange(index, "discount", text)
                      }
                    />
                  </View>
                </View>
              )}
            </View>
          ))}
          </View>
          

          {/* <View style={{ ...styles.saveContainer }}>

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
                    </View> */}
        </ScrollView>
      </View>
      <View>
        {" "}
        <View style={styles.floatingButtonContainer}>
          <View style={{width:"100%" ,padding:10}}>
            <PrimaryBtn action={addField} btnTxt="Save" />
          </View>
          {/* <View style={{width:"100%" ,paddingHorizontal :5}}>
            <PrimaryBtn action={addField} btnTxt="Save" />
          </View> */}
        </View>
      </View>
    </View>
  );
};

export default AddProductList;

const styles = StyleSheet.create({
  container: {
    padding: PADDING.largePad,
    backgroundColor: "#F9F9F9",
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
    color: "#060606",
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
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
    flexDirection: "row",
    justifyContent: "flex-end",
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
    color: "#060606",
  },
  floatingButtonContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.2,
    width: '100%',
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
    color: "#CC2900",
    fontSize: 14,
    fontWeight: "500",
  },
  productCard: {
    padding: 5,
  },

  productHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  productTitle: {
    fontSize: 20,
    fontWeight: "400",
    flex: 1,
  },

  productWeight: {
    fontSize: 14,
    marginRight: 10,
  },

  productInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  productInput: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },

  addAnotherProductBtn: {
    backgroundColor: "#26B24B",
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    borderRadius: 30,
    marginBottom: 10,
  },

  addText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },

  saveBtn: {
    backgroundColor: "#fff",
    borderColor: "#26B24B",
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: 30,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: "center",
  },

  saveText: {
    color: "#26B24B",
    fontWeight: "600",
    fontSize: 16,
  },
});
