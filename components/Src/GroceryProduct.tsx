import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import TabHeader from "@/app/commonComponts/TabHeader";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faChevronRight,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { CommonStyles, MARGIN, PADDING } from "@/constants/Colors";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "react-native-svg";
import { router, useLocalSearchParams } from "expo-router";

const GroceryProduct = () => {
  const [selectedTab, setSelectedTab] = useState("All");
  const [allProducts, setAllProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const ShopId=await AsyncStorage.getItem("ShopId");
      const accessTokenWithString = await AsyncStorage.getItem("accessToken");
      const accessToken = accessTokenWithString!.replace(/^"|"$/g, "");
      const response = axios.get(
        `https://3r6ep1pr29.execute-api.ap-southeast-1.amazonaws.com/default/sp_View_ShopItem?Limit=10&Offset=1&ShopId=${ShopId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      response.then((res) => {
        setAllProducts(res?.data.data);
      });
    };
    fetchProducts();
  }, []);

  const data = [
    {
      name: "Alaskan Salmon",
      weight: "500 Kg - 1 KG",
      price: 300,
      originalPrice: 450,
      offer: "34 % Offers",
      totalKg: "6 Kgs",
    },
    {
      name: "Cod",
      weight: "500 Kg - 1 KG",
      price: 350,
      originalPrice: 180,
      offer: "20% Offers",
      totalKg: "10 Kgs",
    },
    {
      name: "Herring",
      weight: "500 Kg - 1 KG",
      price: 137,
      originalPrice: 180,
      offer: "10% Offers",
      totalKg: "5 Kgs",
    },
    {
      name: "Perch",
      weight: "500 Kg - 1 KG",
      price: 137,
      originalPrice: 180,
      offer: "20% Offers",
      totalKg: "7 Kgs",
    },
  ];
  console.log(allProducts, "allProducts");
  const ProductCard = ({ item }) => (
    <View style={styles.productCard}>
      <View style={styles.headerRow}>
        <Text style={styles.productTitle}>{item.ProductName}</Text>
        <View style={styles.kgBadge}>
          <Text style={styles.kgText}>Total KGs - {item.totalKg}</Text>
        </View>
      </View>
      <Text style={styles.weight}>{item.Weight} {item.UnitName}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.price}>₹{item.SalesPrice}</Text>
        <Text style={styles.originalPrice}>₹{item.MRP}</Text>
        <Text style={styles.offer}>{item.ShopOfferPercentage}%</Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <TabHeader />
      <View style={styles.container}>
        {/* Search Bar */}
        <View style={{}}>
          {" "}
          {/* This must allow FlatList to grow */}
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Search for add-on"
              placeholderTextColor="#8E8E8E"
              style={styles.input}
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size={20}
              color="#26B24B"
              style={styles.icon}
            />
          </View>
        </View>
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
          >
            <View style={[styles.tabWrapper]}>
              <View style={styles.Tabcontainer}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    selectedTab === "All" && styles.selectedButton,
                  ]}
                  onPress={() => setSelectedTab("All")}
                >
                  <Text
                    style={[
                      styles.text,
                      selectedTab === "All" && styles.selectedText,
                    ]}
                  >
                    All
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.Tabcontainer}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    selectedTab === "Groceries" && styles.selectedButton,
                  ]}
                  onPress={() => setSelectedTab("Groceries")}
                >
                  <Text
                    style={[
                      styles.text,
                      selectedTab === "Groceries" && styles.selectedText,
                    ]}
                  >
                    Groceries
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.Tabcontainer}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    selectedTab === "Vegetable & Fruits" &&
                      styles.selectedButton,
                  ]}
                  onPress={() => setSelectedTab("Vegetable & Fruits")}
                >
                  <Text
                    style={[
                      styles.text,
                      selectedTab === "Vegetable & Fruits" &&
                        styles.selectedText,
                    ]}
                  >
                    Vegetable & Fruits
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.Tabcontainer}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    selectedTab === "Fish & Meat" && styles.selectedButton,
                  ]}
                  onPress={() => setSelectedTab("Fish & Meat")}
                >
                  <Text
                    style={[
                      styles.text,
                      selectedTab === "Fish & Meat" && styles.selectedText,
                    ]}
                  >
                    Fish & Meat
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.Tabcontainer}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    selectedTab === "Household Items" && styles.selectedButton,
                  ]}
                  onPress={() => setSelectedTab("Household Items")}
                >
                  <Text
                    style={[
                      styles.text,
                      selectedTab === "Household Items" && styles.selectedText,
                    ]}
                  >
                    Household Items
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={{ ...styles.textcontainer }}>
          <ScrollView>
            {/* <TouchableOpacity style={styles.card}>
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>Grocery</Text>
                                <Text style={styles.subtitle}>Number of Sub category - 12</Text>
                            </View>
                         <FontAwesomeIcon icon={faChevronRight} size={20} color='#2B2827' />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.card}>
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>Vegetable & fruits</Text>
                                <Text style={styles.subtitle}>Number of Sub category - 2</Text>
                            </View>
                         <FontAwesomeIcon icon={faChevronRight} size={20} color='#2B2827' />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.card}>
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>Fish & Meat</Text>
                                <Text style={styles.subtitle}>Number of Sub category - 3</Text>
                            </View>
                         <FontAwesomeIcon icon={faChevronRight} size={20} color='#2B2827' />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.card}>
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>Household Items</Text>
                                <Text style={styles.subtitle}>Number of Sub category - 6</Text>
                            </View>
                         <FontAwesomeIcon icon={faChevronRight} size={20} color='#2B2827' />
                        </TouchableOpacity> */}

            <FlatList
              data={allProducts}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => <ProductCard item={item} />}
              contentContainerStyle={styles.cardContainer}
            />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#F9F9F9",
    padding: PADDING.largePad,
    height: "100%",
  },
  cardContainer: {
    // flex: 1,
    paddingBottom : 80,
    height: "100%",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    height: 50,
    justifyContent: "space-between",
    marginVertical: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },
  icon: {
    marginLeft: 10,
  },
  scrollViewContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  tabWrapper: {
    flexDirection: "row",
    height: "13%",
    alignItems: "center",
    borderRadius: 20,
    maxHeight: 100,
  },
  Tabcontainer: {
    marginRight: 10,
  },
  button: {
    height: 40,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#939393",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  selectedButton: {
    borderColor: "#376E46",
    backgroundColor: "#376E46",
  },
  text: {
    color: "#939393",
    fontWeight: "bold",
  },
  selectedText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  textcontainer: {
    flex: 1,
    marginTop: MARGIN.largeMar,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: MARGIN.miniMar,
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
    width: "65%",
  },
  kgBadge: {
    backgroundColor: "#D1FAE5",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  kgText: {
    color: "#047857",
    fontSize: 12,
    fontWeight: "500",
  },
  weight: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    textDecorationLine: "line-through",
    color: "#999",
    marginRight: 8,
  },
  offer: {
    fontSize: 14,
    color: "#EF4444",
    fontWeight: "600",
  },
});

export default GroceryProduct;
