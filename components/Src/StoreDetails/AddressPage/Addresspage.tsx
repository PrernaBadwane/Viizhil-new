import { StyleSheet, Text, TextInput, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import NavigationHeader from "@/app/commonComponts/NavigationHeader";
import { MARGIN, PADDING } from "@/constants/Colors";
import AddressForm from "./AddressForm";
import { ApiClient } from "../../api/apiBaseUrl";
import { addAddress, updateShopDetails, updateShopDetailsForAddress, updateShopDetailsforAddress } from "../../api/apiService";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddressPage = () => {
  const [loading, setLoading] = useState(false);
  const { id, mode } = useLocalSearchParams();
  const [expandedForm, setExpandedForm] = useState<string | null>(null);
  const [userid, setUserId] = useState<number>(0);

  const getShopDetails = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const shopId = id;
      // const shopId =Number(id);
      // const userId = 4665;
      setUserId(Number(userId));
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
        }
      }
    } catch (error) {
      console.error("Error fetching GST verification status:", error);
    }
  };

  useEffect(() => {
    getShopDetails();
  }, []);

  useEffect(() => {
    if (userid && id) {
      setBillingAddress((prev) => ({
        ...prev,
        refId: userid,
        modifier: userid,
        // restaurantId: id,
      }));
      setPickupAddress((prev) => ({
        ...prev,
        refId: userid,
        modifier: userid,
        // restaurantId: id,
      }));
    }
  }, [userid, id]);

  const [billingAddress, setBillingAddress] = useState({
    contactPerson: "",
    addressName: "",
    doorNo: "",
    pickupAddress: "",
    countryName: "",
    stateName: "",
    cityName: "",
    postalcode: "",
    latitude: "",
    longitude: "",
    refId: userid,
    modifier: userid,
    addrstype: "billing",
    isDefault: false,
    restaurantId: id,
    areaId: 0,
    subAreaId: 0,
    contactNo: "",
  });
  const [pickupAddress, setPickupAddress] = useState({
    contactPerson: "",
    addressName: "",
    doorNo: "",
    pickupAddress: "",
    countryName: "",
    stateName: "",
    cityName: "",
    postalcode: "",
    latitude: "",
    longitude: "",
    refId: userid,
    modifier: userid,
    addrstype: "pickup",
    isDefault: false,
    restaurantId: id,
    areaId: 0,
    subAreaId: 0,
    contactNo: "",
  });

  // countryList, stateList, etc. same as before...

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const response = await addAddress(values);
      const newAddressId = response?.id;

      const shopData = {
        Id: id,
        UserId: userid,
        ModifiedBy: userid,
        ...(expandedForm === "billing"
          ? { BillingAddressId: newAddressId }
          : { PickupAddressId: newAddressId }),
      };

      const response2 = await updateShopDetailsForAddress(shopData);

      if (response2?.statusCode == 200) {
        alert("Address added successfully!");
      } else {
        alert("Failed to add address.");
      }
    } catch (error) {
      console.error("Add Address API error:", error);
      alert("Something went wrong while adding the address.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (formName: string) => {
    if (!loading) {
      setExpandedForm(expandedForm === formName ? null : formName);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <NavigationHeader name="Address" />
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <AddressForm
          expanded={expandedForm === "billing"}
          setExpanded={() => handleToggle("billing")}
          title="Grocery Billing Address"
          image={require("../../../../assets/images/billingaddress.png")}
          showLocation={false}
          values={billingAddress}
          setValues={setBillingAddress}
          onSubmit={() => handleSubmit(billingAddress)}
        />

        <AddressForm
          expanded={expandedForm === "pickup"}
          setExpanded={() => handleToggle("pickup")}
          title="Grocery Pickup Address"
          image={require("../../../../assets/images/pickup.png")}
          showLocation={true}
          values={pickupAddress}
          setValues={setPickupAddress}
          onSubmit={() => handleSubmit(pickupAddress)}
        />
      </ScrollView>
    </View>
  );
};

export default AddressPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: PADDING.largePad,
    backgroundColor: "#F9F9F9",
  },
  addressContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    overflow: "hidden",
    margin: MARGIN.miniMar,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: PADDING.medPad,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#333",
  },
  content: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 10,
    color: "#060606",
  },
  input: {
    backgroundColor: "#F9F9F9",
    padding: PADDING.smlPad,
    borderRadius: 5,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#BEBEBE",
  },
  pickerContainer: {
    height: 50,
    backgroundColor: "#F9F9F9",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    marginTop: 5,
  },
  pickerStyle: {
    color: "#333",
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
