import { Alert, BackHandler, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import NavigationHeader from "@/app/commonComponts/NavigationHeader";
import { MARGIN, PADDING } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiClient } from "@/components/Src/api/apiBaseUrl";
import VerificationInput from "./VerificationInputFields";
import { sendOtpOnEmail, verifyGst } from "../api/apiService";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";

const VerificationPage = () => {
  const { id, mode } = useLocalSearchParams();
  const [gst, setGst] = useState("");
  const [emailId, setEmailId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  console.log(phoneNumber, "phone number");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isGstVerified, setIsGstVerified] = useState(false);
  const [navigate, setNavigate] = useState(false);
  const [gstError, setGstError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const validateGst = (gst: string) => {
    const gstRegex =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
    return gstRegex.test(gst);
  };

  const handleVerifiedGst = async () => {
    if (!gst) {
      setGstError("GST number is required!");
      return;
    } else if (!validateGst(gst)) {
      setGstError("Invalid GST number!");
      return;
    }

    try {
      setLoading(true);
      const response = await verifyGst(Number(id), String(gst));

      if (response?.statusCode == 200) {
        setIsGstVerified(true);
        setGstError("");
      } else {
        setGstError(response?.message || "GST verification failed!");
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || "GST Verification failed";
      setGstError(message);
      Alert.alert("GST Verification failed", message);
    } finally {
      setLoading(false);
      setNavigate(true);
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSendOtpOnEmail = async () => {
    if (!emailId) {
      setGstError("Email is required!");
      return;
    } else if (!validateEmail(emailId)) {
      setGstError("Invalid email!");
      return;
    }
    router.push({
            pathname: '/otpMode',
            params: {
              mode: "Email Address",
              id: `${emailId}`,
              shopId: `${id}`,
              isVerify: "true",
            },
          });

    try {
      setLoading(true);
      const response = await sendOtpOnEmail(Number(id), emailId);
      console.log(response);
    } catch (error) {
      setEmailError("Failed to send otp. Please try again!");
      console.error("Email OPT sending Verification Error:", error);
    } finally {
      setLoading(false);
    }
  };

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

  const checkVerified = async () => {
    setLoading(true);
    try {
      const shopId = Number(id);
        const userId = await AsyncStorage.getItem("userId");
      const response = await ApiClient.get(
        `/sp_View_GroceryShop?Id=${shopId}`,
        {
          params: { UserId: `${userId}` },
        }
      );

      const data = response?.data?.data;
      if (Array.isArray(data)) {
        const shop = data.find((item) => item.Id === shopId);
        if (shop) {
          setGst(shop?.GSTNumber);
          setEmailId(shop?.EmailId);
          setPhoneNumber(shop?.PhoneNumber);
        }

        if (shop?.IsGSTValidate === true) {
          setIsGstVerified(true);
        }
        if (shop?.IsValidEmail === true) {
          setIsEmailVerified(true);
        }
        if (shop?.IsValidPhoneNo === true) {
          setIsPhoneVerified(true);
        }
      }
    } catch (error) {
      console.error("Error fetching GST verification status:", error);
    }
  };

  const navigateToShopDetails = async () => {
    if (navigate) {
    
        router.push({
          pathname: `/verification`,
          params: {
            mode: "Mobile Number",
            id: `${id}`,
          },
        });
      
    } 
  }

  useEffect(() => {
    checkVerified();
  }, []);
  useEffect(() => {
      navigateToShopDetails();
    
  }, [isGstVerified, isEmailVerified, isPhoneVerified, navigate]);

  return (
    <SafeAreaView>
      <NavigationHeader name="Verification" />
      <View style={styles.container}>
        <Text style={styles.title}>Enter your Verification Details Below</Text>

        <VerificationInput
          label="GST Number"
          placeholder="Enter GST no"
          value={gst}
          onChangeText={(text) => {
            setGst(text);
            setGstError(gstError);
            setIsGstVerified(isGstVerified);
          }}
          onVerifyPress={handleVerifiedGst}
          isVerified={isGstVerified}
          error={gstError}
        />

        <VerificationInput
          label="Email ID"
          placeholder="Enter Your Email"
          value={emailId}
          onChangeText={setEmailId}
          isVerified={isEmailVerified}
          keyboardType="email-address"
          onVerifyPress={handleSendOtpOnEmail}
          error={emailError}
        />

        <VerificationInput
          label="Phone Number"
          placeholder="Enter your Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          isVerified={isPhoneVerified}
          keyboardType="numeric"
          maxLength={13}
          onVerifyPress={handleVerifiedGst}
          // error={gstError}
          editable={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default VerificationPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9F9F9",
    height: "93%",
    padding: PADDING.largePad,
  },
  title: {
    fontSize: 20,
    color: "#2B2827",
    textAlign: "center",
    fontWeight: "700",
    margin: MARGIN.miniMar,
    right: 10,
  },
});
