import {
  BackHandler,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import NavigationHeader from "@/app/commonComponts/NavigationHeader";
import { PADDING } from "@/constants/Colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight, faStore } from "@fortawesome/free-solid-svg-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { ApiClient } from "./api/apiBaseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StoreDetailspage = () => {
  const { id, mode } = useLocalSearchParams();
  const [ShopName, setShopName] = React.useState("Vizhil Grocery Store");
  const [Logo, setLogo] = React.useState("logo.png");
  const getShopDetails = async () => {
    try {
      const shopId = Number(id);
      const userId = await AsyncStorage.getItem("userId");

      // const userId = 4665;
      const response = await ApiClient.get(
        `/sp_View_GroceryShop?id=${shopId}`,
        {
          params: { UserId: `${userId}` },
        }
      );

      const data = response?.data?.data;
      if (Array.isArray(data)) {
        const shop = data.find((item) => item.Id === shopId);
        //
        if (shop) {
          setShopName(shop.ShopName);
          setLogo(shop.Logo);
        }
      }
    } catch (error) {
      console.error("Error fetching GST verification status:", error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        router.replace({
          pathname: '/shopinfo',
          params: {
            mode: 'Mobile Number',
            id: `${id}`,
          },
        });
        return true; // Prevent default back action
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [id]) // Dependency on 'id'
  );

  useEffect(() => {
    getShopDetails();
  }, []);
  return (
    <SafeAreaView>
      <NavigationHeader name="Store Details" />
      <View style={{ ...styles.container }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{
              uri: `https://cnt.vizhil.com/images/grocery/shop/logo/${Logo}`,
            }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#2B2827",
              marginLeft: 10,
            }}
          >
            {ShopName}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            router.push({
              pathname: `/storeinfo`,
              params: {
                mode: "Mobile Number",
                id: `${id}`,
              },
            });
          }}
        >
          <View>
            <Image
              source={require("../../assets/images/storedetails.png")}
              style={{ width: 30, height: 30 }}
            />
          </View>
          <Text style={styles.text}>Store Info</Text>
          <View style={styles.chevronContainer}>
            <FontAwesomeIcon icon={faChevronRight} size={14} color="#000" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            router.push({
              pathname: `/upload`,
              params: {
                mode: "Mobile Number",
                id: `${id}`,
              },
            });
          }}
        >
          <View>
            <Image
              source={require("../../assets/images/documentupload.png")}
              style={{ width: 30, height: 30 }}
            />
          </View>
          <Text style={styles.text}>Document upload</Text>
          <View style={styles.chevronContainer}>
            <FontAwesomeIcon icon={faChevronRight} size={14} color="#000" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            router.push({
              pathname: `/address`,
              params: {
                mode: "Mobile Number",
                id: `${id}`,
              },
            });
          }}
        >
          <View>
            <Image
              source={require("../../assets/images/address.png")}
              style={{ width: 30, height: 30 }}
            />
          </View>
          <Text style={styles.text}>Address</Text>
          <View style={styles.chevronContainer}>
            <FontAwesomeIcon icon={faChevronRight} size={14} color="#000" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/product")}
        >
          <View>
            <Image
              source={require("../../assets/images/productlist.png")}
              style={{ width: 30, height: 30 }}
            />
          </View>
          <Text style={styles.text}>Product list</Text>
          <View style={styles.chevronContainer}>
            <FontAwesomeIcon icon={faChevronRight} size={14} color="#000" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default StoreDetailspage;

const styles = StyleSheet.create({
  container: {
    height: "90%",
    backgroundColor: "#F9F9F9",
    padding: PADDING.largePad,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF", // White background
    padding: 15,
    borderRadius: 12, // Rounded corners
    shadowColor: "#000", // Subtle shadow for elevation effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android shadow
    marginVertical: 10,
  },
  text: {
    flex: 1, // Take available space between icons
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10, // Space from icon
    color: "#000", // Black text
  },
  chevronContainer: {
    padding: 5, // Small padding for better touch feedback
  },
});
