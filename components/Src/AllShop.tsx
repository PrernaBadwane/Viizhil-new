import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBell,
  faChevronLeft,
  faChevronRight,
  faMapMarkerAlt,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { CommonStyles, PADDING } from "@/constants/Colors";
import { router, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiClient } from "@/components/Src/api/apiBaseUrl";

const AllShop = () => {
  const [shopAllData, setShopAllData] = useState<any[]>([]);
  console.log(shopAllData);
  const [userId, setUserId] = useState(0 || null);
  const [shopId, setShopId] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchAllShopData = async () => {
    setLoading(true);
    try {
      const UserId = await AsyncStorage.getItem("userId");
      if (UserId !== null) {
        const response = await ApiClient.get("/sp_View_GroceryShop?", {
          params: { UserId: `${UserId}` },
        });

        if (response.status === 200 && response.data?.data) {
          setShopAllData(response?.data?.data);
        }
      } else {
        console.log("No user data found");
        setUserId(null);
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data", error);
      setUserId(null);
      return null;
    } finally{
        setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchAllShopData();
    }, [])
    
  );

  const Item = ({ item }: any) => {
    return (
      <View style={[styles.card]}>
        <TouchableOpacity
          onPress={async () => {
    router.push({
      pathname: `/shopinfo`,
      params: {
        mode: "Mobile Number",
        id: `${item.Id}`,
      },
    });
    await AsyncStorage.setItem('ShopId', `${item.Id}`);
  }}
        >
          <View style={styles.row}>
            <View style={styles.profileCircle}>
              <Image
                source={{
                  uri: `https://cnt.vizhil.com/images/grocery/shop/logo/${item.Logo}`,
                }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
            </View>
            <View style={styles.details}>
              <Text style={styles.businessName}>{item.ShopName}</Text>
              <Text style={styles.address}>{item.Description}</Text>
              <View style={styles.row}>
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  size={16}
                  color="green"
                />
                <Text style={styles.infoText}> {item.AreaName}</Text>
              </View>
              <View style={styles.row}>
                <FontAwesomeIcon icon={faPhone} size={16} color="green" />
                <Text style={styles.infoText}> {item.PhoneNumber}</Text>
              </View>
            </View>
          </View>
          <View style={styles.separator} />
          <Text style={styles.email}>{item.EmailId}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.headercontainer}>
        <View style={styles.subheadercontainer}>
          <View style={styles.circle}>
            <Image
              source={require("../../assets/images/Grocerylogo.png")}
              style={{ width: 25, height: 25 }}
            />
          </View>
          <Text style={styles.text}>All Shop</Text>
        </View>

        {/* Points Section After */}
        <View style={styles.pointscontainer}>
          <View style={styles.points}>
            <Image
              source={require("../../assets/images/points.png")}
              style={styles.pointsIcon}
            />
            <Text style={styles.pointsText}>20 Points</Text>
            <FontAwesomeIcon icon={faChevronRight} size={17} color="#FFF" />
          </View>
        </View>
        {/* Notification Icon First */}
        <View style={styles.Notification}>
          <Image
            source={require("../../assets/images/Notification.png")}
            style={{ width: 25, height: 25 }}
          />
        </View>
      </View>
      <View style={{ ...styles.Add }}>
        <View style={{ ...CommonStyles.Addbutton }}>
          <TouchableOpacity onPress={() => router.push("/storeinfo")}>
            <Text style={{ color: "#fff" }}>Add</Text>
          </TouchableOpacity>
        </View>
        {loading ? (
        //   <LoaderKit
        //     style={{ width: 50, height: 50 }}
        //     name={"BallDoubleBounce"} // Optional: see list of animations below
        //     color={"green"} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
        //   />
        <Text>Loading...</Text>
        ) : (
          <ScrollView style={{ flex: 1 }}>
            <FlatList
              // scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              data={shopAllData}
              
              renderItem={({ item }) => <Item item={item} />}
              keyExtractor={(item, index) =>
                item.Id?.toString() || index.toString()
              }
            />
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default AllShop;

const styles = StyleSheet.create({
  headercontainer: {
    backgroundColor: "#FFFFFF",
    height: "40%",
    maxHeight: 120,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 30,
  },
  subheadercontainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#EAEAEA",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2B2827",
  },
  pointscontainer: {
    alignItems: "center",
    marginLeft: 30,
  },
  points: {
    left: 10,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "#F24E1E",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
    borderColor: "#F24E1E",
    paddingHorizontal: PADDING.horizontal_med,
  },
  pointsIcon: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  pointsText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    marginRight: 8,
  },
  Notification: {
    justifyContent: "flex-end",
  },
  Add: {
    padding: PADDING.smlPad,
    backgroundColor: "#F9F9F9",
    height: "100%",
  },
  Addbutton: {
    backgroundColor: "#376E46",
    justifyContent: "center",
    padding: 10,
    width: 60,
    height: 50,
    alignItems: "center",
    margin: 10,
    alignSelf: "flex-end",
    borderRadius: 12,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  profileCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#D9D9D9",
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  businessName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  address: {
    fontSize: 14,
    color: "#777",
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    color: "#555",
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 8,
  },
  email: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
  },
});
