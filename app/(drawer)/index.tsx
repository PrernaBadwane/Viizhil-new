import React, { useState } from "react";
import { Text, View } from "react-native";
import { router } from "expo-router";
import { login } from "@/components/Src/api/apiService";
import Login from "@/components/Src/LoginAndSignup/Login";

const LoginScreen = () => {
  // State management
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+1"); // Default country code
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false); 

  // Button actions
  const handleLogin = async () => {
    setLoading(true);
    console.log("Phone Number:", `${countryCode} ${phoneNumber}`);
    const response: any = await login(`${countryCode}${phoneNumber}`.trim());
    router.replace('/home');
    if (response.statusCode == 200) {
      console.log(`${countryCode}${phoneNumber}`)
      router.push({
        pathname: `/otpMode`,
        params: {
          mode: "Mobile Number",
          id: `${countryCode}${phoneNumber}`,
          // customerId: customerID,
        },
      });
    }
    setLoading(false); // <- Optionally reset loading after the operation
  };

  // const handleExistingUser = () => {
  //   router.push("/login"); // Redirect to login if it's a signup flow
  // };

  // const handleNewUser = () => {
  //   router.push("/signup");
  // };

//   const handleTermsClick = () => {
//     router.push("/terms");
//   };

//   const handlePolicyClick = () => {
//     router.push("/privacy-policy");
//   };

  return (
    <View style={{ flex: 1 }}>
      <Login
        // Input-related props
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        countryCode={countryCode}
        setCountryCode={setCountryCode}
        keyboardType="phone-pad"
        isPhone={true}
        disabled={false}
        isChecked={isChecked} // <-- Pass state down
        setIsChecked={setIsChecked} // <-- Pass setter function down

        // Text content
        title="Login for the Best experience"
        subtitle="Enter your phone number to continue"

        // Button actions
        buttonLabel="Continue"
        signupLabel="Existing user? Log in"
        onFirstBtnClick={handleLogin}
        // onSecondBtnClick={handleExistingUser}
        // onNewUserClick={handleNewUser}
        // Terms and privacy policy handlers
        // onClickTerms={handleTermsClick}
        // onClickPolicy={handlePolicyClick}

        // Loading & button disabled state
        loading={loading}
        btnDisable={loading}

        // Toggle between signup/login behavior
        isSignUp={false} // Set to true if using this for Signup flow

        // Optional: Additional child components (e.g., OTP field, social login buttons)
        // children={
        //   <View style={{ alignItems: "center" }}>
        //     <Text>By signing in you agree to our terms & policies.</Text>
        //   </View>
        // }
      />
    </View>
  );
};

export default LoginScreen;
