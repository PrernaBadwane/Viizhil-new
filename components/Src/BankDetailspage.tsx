import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import NavigationHeader from "@/app/commonComponts/NavigationHeader";
import { MARGIN, PADDING } from "@/constants/Colors";
import PrimaryBtn from "@/appComponent/button/PrimaryButton";
import { BankDetailsVerify } from "./api/apiService";
import { ApiClient, apiService } from "./api/apiBaseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";

const BankDetailspage = () => {
  const { id, mode } = useLocalSearchParams();
  const [shopId, setShopId] = useState<any>();
  const [ifscCode, setIfscCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [userId, setUserId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [confirmAccountNumber, setConfirmAccountNumber] = useState("");
  const [navigate, setNavigate] = useState(false);
  const [accountHolderName, setAccountHolderName] = useState("");
  const [accountNumberError, setAccountNumberError] = useState("");
  const [confirmAccountError, setConfirmAccountError] = useState("");
  const [ifscCodeError, setIfscCodeError] = useState("");

  useEffect(() => {
    const gatAllShopData = async () => {
      try {
        setLoading(true);
        const UserId = await AsyncStorage.getItem("userId");

        const shopId: any = Number(id);
        const response = await ApiClient.get(
          `/sp_View_GroceryShop?Id=${shopId}`,
          {
            params: { UserId: `${UserId}` },
          }
        );

        console.log("Full API Response:", response.data);

        if (response.status === 200 && response.data?.data) {
          console.log("Data inside response:", response.data.data);

          // Ensure data is an array before filtering
          if (Array.isArray(response.data.data)) {
            const shopData = response.data.data.find(
              (item: any) => item.Id === shopId
            );

            if (shopData) {
              setCreatedBy(shopData.AccountHolderName);
              setAccountNumber(shopData.AccountNo);
              setIfscCode(shopData.IFSC);
              setUserId(shopData.UserId);
              setConfirmAccountNumber(shopData.AccountNo);
            } else {
              console.error("No shop found with the given ID:", shopId);
            }
          } else {
            console.error("Data is not an array:", response.data.data);
          }
        } else {
          console.error("Unexpected response format", response.data);
        }
      } catch (error) {
        console.error("Error fetching shop data:", error);
      } finally {
        setLoading(false);
      }
    };

    gatAllShopData();
  }, []);

  const handleVerifyBank = async () => {
    setLoading(true);

    let isValid = true;

    // Reset errors first
    setAccountNumberError("");
    setIfscCodeError("");
    setConfirmAccountError("");

    // Validate fields
    if (!accountNumber) {
      setAccountNumberError("Account Number is required");
      isValid = false;
    }
    if (!ifscCode) {
      setIfscCodeError("IFSC Code is required");
      isValid = false;
    }
    if (!confirmAccountNumber) {
      setConfirmAccountError("Confirm Account Number is required");
      isValid = false;
    } else if (accountNumber !== confirmAccountNumber) {
      setConfirmAccountError(
        "Confirm Account Number should be same as Account Number"
      );
      isValid = false;
    }

    if (!isValid) {
      setLoading(false);
      return;
    }

    try {
      const response = await BankDetailsVerify(
        shopId,
        ifscCode,
        accountNumber,
        userId
      );
console.log(response);
      if (response?.statusCode === 200) {
        setNavigate(true);
        Alert.alert(response?.message );
      } else if (response?.statusCode === 400) {
        Alert.alert(response?.message || 'Something went wrong');
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || error?.message || 'An error occurred while uploading documents.';
      Alert.alert('Upload Failed', errorMessage);
    } finally {
      setLoading(false);

    } 
  }
   const navigateToShopDetails = async () => {
      if (navigate) {
        if ( id) {
          router.push({
            pathname: "/shopinfo", 
            params: { mode: "Mobile Number", id: id.toString() }, 
          });
        }  else {
        console.log("Operation was not successful, navigation skipped.");
      }
    }}

    // useFocusEffect(
    //   React.useCallback(() => {
    //     const onBackPress = () => {
    //       router.replace({
    //         pathname: '/shopinfo',
    //         params: {
    //           mode: 'Mobile Number',
    //           id: `${id}`,
    //         },
    //       });
    //       return true; // Prevent default back action
    //     };
  
    //     BackHandler.addEventListener('hardwareBackPress', onBackPress);
  
    //     return () =>
    //       BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    //   }, [id]) // Dependency on 'id'
    // );

    useEffect(() => {
      if (navigate) {
        navigateToShopDetails();
      }
    },[navigate]);

  return (
    <View style={styles.safeContainer}>
      <NavigationHeader name="Bank Details" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flexContainer}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          {/* First Input Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Account Holder Name :</Text>
            <View
              style={[
                styles.input,
                { justifyContent: "center", backgroundColor: "#BBBBBB" },
              ]}
            >
              <View style={{ width: "100%" }}>
                {createdBy && (
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#000",
                      fontWeight: "bold",
                      textAlign: "left",
                    }}
                  >
                    {createdBy}
                  </Text>
                )}
              </View>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Account Account Number :</Text>
            <TextInput
              style={{
                ...styles.input,
                borderColor: accountNumberError ? "red" : "#8E8E8E",
              }}
              placeholder="Enter the Account Number"
              placeholderTextColor="#BEBEBE"
              keyboardType="numeric"
              value={accountNumber}
              onChangeText={(text) => {
                setAccountNumberError("");
                // setConfirmAccountNumber(accountNumber);
                setAccountNumber(text);
              }}
            />
            {accountNumberError ? (
              <Text style={styles.errorText}>{accountNumberError}</Text>
            ) : null}
          </View>

          <View style={{ ...styles.inputContainer }}>
            <Text style={styles.label}>Confirm Account Number :</Text>
            <TextInput
              style={{
                ...styles.input,
                borderColor: confirmAccountError ? "red" : "#8E8E8E",
              }}
              placeholder="Enter the Confirm Account Number"
              placeholderTextColor="#BEBEBE"
              value={confirmAccountNumber}
              keyboardType="numeric"
              onChangeText={(text) => {
                setConfirmAccountError("");
                setConfirmAccountNumber(text);
              }}
            />
          </View>
          {confirmAccountError ? (
            <Text style={styles.errorText}>{confirmAccountError}</Text>
          ) : null}
          <View style={{ ...styles.inputContainer }}>
            <Text style={styles.label}>IFSC Code :</Text>
            <TextInput
              style={{
                ...styles.input,
                borderColor: ifscCodeError ? "red" : "#8E8E8E",
              }}
              placeholder="Enter the IFSC Code"
              placeholderTextColor="#BEBEBE"
              value={ifscCode}
              onChangeText={(text) => {
                setIfscCodeError("");
                setIfscCode(text.toUpperCase());
              }}
            />
          </View>
          {ifscCodeError ? (
            <Text style={styles.errorText}>{ifscCodeError}</Text>
          ) : null}
        </ScrollView>
        <View style={{ ...styles.savebutton }}>
          <PrimaryBtn
            action={handleVerifyBank}
            btnTxt="Save"
            loading={loading}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default BankDetailspage;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  flexContainer: {
    flex: 1,
  },
  scrollContainer: {
    padding: PADDING.largePad,
    flexGrow: 1, // ✅ Allows scrolling when content overflows
  },
  inputContainer: {
    marginTop: MARGIN.medMar,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#8E8E8E",
    borderRadius: 6,
    paddingHorizontal: 10,
    fontSize: 14,
    color: "#000",
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
    color: "#060606",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
  savebutton: {
    padding: PADDING.largePad,

    alignSelf: "center",
    width: "100%",
  },
});
