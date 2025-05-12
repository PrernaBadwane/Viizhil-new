import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import NavigationHeader from "@/app/commonComponts/NavigationHeader";
import { MARGIN, PADDING } from "@/constants/Colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCircleCheck,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { ActivityIndicator, RadioButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import PrimaryBtn from "@/appComponent/button/PrimaryButton";
import { ApiClient, apiService } from "../api/apiBaseUrl";
import { router, useLocalSearchParams } from "expo-router";
import { getProductsInfo } from "./../api/apiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addProduct, getAuthToken } from "../api/apiService";
import axios from "axios";
import SecondaryBtn from "@/appComponent/button/SecondaryBtn";
import ConfirmModal from "@/appComponent/modal/Modal";

// Categories list
interface TCategoryType {
  Id: string;
  TypeName: string;
}
interface TCategory {
  Id: string;
  TypeName: string;
}
interface TSubCategory {
  Id: string;
  TypeName: string;
}

const AddProductList = () => {
  const { id, mode } = useLocalSearchParams();
  const [CategoryType, setCategoryType] = useState<TCategoryType[]>([]);
  const [selectedCategoryType, setSelectedCategoryType] = useState<
    string | null
  >(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [Category, setCategory] = useState<TCategory[]>([]);
  const [SubCategory, setSubCategory] = useState<TSubCategory[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [fields, setFields] = useState([
    { id: Date.now(), quantity: "", price: "", discount: "" },
  ]);
  const [productList, setProductList] = useState<any[]>([]);

  const toggleSelection = (index: number) => {
    const updatedList = [...productList];

    updatedList[index].selected = !updatedList[index].selected;
    setProductList(updatedList);

    const product = updatedList[index];

    if (product.selected) {
      setSelectedProducts((prev) => {
        const updatedSelected = [...prev, product];
        console.log(updatedList.Id, "updatedList");
        return updatedSelected;
      });
    } else {
      setSelectedProducts((prev) => {
        const updatedSelected = prev.filter((item) => item.id !== product.id);
        // Log the selected product IDs
        console.log(
          "Selected Product IDs:",
          updatedSelected.map((item) => item)
        );
        return updatedSelected;
      });
    }
  };

  const handleChange = (index: number, field: string, value: string) => {
    const updatedList = [...productList];
    updatedList[index][field] = value;
    setProductList(updatedList);
  };
  // Function to add a new row
  // const addField = () => {
  //   setFields([
  //     ...fields,
  //     { id: Date.now(), quantity: "", price: "", discount: "" },
  //   ]);
  // };

  const removeField = (id: any) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  useEffect(() => {
    setSelectedProducts([]);
    CategoryTypeData();
    CategoryData();
    SubCategoryData();
  }, [selectedCategoryType, selectedCategory, selectedSubCategory]);

  useEffect(() => {
    setSelectedProducts([]);
    setProductList([]);
    setHasMore(true);
    setPage(1);
  }, [selectedCategoryType, selectedCategory]);

  const CategoryTypeData = async () => {
    try {
      setLoading(true);
      const response = await ApiClient.get("/sp_view_GroceryType");
      const dt = response.data.data;
      setCategoryType(
        dt.map((item: any) => ({
          Id: item.Id,
          TypeName: item.TypeName,
        }))
      );
    } catch (error) {
      console.error(error, "CategoryTypeData");
    } finally {
      setLoading(false);
    }
  };

  const CategoryData = async () => {
    console.log(selectedCategoryType, "selectedCategoryType");
    try {
      const response = await ApiClient.get(
        `/sp_View_GroceryCategory?GroceryTypeId=${selectedCategoryType}`
      );
      const dt = response.data.data;
      setCategory(
        dt.map((item: any) => ({
          Id: item.Id,
          TypeName: item.CategoryName,
        }))
      );
    } catch (error) {
      console.error(error, "CategoryData");
    } finally {
      setLoading(false);
    }
  };
  const SubCategoryData = async () => {
    console.log(selectedCategory, "selectedsubCategoryType");
    try {
      setLoading(true);
      const response = await ApiClient.get(
        `/sp_View_GrocerySubCategory?GroceryCategoryId=${selectedCategory}`
      );
      const dt = response.data.data;
      setSubCategory(
        dt.map((item: any) => ({
          Id: item.Id,
          TypeName: item.SubCategoryName,
        }))
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // const ProductsData = async () => {
  //   console.log(selectedSubCategory, "selectedSubCategory");
  //   if (loading || !hasMore) return;

  //   try {
  //     setLoading(true);
  //     const response = await ApiClient.get(
  //       `/sp_View_Groceries?Limit=10&Offset=1&GroceryTypeId=${selectedCategoryType}&CategoryId=${selectedCategory}&SubCategoryId=${selectedSubCategory} `
  //     );
  //     // const response2 = getProductsInfo(selectedCategoryType,selectedCategory,selectedSubCategory);
  //     // console.log(response2, "response2");

  //     const allProducts = response.data.data;
  //   const sellingProducts = response2.data.data;

  //   if (allProducts.length < 10) {
  //     setHasMore(false); // No more products
  //   }

  //   // Create a lookup for quick access
  //   const sellingMap = new Map(
  //     sellingProducts.map((item: any) => [item.Id, item])
  //   );
  //   const formatted = allProducts.map((item: any) => {
  //     const matched = sellingMap.get(item.Id);

  //     return {
  //       id: item.Id,
  //       productName: item.ProductName,
  //       weight: item.Weight,
  //       unitName: item.UnitName,
  //       selected: !!matched,
  //       quantity: matched?.Quantity || "",
  //       price: matched?.Price || "",
  //       discount: matched?.Discount || "",
  //     };
  //   });
  //     setProductList((prev) => [...prev, ...formatted]);
  //     setPage((prev) => prev + 1);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleScroll = ({ nativeEvent }: { nativeEvent: any }) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const isNearBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 100;

    console.log(isNearBottom, loading, "hasMore");
    if (isNearBottom && hasMore && !loading && selectedSubCategory && selectedCategory && selectedCategoryType) {
      ProductsData();
    }
  };

// const [alreadyAddedProducts, setAlreadyAddedProducts] = useState<any[]>([]);
//   useEffect(() => {
//     const fetchAlreadyAddedProducts = async () => {
//       try {
        
//         console.log(response);
//         // setAlreadyAddedProducts(dt);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchAlreadyAddedProducts();
//   }, []);


  const ProductsData = async () => {
    console.log(selectedSubCategory, "selectedSubCategory");
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const response = await ApiClient.get(
        `/sp_View_Groceries?Limit=10&Offset=${page}&GroceryTypeId=${selectedCategoryType}&CategoryId=${selectedCategory}&SubCategoryId=${selectedSubCategory}`
      );

      const ShopId=await AsyncStorage.getItem("ShopId");
      const accessTokenWithString = await AsyncStorage.getItem("accessToken");
      const accessToken = accessTokenWithString!.replace(/^"|"$/g, "");
      const response2 = await axios.get(
      `https://3r6ep1pr29.execute-api.ap-southeast-1.amazonaws.com/default/sp_View_ShopItem?Limit=10&Offset=${page}&ShopId=${ShopId}&SubCategoryId=${selectedSubCategory}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
      const dt = response.data.data;
       const shopItems = response2.data.data;
      if (dt.length < 10) {
        setHasMore(false); // No more products
      }
      console.log(response.data.data[0].Id, response2.data.data[0].ProductId, "dt");
// console.log(response2, "matchedItem");
      const formatted = dt.map((item: any) => {
      const matchedItem = shopItems.find((sItem: any) => Number(sItem.ProductId) === Number(item.Id));
console.log(matchedItem, "matchedItem");
      return {
        id: item.Id,
        productName: item.ProductName,
        weight: item.Weight,
        unitName: item.UnitName,
        selected: matchedItem && matchedItem.Status ? true : false,
        quantity: matchedItem?.Quantity || "",
        price: matchedItem?.SalesPrice || "",
        discount: matchedItem?.ShopOfferPercentage || "",
      };
    });
  // r
  //       id: item.Id,
  //       productName: item.ProductName,
  //       weight: item.Weight,
  //       unitName: item.UnitName,
  //       selected: false,
  //       quantity: "",
  //       price: "",
  //       discount: "",
  //     }));

    setProductList((prev) => [...prev, ...formatted]);
    setPage((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCategoryType && selectedCategory && selectedSubCategory) {
      ProductsData();
    }
  }, [selectedCategory, selectedCategoryType, selectedSubCategory]);

  useEffect(() => {
    setSelectedCategory(null);
    setSelectedSubCategory(null);
  }, [selectedCategoryType]);

  useEffect(() => {
    setSelectedSubCategory(null);
  }, [selectedCategory]);

  

  const handleSubmit = async () => {
    setIsModalOpen(false);
    setLoading(true);
    try {
      const currentShopId = id as string;
      const userId = await AsyncStorage.getItem("userId");
      console.log(userId, "userId");
      console.log(currentShopId, "currentShopId");

      if (!currentShopId) {
        console.error("Shop ID is missing.");
        setLoading(false);
        return;
      }

      if (selectedProducts.length === 0) {
        alert("Please select at least one product to submit.");
        setLoading(false);
        return;
      }

      const accessToken = await getAuthToken();

      for (const product of selectedProducts) {
        const payload = {
          productId: Number(product?.id ?? 0),
          quantity: Number(product?.quantity ?? 0),
          shopId: Number(currentShopId),
          status: Boolean(product?.selected ?? false), 
          price: Number(product?.SalesPrice ?? 0),
          offerPercentage: Number(product?.ShopOfferPercentage) ?? null,
          modifiedBy: Number(userId),
        };

        console.log("Final payload to submit:", payload);

        try {
          const response = await axios.post(
            "https://api.vizhil.com/api/shopitem/add",
            payload,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );

          console.log(response?.data);

          console.log("Response:", response.data);
        } catch (error) {
          console.error("Error submitting product:", product?.id, error);
        }
      }
      alert("All selected products submitted successfully!");
    } catch (err: any) {
      if (err.response) {
        console.error("Server Error:", err.response.data);
        alert(
          `Error ${err.response.status}: ${JSON.stringify(err.response.data)}`
        );
      } else if (err.request) {
        console.error("Network Error:", err.request);
        alert("Network error: No response from server.");
      } else {
        console.error("Error:", err.message);
        alert(`Unexpected error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddAnotherSubmit = async () => {
    setLoading(true);
    if (selectedProducts.length === 0) {
      setSelectedCategory(null);
      setSelectedSubCategory(null);
      setProductList([]);
      setSelectedSubCategory(null);
    }
    handleSubmit();
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setProductList([]);
    setSelectedSubCategory(null);
  };
const handleAddSubmit = async () => {
    setLoading(true);
    handleSubmit
    router.push({
      pathname: "/grocery",
      params: { id: id,}
})
  };
  return (
    <View style={{ flex: 1 }}>
      <NavigationHeader name="Product List" />
      {/* <ScrollView> */}
      <View style={styles.container}>
        {/* Category Selection */}

        <Text style={styles.title}>Category</Text>
        <View style={{ marginBottom: 150 }}>
          <View style={styles.gridContainer}>
            {CategoryType.map((category) => (
              <TouchableOpacity
                key={category.Id}
                style={[
                  styles.radioContainer,
                  selectedCategoryType === category.Id && styles.selectedButton,
                ]}
                onPress={() => setSelectedCategoryType(category.Id)}
              >
                {selectedCategoryType === category.Id ? (
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    size={18}
                    color="#26B24B"
                    style={{ marginRight: 5 }}
                  />
                ) : (
                  <RadioButton
                    value={category.Id}
                    status={
                      selectedCategoryType === category.Id
                        ? "checked"
                        : "unchecked"
                    }
                    onPress={() => setSelectedCategoryType(category.Id)}
                  />
                )}

                <Text
                  style={{
                    ...styles.label,
                    fontWeight:
                      selectedCategoryType === category.Id ? "bold" : "400",
                  }}
                >
                  {category.TypeName}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ marginTop: MARGIN.largeMar }}>
            <Text style={styles.pickerlabel}>Sub Category</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                // style={styles.picker}
                mode="dropdown" // Ensures it looks like a dropdown
              >
                <Picker.Item label="Select a category" value={null} />
                {Category.map((cat) => (
                  <Picker.Item
                    key={cat.Id}
                    label={cat.TypeName}
                    value={cat.Id}
                  />
                ))}
              </Picker>
            </View>
          </View>
          <View style={{ marginTop: MARGIN.largeMar }}>
            <Text style={styles.pickerlabel}>Child Category</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedSubCategory}
                onValueChange={(itemValue) => setSelectedSubCategory(itemValue)}
                // style={styles.picker}
                mode="dropdown" // Ensures it looks like a dropdown
              >
                <Picker.Item label="Select a sub category" value={null} />
                {SubCategory.map((cat) => (
                  <Picker.Item
                    key={cat.Id}
                    label={cat.TypeName}
                    value={cat.Id}
                  />
                ))}
              </Picker>
            </View>
          </View>

          {/* ScrollView for Dynamic Fields */}
          <ScrollView onScroll={handleScroll} scrollEventThrottle={400}>
            {productList.map((product, index) => (
              <View key={product.id} style={styles.productCard}>
                <View style={styles.productHeader}>
                  <Text style={styles.productTitle}>{product.productName}</Text>
                  <Text style={styles.productWeight}>
                    {product.weight} {product.unitName}
                  </Text>
                  <RadioButton
                    value={index.toString()}
                    status={product.selected ? "checked" : "unchecked"}
                    onPress={() => toggleSelection(index)}
                    color={product.selected ? "#26B24B" : undefined}
                  />
                </View>

                <View style={styles.productContainer}>
                  <View style={styles.inputGroup}>
                    <Text style={styles.pickerLabel}>Quantity</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="quantity"
                      keyboardType="numeric"
                      value={product.quantity}
                      onChangeText={(text) =>
                        handleChange(index, "quantity", text)
                      }
                    />
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
                      value={product.ShopOfferPercentage}
                      onChangeText={(text) =>
                        handleChange(index, "discount", text)
                      }
                    />
                  </View>
                </View>
              </View>
            ))}

            {loading && <ActivityIndicator style={{ marginVertical: 20 }} />}
          </ScrollView>
        </View>
      </View>
      {/* </ScrollView> */}
      <View>
        {" "}
        <View style={styles.floatingButtonContainer}>
          <View style={{ width: "100%", padding: 10 }}>
            <SecondaryBtn
              action={handleAddAnotherSubmit}
              btnTxt="Add Another Product"
            />
          </View>
          <View style={{ width: "100%", padding: 10, marginBottom: 10 }}>
            <PrimaryBtn action={() => setIsModalOpen(true)} btnTxt="Save" />
          </View>
          {/* <View style={{width:"100%" ,paddingHorizontal :5}}>
            <PrimaryBtn action={addField} btnTxt="Save" />
          </View> */}
        </View>
      </View>

      <ConfirmModal
        isVisible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm2={handleAddSubmit}
        onConfirm1={handleAddAnotherSubmit}
        title="Save And Add The Next Product"
        option2={"Save"}
        option1={"Save And Add another Product"}
        btnColor={"#26B24B"}
      />
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
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.2,
    width: "100%",
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
