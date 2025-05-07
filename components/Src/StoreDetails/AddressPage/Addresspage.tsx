import { StyleSheet, Text, TextInput, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import NavigationHeader from "@/app/commonComponts/NavigationHeader";
import { MARGIN, PADDING } from "@/constants/Colors";
import AddressForm from "./AddressForm";
import { ApiClient } from "../../api/apiBaseUrl";
import { addAddress, updateAddress, updateShopDetailsForAddress } from "../../api/apiService";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAddressById } from "../../api/apiClient";
import { ActivityIndicator } from "react-native-paper";

const AddressPage = () => {
  const [loading, setLoading] = useState(false);
  const { id, mode } = useLocalSearchParams();
  const [expandedForm, setExpandedForm] = useState<string | null>(null);
  const [initialBillingAddressFetched, setInitialBillingAddressFetched] =
    useState(false);
  const [initialPickupAddressFetched, setInitialPickupAddressFetched] =
    useState(false);
  const [userid, setUserId] = useState<number>(0);

  useEffect(() => {
    getShopDetailsAndAddresses();
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
    id: null,
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
    id: null,
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
  const getShopDetailsAndAddresses = async () => {
    try {
      const localUserIdStr = await AsyncStorage.getItem("userId");
      const shopIdStr = id as string; // id from useLocalSearchParams

      if (!localUserIdStr || !shopIdStr) {
        console.warn("User ID or Shop ID is missing.");
        return;
      }
      const localUserId = Number(localUserIdStr);
      setUserId(localUserId);

      console.log(
        `Fetching shop details for ShopID: ${shopIdStr}, UserID: ${localUserId}`
      );
      const response = await ApiClient.get(
        `/sp_View_GroceryShop?Id=${shopIdStr}`,
        {
          params: { UserId: `${localUserId}` },
        }
      );

      const shopData = response?.data?.data[0];

      if (shopData) {
        const baseAddressData = {
          refId: localUserId,
          modifier: localUserId,
          restaurantId: shopIdStr,
        };

        setBillingAddress((prev) => ({
          ...prev,
          ...baseAddressData,
          addrstype: "billing",
        }));
        setPickupAddress((prev) => ({
          ...prev,
          ...baseAddressData,
          addrstype: "pickup",
        }));

        // Now fetch individual addresses if their IDs are present
        if (shopData.BillingAddressId) {
          console.log(
            "Fetching Billing Address for ID:",
            shopData.BillingAddressId
          );
          const billingAddr = await getAddressById(
            shopData.BillingAddressId.toString()
          );
          const billingAddrResponse = billingAddr.data.data[0];
          console.log(
            billingAddrResponse.ContactPerson,
            "billing address response"
          );

          if (billingAddrResponse) {
            console.log(
              "Fetched Billing Address:",
              billingAddrResponse.data.data[0].AddressName
            );
            // Map API response to your billingAddress state structure
            setBillingAddress({
              id: billingAddrResponse?.data?.Id || null,
              contactPerson: billingAddrResponse?.data?.ContactPerson || "",
              addressName: billingAddrResponse?.data?.AddressName || "",
              doorNo: billingAddrResponse?.data?.DoorNo || "",
              pickupAddress: "",
              countryName: billingAddrResponse?.data?.CountryID?.toString() || "",
              stateName: billingAddrResponse?.data?.StateID?.toString() || "",
              cityName: billingAddrResponse?.data?.CityID?.toString() || "",
              postalcode: billingAddrResponse?.data?.PostalCode?.toString() || "",
              latitude: billingAddrResponse?.data?.Latitude?.toString() || "",
              longitude: billingAddrResponse?.data?.Longitude?.toString() || "",
              refId: localUserId,
              modifier: localUserId,
              addrstype: "billing",
              isDefault: billingAddrResponse?.data?.IsDefault || false,
              restaurantId: shopIdStr,
              areaId: billingAddrResponse?.data?.AreaId || 0,
              subAreaId: billingAddrResponse?.data?.SubAreaId || 0,
              contactNo: billingAddrResponse?.data?.ContactNo || "",
            });
            setInitialBillingAddressFetched(true);
          }
        } else {
          // No BillingAddressId, ensure form is ready for adding
          setInitialBillingAddressFetched(true); // Mark as "fetched" (meaning we know there isn't one)
        }

        if (shopData.PickupAddressId) {
          console.log(
            "Fetching Pickup Address for ID:",
            shopData.PickupAddressId
          );
          const pickupAddrResponse = await getAddressById(
            shopData.PickupAddressId
          );
          if (pickupAddrResponse && pickupAddrResponse.data.data) {
            setPickupAddress({
              id: pickupAddrResponse.data.data[0].Id || null,
              contactPerson:
                pickupAddrResponse.data.data[0].ContactPerson || "",
              addressName: pickupAddrResponse.data.data[0].AddressName || "",
              doorNo: pickupAddrResponse.data.data[0].DoorNo || "",
              pickupAddress: pickupAddrResponse.data.data[0].AddressName || "",
              countryName:
                pickupAddrResponse.data.data[0].CountryID?.toString() || "",
              stateName:
                pickupAddrResponse.data.data[0].StateID?.toString() || "",
              cityName:
                pickupAddrResponse.data.data[0].CityID?.toString() || "",
              postalcode:
                pickupAddrResponse.data.data[0].PostalCode?.toString() || "",
              latitude:
                pickupAddrResponse.data.data[0].Latitude?.toString() || "",
              longitude:
                pickupAddrResponse.data.data[0].Longitude?.toString() || "",
              refId: localUserId,
              modifier: localUserId,
              addrstype: "pickup",
              isDefault: pickupAddrResponse.data.data[0].IsDefault || false,
              restaurantId: shopIdStr,
              areaId: pickupAddrResponse.data.data[0].AreaId || 0,
              subAreaId: pickupAddrResponse.data.data[0].SubAreaId || 0,
              contactNo: pickupAddrResponse.data.data[0].ContactNo || "",
            });
            setInitialPickupAddressFetched(true);
          }
        } else {
          setInitialPickupAddressFetched(true);
        }
      } else {
        console.log("No shop data found for ID:", shopIdStr);
        // Still set base data for adding new addresses
        const baseAddressData = {
          refId: localUserId,
          modifier: localUserId,
          restaurantId: shopIdStr,
        };
        setBillingAddress((prev) => ({
          ...prev,
          ...baseAddressData,
          addrstype: "billing",
        }));
        setPickupAddress((prev) => ({
          ...prev,
          ...baseAddressData,
          addrstype: "pickup",
        }));
        setInitialBillingAddressFetched(true); // No existing, ready for add
        setInitialPickupAddressFetched(true); // No existing, ready for add
      }
    } catch (error) {
      console.error("Error fetching shop details or addresses:", error);
      // Handle error, maybe set defaults so form can still be used for adding
      const localUserIdStr = await AsyncStorage.getItem("userId");
      const shopIdStr = id as string;
      if (localUserIdStr && shopIdStr) {
        const localUserId = Number(localUserIdStr);
        const baseAddressData = {
          refId: localUserId,
          modifier: localUserId,
          restaurantId: shopIdStr,
        };
        setBillingAddress((prev) => ({
          ...prev,
          ...baseAddressData,
          addrstype: "billing",
        }));
        setPickupAddress((prev) => ({
          ...prev,
          ...baseAddressData,
          addrstype: "pickup",
        }));
      }
      setInitialBillingAddressFetched(true);
      setInitialPickupAddressFetched(true);
    }
  };
  // countryList, stateList, etc. same as before...

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      if (values.id) {
        const response = await updateAddress(values);
        if (response?.statusCode == 200) {
         alert("Address updated successfully!");
        } else {
          alert("Failed to add address.");
        }
      } else {
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
        console.log(response2, "response from add address");
        if (response2?.statusCode == 200) {
          alert("Address added successfully!");
        } else {
          alert("Failed to add address.");
        }
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
  const initialAddressStateTemplate = {
    contactPerson: "",
    addressName: "",
    doorNo: "",
    countryName: "",
    stateName: "",
    cityName: "",
    postalcode: "",
    latitude: "",
    longitude: "",
    refId: 0,
    modifier: 0,
    isDefault: false,
    areaId: 0,
    subAreaId: 0,
    contactNo: "",
    pickupAddress: "",
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
          values={billingAddress} // Pass the full state object
          setValues={setBillingAddress} // Pass the setter
          onSubmit={() => handleSubmit(billingAddress)} // Pass current billingAddress values
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
